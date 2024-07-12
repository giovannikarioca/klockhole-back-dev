#klockhole

Stack BACK Node.js, Fastify, Prisma, Cloudflare R2
Stack FRONT Vite JS + React TS

## Requisitos Funcionais (RFs):
- [x] Deve ser possivel realizar novos uploads;
- [ ] Deve ser possivel visualizar os últimos 5 uploads realizados;
- [x] Não deve ser possível realizar upload com nome de arquivos iguais;
- [ ] Criar tela de dashboard (home);
- [ ] Criar tela de configurações de perfil;

## Regras de negócio (RNs):
- [ ] Os uploads devem ser removidos automaticamente após 7 dias;
- [ ] Só deve ser possível visualizar uploads não expirados;
- [ ] Só deve ser possível realizar upload de arquivos seguros;
- [x] Só deve ser possível fazer upload de arquivos de até 300mb cada;

## Requisitos Não Funcionais (RNFs):
- [x] Utilização do Cloudflare R2 para upload de arquivos;
- [x] O upload deve ser feito diretamente pelo front-end utilizando Presigned URLs;
- [x] Realizar requisições com axios;
- [x] Os links para compartilhamento devem ser assinados evitando acesso público;
- [x] Utilizar Docker;
- [x] Utilizar DB PostgreSQL;
- [x] Utilizar httpie para realizar requisições
- [x] Validar com zod;

## Anotações importantes:

## Conexão com  CloudFlare (AWS SDK)
- [x] Criar bucket;
- [x] Configurar s3Cliente
- [x] Realizar teste de conexão
- [x] Gerar URL com getSignedUrl

#### Upload no CloudFlare
- [x] Upload com arquivos pequenos até 100mb
- [ ] Upload com arquivos grandes até 1GB

## Boas práticas
- [ ] Desacoplar front e back
- [ ] Criar mecanismos de segurança no ato do upload
- [ ] Organizar projeto
- [ ] Manter documentação atualizada

## Mime Types

## Trechos do código
