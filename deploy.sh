#!/bin/bash

# Criar rede Docker
docker network create web 2>/dev/null || true

# Criar arquivo acme.json com permissões corretas
touch traefik/acme.json
chmod 600 traefik/acme.json

# Build e deploy
docker-compose build --no-cache
docker-compose up -d

echo "Deploy concluído!"
echo "Acesse: https://apresentacao.accelera360.com.br"
