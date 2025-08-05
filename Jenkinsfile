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
      image: node:16
      command: ["cat"]
      tty: true
    - name: docker
      image: docker:20.10.16-dind
      securityContext:
        privileged: true
      env:
        - name: DOCKER_TLS_CERTDIR
          value: ""
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
    - name: dind-storage
      emptyDir: {}
"""
        }
    }

    environment {
        DOCKER_HUB_USER = 'anoiraeg2003'
        BACKEND_IMAGE = "${DOCKER_HUB_USER}/spring-backend:latest"
        FRONTEND_IMAGE = "${DOCKER_HUB_USER}/react-frontend:latest"
        DOCKER_HOST = "tcp://localhost:2375"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    def gitRepoUrl = 'https://github.com/AnoirELGUEDDAR/onda-website.git'
                    checkout([$class: 'GitSCM',
                              branches: [[name: '*/main']],
                              userRemoteConfigs: [[url: gitRepoUrl]],
                              extensions: [
                                      [$class: 'CleanBeforeCheckout'],
                                      [$class: 'CloneOption', noTags: false, shallow: true, depth: 1]
                              ]
                    ])
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Build Backend') {
                    steps {
                        container('maven') {
                            dir('backend') {
                                sh 'mvn clean package -DskipTests'
                            }
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        container('node') {
                            dir('frontend') {
                                sh 'npm ci'
                                sh 'npm run build'
                            }
                        }
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Test Backend') {
                    steps {
                        container('maven') {
                            dir('backend') {
                                sh 'mvn test'
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

        stage('Docker Build & Push') {
            steps {
                container('docker') {
                    sh 'until docker ps > /dev/null 2>&1; do sleep 1; done'

                    sh "docker build -t ${env.BACKEND_IMAGE} -f backend/Dockerfile ."
                    sh "docker build -t ${env.FRONTEND_IMAGE} -f frontend/Dockerfile ."
                    sh "docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASSWORD"
                    sh "docker push $BACKEND_IMAGE"
                    sh "docker push $FRONTEND_IMAGE"
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                container('ansible') {
                    sh 'pip install kubernetes'

                    sh '''
                    set -ex

                    # Create ansible directories
                    mkdir -p ansible/inventory
                    mkdir -p ansible/k8s-templates
                    mkdir -p ansible/k8s

                    # Create inventory
                    cat > ansible/inventory/hosts << 'EOL'
[kubernetes]
kubernetes-master ansible_host=kubernetes-api ansible_connection=local
EOL

                    # Copy and modify the deployment YAML - REMOVE the ConfigMap section
                    cp k8s/full-deployment.yaml ansible/k8s-templates/deployment-no-configmap.yaml.j2
                    
                    # Remove the ConfigMap section from the deployment
                    sed -i '/^---$/,/^---$/{ /kind: ConfigMap/,/^---$/d; }' ansible/k8s-templates/deployment-no-configmap.yaml.j2
                    
                    # Replace image tags
                    sed -i 's#image: anoiraeg2003/spring-backend:latest#image: {{ backend_image }}#g' ansible/k8s-templates/deployment-no-configmap.yaml.j2
                    sed -i 's#image: anoiraeg2003/react-frontend:latest#image: {{ frontend_image }}#g' ansible/k8s-templates/deployment-no-configmap.yaml.j2

                    # Create simple Ansible playbook
                    cat > ansible/deploy-kubernetes.yml << 'EOL'
---
- name: Deploy application to Kubernetes
  hosts: kubernetes
  gather_facts: no
  vars:
    backend_image: "${BACKEND_IMAGE}"
    frontend_image: "${FRONTEND_IMAGE}"
  tasks:
    - name: Ensure namespace exists
      kubernetes.core.k8s:
        api_version: v1
        kind: Namespace
        name: onda-app
        state: present

    - name: Create SQL ConfigMap directly from file
      kubernetes.core.k8s:
        state: present
        namespace: onda-app
        definition:
          apiVersion: v1
          kind: ConfigMap
          metadata:
            name: mysql-init-sql
            namespace: onda-app
          data:
            onda_flights.sql: "{{ lookup('file', '../db-init/onda_flights.sql') }}"

    - name: Apply other Kubernetes manifests
      template:
        src: k8s-templates/deployment-no-configmap.yaml.j2
        dest: k8s/deployment.yaml

    - name: Deploy resources
      kubernetes.core.k8s:
        state: present
        src: k8s/deployment.yaml
        namespace: onda-app
EOL

                    # Run the playbook
                    cd ansible
                    ansible-playbook -i inventory/hosts deploy-kubernetes.yml -v
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Déploiement réussi !'
        }
        failure {
            echo '❌ Le pipeline a échoué'
        }
    }
}
