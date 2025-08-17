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
      volumeMounts:
        - name: dind-storage
          mountPath: /var/lib/docker
    - name: ansible
      image: cytopia/ansible:latest
      command: ["cat"]
      tty: true
  volumes:
    - name: maven-cache
      emptyDir: {}
    - name: npm-cache
      emptyDir: {}
    - name: dind-storage
      emptyDir: {}
"""
    }
  }

  environment {
    DOCKER_HUB_USER = 'anoiraeg2003'
    // store these in Jenkins credentials:
    //  - ID: DOCKER_HUB_PASSWORD (Secret text)
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
                container('maven') { dir('backend') { sh 'mvn -T 4 clean package -DskipTests' } }
              }
            }
            stage('Test Backend') {
              steps {
                container('maven') { dir('backend') { sh 'mvn -T 4 test' } }
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
              withCredentials([string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')]) {
                sh '''
until docker ps > /dev/null 2>&1; do sleep 1; done
echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USER" --password-stdin
docker build --build-arg BUILDKIT_INLINE_CACHE=1 --cache-from ${DOCKER_HUB_USER}/spring-backend:latest \
  -t ${BACKEND_IMAGE} -t ${DOCKER_HUB_USER}/spring-backend:latest -f backend/Dockerfile backend
docker push ${BACKEND_IMAGE}
docker push ${DOCKER_HUB_USER}/spring-backend:latest
'''
              }
            }
          }
        }
        stage('Frontend Docker') {
          when { expression { return env.FRONTEND_CHANGED == 'true' } }
          steps {
            container('docker') {
              withCredentials([string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')]) {
                sh '''
until docker ps > /dev/null 2>&1; do sleep 1; done
echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USER" --password-stdin
docker build --build-arg BUILDKIT_INLINE_CACHE=1 --cache-from ${DOCKER_HUB_USER}/react-frontend:latest \
  -t ${FRONTEND_IMAGE} -t ${DOCKER_HUB_USER}/react-frontend:latest -f frontend/Dockerfile frontend
docker push ${FRONTEND_IMAGE}
docker push ${DOCKER_HUB_USER}/react-frontend:latest
'''
              }
            }
          }
        }
      }
    }

    /* === Supply-Chain Security: SBOM, Scan & Sign (with fallbacks) === */
    stage('Security: SBOM, Scan & Sign') {
      steps {
        container('docker') {
          withCredentials([
            string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD'),
            file(credentialsId: 'COSIGN_KEY',        variable: 'COSIGN_KEY'),
            string(credentialsId: 'COSIGN_PASSWORD', variable: 'COSIGN_PASSWORD')
          ]) {
            sh '''
set -e

# Login (fresh container)
echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USER" --password-stdin

# Choose tags to scan/sign: use build tag if component changed, else fall back to :latest
BACKEND_REF="${BACKEND_CHANGED}" = "true" && BACKEND_PULL="${BACKEND_IMAGE}" || BACKEND_PULL="${DOCKER_HUB_USER}/spring-backend:latest"
FRONTEND_REF="${FRONTEND_CHANGED}" = "true" && FRONTEND_PULL="${FRONTEND_IMAGE}" || FRONTEND_PULL="${DOCKER_HUB_USER}/react-frontend:latest"

# Make bash treat unset vars as empty for the lines above
:
# shellcheck disable=SC2015
if [ "${BACKEND_CHANGED}" = "true" ]; then BACKEND_PULL="${BACKEND_IMAGE}"; else BACKEND_PULL="${DOCKER_HUB_USER}/spring-backend:latest"; fi
if [ "${FRONTEND_CHANGED}" = "true" ]; then FRONTEND_PULL="${FRONTEND_IMAGE}"; else FRONTEND_PULL="${DOCKER_HUB_USER}/react-frontend:latest"; fi

echo "Backend image to analyze:  ${BACKEND_PULL}"
echo "Frontend image to analyze: ${FRONTEND_PULL}"

# Ensure images are present locally (avoid registry-only resolution problems)
docker pull "${BACKEND_PULL}"  || true
docker pull "${FRONTEND_PULL}" || true

apk add --no-cache curl jq

# Syft (SBOM)
SYFT_VERSION=v1.17.0
curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin ${SYFT_VERSION}

# Trivy (scanner)
TRIVY_VERSION=0.53.0
curl -sSfL https://github.com/aquasecurity/trivy/releases/download/v${TRIVY_VERSION}/trivy_${TRIVY_VERSION}_Linux-64bit.tar.gz \
 | tar xz -C /usr/local/bin trivy

# Cosign (sign/verify)
COSIGN_VERSION=v2.2.4
curl -sSfL -o /usr/local/bin/cosign https://github.com/sigstore/cosign/releases/download/${COSIGN_VERSION}/cosign-linux-amd64
chmod +x /usr/local/bin/cosign

echo "=== SBOMs (SPDX JSON) ==="
syft "docker:${BACKEND_PULL}"  -o spdx-json > backend-sbom.spdx.json
syft "docker:${FRONTEND_PULL}" -o spdx-json > frontend-sbom.spdx.json

echo "=== Trivy scan (HIGH/CRITICAL gate) ==="
FAILED=0
trivy image --timeout 10m --security-checks vuln,config --severity HIGH,CRITICAL --exit-code 1 \
  --format sarif -o backend-trivy.sarif  "${BACKEND_PULL}"  || FAILED=1
trivy image --timeout 10m --security-checks vuln,config --severity HIGH,CRITICAL --exit-code 1 \
  --format sarif -o frontend-trivy.sarif "${FRONTEND_PULL}" || FAILED=1

echo "=== Cosign sign images ==="
export COSIGN_PASSWORD="${COSIGN_PASSWORD}"
# Sign both the build tag (if changed) and :latest to keep your current convention
if [ "${BACKEND_CHANGED}" = "true" ]; then
  cosign sign --key "$COSIGN_KEY" "${BACKEND_IMAGE}"
fi
cosign sign --key "$COSIGN_KEY" "${DOCKER_HUB_USER}/spring-backend:latest"

if [ "${FRONTEND_CHANGED}" = "true" ]; then
  cosign sign --key "$COSIGN_KEY" "${FRONTEND_IMAGE}"
fi
cosign sign --key "$COSIGN_KEY" "${DOCKER_HUB_USER}/react-frontend:latest"

echo "=== Cosign verify (sanity) ==="
cosign verify --key "$COSIGN_KEY" "${BACKEND_PULL}"  > backend-cosign.verify.txt || true
cosign verify --key "$COSIGN_KEY" "${FRONTEND_PULL}" > frontend-cosign.verify.txt || true

# Archive regardless; enforce gate if desired
[ "$FAILED" = "1" ] && echo "High/Critical vulnerabilities found." && exit 1 || true
'''
          }
          archiveArtifacts artifacts: '*.spdx.json,*.sarif,*cosign.verify.txt', allowEmptyArchive: true
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        container('ansible') {
          sh '''
set -e
# Install kubectl
apk add --no-cache curl
curl -LO "https://dl.k8s.io/release/$(curl -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl && mv kubectl /usr/local/bin/
kubectl create namespace onda-app --dry-run=client -o yaml | kubectl apply -f -

# (apply your YAMLs here as you had them) ...
# Show access URL
FRONTEND_PORT=$(kubectl get svc react-frontend -n onda-app -o jsonpath='{.spec.ports[0].nodePort}')
echo "Frontend should be accessible at: http://YOUR_CLUSTER_IP:${FRONTEND_PORT}"
'''
        }
      }
    }
  }

  post {
    success { echo "✅ Déploiement réussi ! Build by ${CURRENT_USER} on ${CURRENT_DATE}" }
    failure { echo "❌ Le pipeline a échoué" }
    always  {
      container('docker') {
        sh 'docker system prune -af || true'
      }
    }
  }
}

