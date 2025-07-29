pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'anoiraeg2003'
        BACKEND_IMAGE = "${DOCKERHUB_USER}/spring-backend:latest"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/react-frontend:latest"
    }

    stages {
        stage('Checkout Jenkins Upgrade3 Git Repository') {
            steps {
                script {
                    // Clone the Git repository's master branch
                    def gitRepoUrl = 'https://github.com/AnoirELGUEDDAR/onda-website.git'

                    checkout([$class: 'GitSCM',
                              branches: [[name: '*/main']],
                              userRemoteConfigs: [[url: gitRepoUrl]],
                              extensions: [[$class: 'CleanBeforeCheckout'], [$class: 'CloneOption', noTags: false, shallow: true, depth: 1]]
                    ])
                }
            }
        }


        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }

        stage('Build and Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npm test -- --watchAll=false --passWithNoTests || true'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    sh "docker build -t anoiraeg2003/spring-backend:latest -f backend/Dockerfile ."
                    sh "docker build -t anoiraeg2003/react-frontend:latest -f frontend/Dockerfile ."
                    sh "docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASSWORD"
                    sh "docker push $BACKEND_IMAGE"
                    sh "docker push $FRONTEND_IMAGE"
                }
            }
        }


    stage('Deploy') {
        steps {
            sh 'docker-compose down --remove-orphans' //it recreates only changed containers
            sh 'docker-compose pull && docker-compose up -d'
        }
    }
}
}
