# Deploy em Produção

## Pré-requisitos

1. Docker e Docker Compose instalados
2. Domínio `apresentacao.accelera360.com.br` apontando para o servidor
3. Credenciais da API do Cloudflare

## Configuração

1. Configure as variáveis de ambiente do Cloudflare:
```bash
cp .env.example .env
# Edite .env com suas credenciais
```

2. Atualize o email no arquivo `traefik/traefik.yml` (linha 14)

## Deploy

```bash
chmod +x deploy.sh
./deploy.sh
```

## Verificação

```bash
# Ver logs
docker-compose logs -f

# Status dos containers
docker-compose ps
```

## Comandos Úteis

```bash
# Parar
docker-compose down

# Rebuild
docker-compose build --no-cache

# Ver certificados
docker-compose exec traefik cat /acme.json
```

## Notas

- Certificados SSL são gerados automaticamente via Let's Encrypt
- HTTP redireciona automaticamente para HTTPS
- Compressão gzip ativada
- Headers de segurança configurados
