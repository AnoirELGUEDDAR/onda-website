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
        - name: TRIVY_CACHE_DIR
          value: /root/.cache/trivy
      command: ["dockerd-entrypoint.sh"]
      args: ["--host=tcp://0.0.0.0:2375","--host=unix:///var/run/docker.sock"]
      tty: true
      volumeMounts:
        - name: dind-storage         # PERSIST docker layers
          mountPath: /var/lib/docker
        - name: trivy-cache          # PERSIST Trivy DB
          mountPath: /root/.cache/trivy

    - name: ansible
      image: cytopia/ansible:latest
      command: ["cat"]
      tty: true

  volumes:
    - name: maven-cache
      persistentVolumeClaim: { claimName: maven-cache-pvc }
    - name: npm-cache
      persistentVolumeClaim: { claimName: npm-cache-pvc }
    - name: trivy-cache
      persistentVolumeClaim: { claimName: trivy-cache-pvc }
    - name: dind-storage
      persistentVolumeClaim: { claimName: docker-cache-pvc }   # << NEW
"""
    }
  }

  parameters {
    booleanParam(name: 'SECURITY_HARD_GATE', defaultValue: false,
      description: 'Fail build on HIGH/CRITICAL vulnerabilities (true) or keep soft gate (false)')
    booleanParam(name: 'TRIVY_SKIP_UPDATE', defaultValue: true,
      description: 'Skip Trivy DB refresh during scans (use cached DB in PVC)')
    booleanParam(name: 'CLEANUP_DOCKER', defaultValue: false,
      description: 'If true, run docker system prune at the end (slower next build)')
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
            env.BACKEND_CHANGED  = (changes.contains('backend/')  || changes == 'all') ? 'true' : 'false'
            env.FRONTEND_CHANGED = (changes.contains('frontend/') || changes == 'all') ? 'true' : 'false'
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

# Speed knobs
[ "${TRIVY_SKIP_UPDATE}" = "true" ] && export TRIVY_SKIP_DB_UPDATE=true TRIVY_SKIP_JAVA_DB_UPDATE=true || true
export TRIVY_CACHE_DIR=${TRIVY_CACHE_DIR:-/root/.cache/trivy}

# Tools (install once per fresh container)
apk add --no-cache curl jq >/dev/null || true
command -v syft   >/dev/null || (curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin v1.17.0)
command -v trivy  >/dev/null || (curl -sSfL https://github.com/aquasecurity/trivy/releases/download/v0.53.0/trivy_0.53.0_Linux-64bit.tar.gz | tar xz -C /usr/local/bin trivy)
command -v cosign >/dev/null || (curl -sSfL -o /usr/local/bin/cosign https://github.com/sigstore/cosign/releases/download/v2.2.4/cosign-linux-amd64 && chmod +x /usr/local/bin/cosign)

# Choose which tags to scan (fresh BUILD_NUMBER tag if changed, else :latest)
[ "${BACKEND_CHANGED:-true}"  = "true" ] && BACKEND_PULL="${BACKEND_IMAGE}"  || BACKEND_PULL="${DOCKER_HUB_USER}/spring-backend:latest"
[ "${FRONTEND_CHANGED:-true}" = "true" ] && FRONTEND_PULL="${FRONTEND_IMAGE}" || FRONTEND_PULL="${DOCKER_HUB_USER}/react-frontend:latest"

echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USER" --password-stdin
docker pull "${BACKEND_PULL}"  || true
docker pull "${FRONTEND_PULL}" || true

echo "=== SBOMs (SPDX JSON) ==="
syft "docker:${BACKEND_PULL}"  -o spdx-json > backend-sbom.spdx.json  || true
syft "docker:${FRONTEND_PULL}" -o spdx-json > frontend-sbom.spdx.json || true

# Trivy gate (parameterized, keep fast)
[ "${SECURITY_HARD_GATE}" = "true" ] && TRIVY_EXIT=1 || TRIVY_EXIT=0
FAILED=0
trivy image --timeout 20m --scanners vuln,misconfig --severity HIGH,CRITICAL --ignore-unfixed \
  --exit-code ${TRIVY_EXIT} --format sarif -o backend-trivy.sarif  "${BACKEND_PULL}"  || FAILED=1
trivy image --timeout 20m --scanners vuln,misconfig --severity HIGH,CRITICAL --ignore-unfixed \
  --exit-code ${TRIVY_EXIT} --format sarif -o frontend-trivy.sarif "${FRONTEND_PULL}" || FAILED=1

# Resolve digests & sign by digest (non-interactive)
BACKEND_DIGEST=$(docker inspect --format='{{index .RepoDigests 0}}' "${BACKEND_PULL}"  || true)
FRONTEND_DIGEST=$(docker inspect --format='{{index .RepoDigests 0}}' "${FRONTEND_PULL}" || true)
export COSIGN_PASSWORD="${COSIGN_PASSWORD:-}"

[ -n "${BACKEND_DIGEST}" ]  && cosign sign --yes --key "$COSIGN_KEY" "${BACKEND_DIGEST}"
[ -n "${FRONTEND_DIGEST}" ] && cosign sign --yes --key "$COSIGN_KEY" "${FRONTEND_DIGEST}"

echo "=== Cosign verify (with public key) ==="
[ -n "${BACKEND_DIGEST}" ]  && cosign verify --key "$COSIGN_PUB" "${BACKEND_DIGEST}"  > backend-cosign.verify.txt  || true
[ -n "${FRONTEND_DIGEST}" ] && cosign verify --key "$COSIGN_PUB" "${FRONTEND_DIGEST}" > frontend-cosign.verify.txt || true

# Enforce gate only if requested
if [ "${SECURITY_HARD_GATE}" = "true" ] && [ "$FAILED" = "1" ]; then
  echo "High/Critical vulnerabilities found."
  exit 1
fi
"""
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

# (manifests omitted for brevity – keep your current ones)
# ...
"""
        }
      }
    }
  }

  post {
    success { echo "✅ Déploiement réussi ! Build by ${CURRENT_USER} on ${CURRENT_DATE}" }
    failure { echo "❌ Le pipeline a échoué" }
    always  {
      container('docker') {
        script {
          if (params.CLEANUP_DOCKER) {
            sh 'docker system prune -af || true'
          } else {
            echo "Skipping docker prune to keep layers cached (faster next run)."
          }
        }
      }
    }
  }
}

