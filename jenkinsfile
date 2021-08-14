pipeline {
    agent {
        docker {
            image 'node:12'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'mv ./dist/* /home/static'
            }
        }
    }
}