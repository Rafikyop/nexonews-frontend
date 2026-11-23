pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log -1 --oneline'
            }
        }

        stage('Verificar repositorio') {
            steps {
                sh 'ls -la'
                sh 'test -f compose.yaml'
                sh 'test -f angular/Dockerfile'
                sh 'test -f backend/Dockerfile'
            }
        }
    }

    post {
        success {
            echo 'Repositorio NexoNews verificado correctamente'
        }

        failure {
            echo 'Fallo la verificacion del repositorio'
        }
    }
}
