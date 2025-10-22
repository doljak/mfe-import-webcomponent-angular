# Micro Frontends com Angular Elements

Este workspace contém dois Micro Frontends (MFEs) usando Angular Elements para web components:

## Estrutura do Projeto

- `host-app/` - Aplicação host que consome o micro frontend
- `remote-app/` - Micro frontend que é injetado como web component

## Tecnologias

- Angular 19+
- Angular Elements  
- Web Components
- TypeScript

## Configuração

Ambos os projetos estão configurados para:
- Usar Angular Elements para criar web components
- Bundle único que é copiado para o host
- Build otimizado para produção
- Desenvolvimento com hot reload

## Scripts Principais

- `npm start` - Inicia desenvolvimento do host
- `npm run build:remote` - Build do micro frontend (copia bundle para host)
- `npm run build` - Build completo de ambos projetos

## Desenvolvimento

1. Execute `npm run build:remote` para gerar o bundle do micro frontend
2. Execute `npm start` para iniciar o host em http://localhost:4200
3. O micro frontend está disponível como web component `<remote-widget>`