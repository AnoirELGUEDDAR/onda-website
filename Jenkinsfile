pipeline {
  agent {
    kubernetes {
      inheritFrom 'ci-agent'
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: maven
      image: maven:3.8-openjdk-17
      command: ["cat"]
      tty: true
      volumeMounts:
        - name: maven-cache
          mountPath: /root/.m2

    - name: node
      image: node:20
      command: ["cat"]
      tty: true
      volumeMounts:
        - name: npm-cache
          mountPath: /root/.npm

    - name: docker
      image: docker:20.10.16-dind
      securityContext:
        privileged: true
      env:
        - name: DOCKER_TLS_CERTDIR
          value: ""
        - name: DOCKER_BUILDKIT
          value: "1"
      command: ["dockerd-entrypoint.sh"]
      args: ["--host=tcp://0.0.0.0:2375","--host=unix:///var/run/docker.sock"]
      tty: true
      volumeMounts:
        - name: dind-storage
          mountPath: /var/lib/docker
        - name: trivy-cache
          mountPath: /root/.cache/trivy

    - name: ansible
      image: cytopia/ansible:latest
      command: ["cat"]
      tty: true

  volumes:
    - name: maven-cache
      persistentVolumeClaim:
        claimName: maven-cache-pvc
    - name: npm-cache
      persistentVolumeClaim:
        claimName: npm-cache-pvc
    - name: dind-storage
      emptyDir: {}
    - name: trivy-cache
      emptyDir: {}
"""
    }
  }

  parameters {
    booleanParam(name: 'SECURITY_HARD_GATE', defaultValue: false,
      description: 'Fail build on HIGH/CRITICAL vulnerabilities (true) or keep soft gate (false)')
  }

  environment {
    DOCKER_HUB_USER = 'anoiraeg2003'
    BACKEND_IMAGE   = "${DOCKER_HUB_USER}/spring-backend:${BUILD_NUMBER}"
    FRONTEND_IMAGE  = "${DOCKER_HUB_USER}/react-frontend:${BUILD_NUMBER}"
    DOCKER_HOST     = "tcp://localhost:2375"
    DOCKER_BUILDKIT = "1"
    MAVEN_OPTS      = "-Dmaven.repo.local=/root/.m2 -Xmx1024m"
    CURRENT_DATE    = "2025-08-06 15:23:26"
    CURRENT_USER    = "AnoirELGUEDDAR"
    SONARQ_DONE     = 'false'
  }

  stages {

    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Determine Changes') {
      steps {
        script {
          try {
            def changes = sh(script: "git diff --name-only HEAD~1 HEAD || git diff --name-only origin/main...HEAD || echo 'all'", returnStdout: true).trim()
            env.BACKEND_CHANGED  = changes.contains('backend/')  || changes == 'all' ? 'true' : 'false'
            env.FRONTEND_CHANGED = changes.contains('frontend/') || changes == 'all' ? 'true' : 'false'
          } catch (Exception e) {
            echo "Could not determine changes, assuming everything has changed"
            env.BACKEND_CHANGED  = 'true'
            env.FRONTEND_CHANGED = 'true'
          }
          echo "Backend changed: ${env.BACKEND_CHANGED}"
          echo "Frontend changed: ${env.FRONTEND_CHANGED}"
        }
      }
    }

    stage('Build and Test') {
      parallel {
        stage('Backend') {
          when { expression { return env.BACKEND_CHANGED == 'true' } }
          stages {
            stage('Build Backend') {
              steps {
                container('maven') {
                  dir('backend') { sh 'mvn -T 4 clean package -DskipTests' }
                }
              }
            }
            stage('Test Backend') {
              steps {
                container('maven') {
                  dir('backend') { sh 'mvn -T 4 test' }
                }
              }
            }
          }
        }
        stage('Frontend') {
          when { expression { return env.FRONTEND_CHANGED == 'true' } }
          stages {
            stage('Build Frontend') {
              steps {
                container('node') {
                  dir('frontend') {
                    sh 'npm ci --prefer-offline --no-audit'
                    sh 'npm run build'
                  }
                }
              }
            }
            stage('Test Frontend') {
              steps {
                container('node') {
                  dir('frontend') {
                    sh 'npm test -- --watchAll=false --passWithNoTests || true'
                  }
                }
              }
            }
          }
        }
      }
    }

    /* === Always run Sonar === */
    stage('Code Quality (SonarQube)') {
      steps {
        script {
          withSonarQubeEnv('sonarqube-server') {
            if (env.BACKEND_CHANGED == 'true' || env.BACKEND_CHANGED == 'false') {
              container('maven') { dir('backend') { sh 'mvn -T 4 -DskipTests sonar:sonar'; sh 'touch .sonar_backend_done' } }
            }
            if (env.FRONTEND_CHANGED == 'true' || env.FRONTEND_CHANGED == 'false') {
              container('node') {
                dir('frontend') {
                  sh '''
set -e
apt-get update -qq
DEBIAN_FRONTEND=noninteractive apt-get install -y -qq openjdk-17-jre-headless >/dev/null
java -version
npm run test -- --watchAll=false --coverage || true
npx sonar-scanner \
  -Dsonar.projectKey=frontend \
  -Dsonar.sources=src \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
touch .sonar_frontend_done
'''
                }
              }
            }
          }
          def done = sh(
            script: '([ -f backend/.sonar_backend_done ] || [ -f frontend/.sonar_frontend_done ]) && echo true || echo false',
            returnStdout: true
          ).trim()
          echo "SONARQ_DONE=${done}"
          env.SONARQ_DONE = done
        }
      }
    }

    stage('Quality Gate') {
      steps { timeout(time: 10, unit: 'MINUTES') { waitForQualityGate abortPipeline: true } }
    }

    stage('Docker Build & Push') {
      parallel {
        stage('Backend Docker') {
          when { expression { return env.BACKEND_CHANGED == 'true' } }
          steps {
            container('docker') {
              sh 'until docker ps > /dev/null 2>&1; do sleep 1; done'
              sh "docker build --build-arg BUILDKIT_INLINE_CACHE=1 --cache-from ${DOCKER_HUB_USER}/spring-backend:latest -t ${env.BACKEND_IMAGE} -t ${DOCKER_HUB_USER}/spring-backend:latest -f backend/Dockerfile backend"
              withCredentials([string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')]) {
                sh """
echo "\$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USER" --password-stdin
docker push ${env.BACKEND_IMAGE}
docker push ${DOCKER_HUB_USER}/spring-backend:latest
"""
              }
            }
          }
        }
        stage('Frontend Docker') {
          when { expression { return env.FRONTEND_CHANGED == 'true' } }
          steps {
            container('docker') {
              sh 'until docker ps > /dev/null 2>&1; do sleep 1; done'
              sh "docker build --build-arg BUILDKIT_INLINE_CACHE=1 --cache-from ${DOCKER_HUB_USER}/react-frontend:latest -t ${env.FRONTEND_IMAGE} -t ${DOCKER_HUB_USER}/react-frontend:latest -f frontend/Dockerfile frontend"
              withCredentials([string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')]) {
                sh """
echo "\$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USER" --password-stdin
docker push ${env.FRONTEND_IMAGE}
docker push ${DOCKER_HUB_USER}/react-frontend:latest
"""
              }
            }
          }
        }
      }
    }

    /* === Security: cache Trivy, longer timeouts, sign by digest, verify with pub key === */
    stage('Security: SBOM, Scan & Sign') {
      steps {
        container('docker') {
          withCredentials([
            string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD'),
            file  (credentialsId: 'COSIGN_KEY',          variable: 'COSIGN_KEY'),
            string(credentialsId: 'COSIGN_PASSWORD',     variable: 'COSIGN_PASSWORD'),
            file  (credentialsId: 'COSIGN_PUB',          variable: 'COSIGN_PUB')
          ]) {
            sh '''
set -euo pipefail

# ---- env & login
export TRIVY_CACHE_DIR=/root/.cache/trivy
echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USER" --password-stdin

# ---- choose images (build tag if changed, else :latest) ---
[ "${BACKEND_CHANGED:-true}" = "true" ]  && BACKEND_PULL="${BACKEND_IMAGE}"  || BACKEND_PULL="${DOCKER_HUB_USER}/spring-backend:latest"
[ "${FRONTEND_CHANGED:-true}" = "true" ] && FRONTEND_PULL="${FRONTEND_IMAGE}" || FRONTEND_PULL="${DOCKER_HUB_USER}/react-frontend:latest"
docker pull "${BACKEND_PULL}"  || true
docker pull "${FRONTEND_PULL}" || true

# ---- install tools ----
apk add --no-cache curl jq || true
if ! command -v syft >/dev/null; then
  SYFT_VERSION=v1.17.0
  curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin ${SYFT_VERSION}
fi
if ! command -v trivy >/dev/null; then
  TRIVY_VERSION=0.53.0
  curl -sSfL https://github.com/aquasecurity/trivy/releases/download/v${TRIVY_VERSION}/trivy_${TRIVY_VERSION}_Linux-64bit.tar.gz | tar xz -C /usr/local/bin trivy
fi
if ! command -v cosign >/dev/null; then
  COSIGN_VERSION=v2.2.4
  curl -sSfL -o /usr/local/bin/cosign https://github.com/sigstore/cosign/releases/download/${COSIGN_VERSION}/cosign-linux-amd64
  chmod +x /usr/local/bin/cosign
fi

# ---- SBOMs ----
echo "=== SBOMs (SPDX JSON) ==="
syft "docker:${BACKEND_PULL}"  -o spdx-json > backend-sbom.spdx.json  || true
syft "docker:${FRONTEND_PULL}" -o spdx-json > frontend-sbom.spdx.json || true

# ---- Trivy scan (parameterized gate) ----
if [ "${SECURITY_HARD_GATE:-false}" = "true" ]; then
  TRIVY_EXIT=1
else
  TRIVY_EXIT=0
fi

FAILED=0
trivy image --timeout 30m --scanners vuln,misconfig --severity HIGH,CRITICAL --ignore-unfixed \
  --exit-code ${TRIVY_EXIT} --format sarif -o backend-trivy.sarif  "${BACKEND_PULL}"  || FAILED=1
trivy image --timeout 30m --scanners vuln,misconfig --severity HIGH,CRITICAL --ignore-unfixed \
  --exit-code ${TRIVY_EXIT} --format sarif -o frontend-trivy.sarif "${FRONTEND_PULL}" || FAILED=1

# ---- resolve digests & sign by digest ----
BACKEND_DIGEST=$(docker inspect --format='{{index .RepoDigests 0}}' "${BACKEND_PULL}"  || true)
FRONTEND_DIGEST=$(docker inspect --format='{{index .RepoDigests 0}}' "${FRONTEND_PULL}" || true)
echo "Backend digest:  ${BACKEND_DIGEST}"
echo "Frontend digest: ${FRONTEND_DIGEST}"

export COSIGN_PASSWORD="${COSIGN_PASSWORD:-}"
echo "=== Cosign sign images (by digest) ==="
[ -n "${BACKEND_DIGEST}" ]  && cosign sign --yes --key "$COSIGN_KEY" "${BACKEND_DIGEST}"
[ -n "${FRONTEND_DIGEST}" ] && cosign sign --yes --key "$COSIGN_KEY" "${FRONTEND_DIGEST}"

echo "=== Cosign verify (with public key) ==="
[ -n "${BACKEND_DIGEST}" ]  && cosign verify --key "$COSIGN_PUB" "${BACKEND_DIGEST}"  > backend-cosign.verify.txt  || true
[ -n "${FRONTEND_DIGEST}" ] && cosign verify --key "$COSIGN_PUB" "${FRONTEND_DIGEST}" > frontend-cosign.verify.txt || true

# ---- enforce gate only when hard gate enabled ----
if [ "${SECURITY_HARD_GATE:-false}" = "true" ] && [ "$FAILED" = "1" ]; then
  echo "High/Critical vulnerabilities found."
  exit 1
fi
'''
          }
          archiveArtifacts artifacts: '*.spdx.json,*.sarif,*cosign.verify.txt', allowEmptyArchive: true
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        container('ansible') {
          sh """
set -e
apk add --no-cache curl
curl -LO "https://dl.k8s.io/release/stable.txt"
KUBECTL_VERSION=\$(cat stable.txt)
curl -LO "https://dl.k8s.io/release/\${KUBECTL_VERSION}/bin/linux/amd64/kubectl"
chmod +x kubectl && mv kubectl /usr/local/bin/
kubectl create namespace onda-app --dry-run=client -o yaml | kubectl apply -f -

cat > mysql-pvc.yaml << 'EOL'
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
  namespace: onda-app
spec:
  accessModes: [ReadWriteOnce]
  resources:
    requests: { storage: 1Gi }
EOL

cat > mysql-configmap.yaml << 'EOL'
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-init-sql
  namespace: onda-app
data:
  onda_flights.sql: |
    CREATE DATABASE IF NOT EXISTS onda_flights;
    USE onda_flights;
EOL

cat > mysql-deployment.yaml << 'EOL'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
  namespace: onda-app
spec:
  replicas: 1
  selector: { matchLabels: { app: mysql } }
  template:
    metadata: { labels: { app: mysql } }
    spec:
      containers:
        - name: mysql
          image: mysql:8
          env:
            - { name: MYSQL_ROOT_PASSWORD, value: "root" }
            - { name: MYSQL_DATABASE,       value: "onda_flights" }
            - { name: MYSQL_USER,           value: "ondauser" }
            - { name: MYSQL_PASSWORD,       value: "Anoirelgueddar@2003" }
          ports: [ { containerPort: 3306 } ]
          volumeMounts:
            - { name: mysql-storage, mountPath: /var/lib/mysql }
            - { name: initdb,        mountPath: /docker-entrypoint-initdb.d }
      volumes:
        - { name: mysql-storage, persistentVolumeClaim: { claimName: mysql-pvc } }
        - { name: initdb,        configMap: { name: mysql-init-sql } }
EOL

cat > mysql-service.yaml << 'EOL'
apiVersion: v1
kind: Service
metadata:
  name: mysql
  namespace: onda-app
spec:
  selector: { app: mysql }
  ports: [ { protocol: TCP, port: 3306, targetPort: 3306 } ]
EOL

cat > db-service.yaml << 'EOL'
apiVersion: v1
kind: Service
metadata:
  name: db
  namespace: onda-app
spec:
  selector: { app: mysql }
  ports: [ { protocol: TCP, port: 3306, targetPort: 3306 } ]
EOL

cat > backend-deployment.yaml << 'EOL'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: onda-app
spec:
  replicas: 1
  selector: { matchLabels: { app: backend } }
  strategy: { type: Recreate }
  template:
    metadata: { labels: { app: backend } }
    spec:
      containers:
        - name: backend
          image: anoiraeg2003/spring-backend:latest
          imagePullPolicy: Always
          ports: [ { containerPort: 8080 } ]
          env:
            - { name: SPRING_DATASOURCE_URL,      value: "jdbc:mysql://db:3306/onda_flights?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true" }
            - { name: SPRING_DATASOURCE_USERNAME, value: "ondauser" }
            - { name: SPRING_DATASOURCE_PASSWORD, value: "Anoirelgueddar@2003" }
          resources:
            limits:   { memory: "512Mi", cpu: "500m" }
            requests: { memory: "256Mi", cpu: "200m" }
          securityContext:
            runAsNonRoot: true
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities: { drop: ["ALL"] }
EOL

cat > backend-service.yaml << 'EOL'
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: onda-app
spec:
  selector: { app: backend }
  ports: [ { protocol: TCP, port: 8080, targetPort: 8080 } ]
EOL

cat > frontend-deployment.yaml << 'EOL'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-frontend
  namespace: onda-app
spec:
  replicas: 1
  selector: { matchLabels: { app: react-frontend } }
  strategy: { type: Recreate }
  template:
    metadata: { labels: { app: react-frontend } }
    spec:
      containers:
        - name: frontend
          image: anoiraeg2003/react-frontend:latest
          imagePullPolicy: Always
          ports: [ { containerPort: 80 } ]
          env:
            - { name: REACT_APP_API_URL, value: "http://backend:8080/api" }
          resources:
            limits:   { memory: "256Mi", cpu: "200m" }
            requests: { memory: "128Mi", cpu: "100m" }
          securityContext:
            runAsNonRoot: true
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities: { drop: ["ALL"] }
EOL

cat > frontend-service.yaml << 'EOL'
apiVersion: v1
kind: Service
metadata:
  name: react-frontend
  namespace: onda-app
spec:
  selector: { app: react-frontend }
  ports: [ { protocol: TCP, port: 80, targetPort: 80 } ]
  type: NodePort
EOL

kubectl delete deployment backend -n onda-app --ignore-not-found=true
kubectl delete deployment react-frontend -n onda-app --ignore-not-found=true
sleep 5
kubectl apply -f mysql-pvc.yaml
kubectl apply -f mysql-configmap.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml
kubectl apply -f db-service.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

echo "==== ALL SERVICES IN NAMESPACE ===="
kubectl get svc -n onda-app || true
echo "==== ALL PODS STATUS ===="
kubectl get pods -n onda-app || true
echo "==== ACCESS THE APPLICATION ===="
FRONTEND_PORT=\$(kubectl get svc react-frontend -n onda-app -o jsonpath='{.spec.ports[0].nodePort}')
echo "Frontend should be accessible at: http://YOUR_CLUSTER_IP:\${FRONTEND_PORT}"
"""
        }
      }
    }
  }

  post {
    success { echo "✅ Déploiement réussi ! Build by ${CURRENT_USER} on ${CURRENT_DATE}" }
    failure { echo "❌ Le pipeline a échoué" }
    always  {
      // This is what prints the long "deleted: sha256:..." lines (safe cleanup).
      container('docker') { sh 'docker system prune -af || true' }
      // If you want to KEEP layers for faster builds, comment the line above.
    }
  }
}

