
pipeline {
  agent any
  tools {nodejs "NodeJS"}
  environment {
    PORT = '5050'
    POSTGRES_HOST = credentials('POSTGRES_HOST')
    POSTGRES_DATABASE = credentials('POSTGRES_DATABASE')
    POSTGRES_USER = credentials('POSTGRES_USER')
    POSTGRES_PASSWORD = credentials('POSTGRES_PASSWORD')
    POSTGRES_PORT = credentials('POSTGRES_PORT')
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run test:ci'
      }
    }
  }
}