
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
    }

    environment {
        COMPOSE_PROJECT_NAME = "nexonewsci${BUILD_NUMBER}"
        POSTGRES_DB = 'nexonews_ci'
        POSTGRES_USER = 'nexonews_app'
        POSTGRES_PASSWORD = credentials('nexonews-ci-db-password')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log -1 --oneline'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    docker compose config --quiet
                    docker compose build
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''

                    docker compose version

                    docker version

                    docker compose up -d --wait --wait-timeout 180

                    docker compose ps

                    docker compose exec -T db psql \
                    -v ON_ERROR_STOP=1 \
                    -U "$POSTGRES_USER" \
                    -d "$POSTGRES_DB" \
                    -c "CREATE TABLE IF NOT EXISTS noticias (
                        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                        titulo VARCHAR(200) NOT NULL,
                        descripcion TEXT NOT NULL,
                        categoria VARCHAR(100) NOT NULL,
                        autor VARCHAR(150) NOT NULL,
                        fecha TIMESTAMPTZ NOT NULL DEFAULT NOW()
                    );"

                    docker compose exec -T api node -e "
                    (async () => {
                    for (let i = 0; i < 15; i++) {
                        try {
                        const r = await fetch('http://web/api/health');
                        if (r.ok) process.exit(0);
                        } catch {}
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                    process.exit(1);
                    })()
                    "

                    docker compose exec -T api node - <<'JS'
                    const assert = require('node:assert/strict');

                    async function probarIntegracion() {
                        const base = 'http://web';

                        const health = await fetch(`${base}/api/health`);
                        assert.equal(health.status, 200);

                        const nueva = {
                            titulo: 'Prueba Jenkins NexoNews',
                            descripcion: 'Integracion automatizada con PostgreSQL',
                            categoria: 'Tecnologia',
                            autor: 'Jenkins'
                        };

                        const post = await fetch(`${base}/api/noticias`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(nueva)
                        });

                        assert.equal(post.status, 201);

                        const creada = await post.json();
                        assert.ok(creada.id);

                        const get = await fetch(`${base}/api/noticias`);
                        assert.equal(get.status, 200);

                        const noticias = await get.json();

                        assert.ok(
                            noticias.some(n => n.id === creada.id),
                            'La noticia no fue recuperada'
                        );

                        console.log('SUCCESS: noticia creada y recuperada');
                        console.log('SUCCESS: comunicacion entre contenedores');
                    }

                    probarIntegracion().catch(error => {
                        console.error(error);
                        process.exit(1);
                    });
                    JS
                '''.stripIndent()
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Integracion continua de NexoNews'
        }

        failure {
            echo 'FAILURE: Revisar la consola de Jenkins'
        }

        always {
            sh '''
                docker compose logs --no-color --tail=40 || true
                docker compose down -v --remove-orphans || true
            '''

            deleteDir()
        }
    }
}
