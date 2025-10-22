# Micro Frontends com Angular Elements

Este projeto demonstra uma implementação de Micro Frontends usando Angular Elements para criar web components. O projeto consiste em duas aplicações Angular independentes:

- **Host App**: Aplicação principal que consome o micro frontend
- **Remote App**: Micro frontend que é convertido em web component e injetado no host

## 🏗️ Arquitetura

### Host Application (`host-app/`)
- Aplicação Angular principal
- Consome o micro frontend via web component
- Carrega dinamicamente o bundle JS do remote
- Interface para controlar a exibição do micro frontend

### Remote Application (`remote-app/`)
- Micro frontend independente
- Convertido em web component usando Angular Elements
- Compilado em um bundle único
- Copiado automaticamente para os assets do host

## 🚀 Como Usar

### 1. Instalação das Dependências
```bash
# Instalar dependências da raiz
npm install

# Instalar dependências em ambos os projetos
npm run install:all
```

### 2. Build do Projeto Completo
```bash
# Build completo (remote + host)
npm run build
```

### 3. Desenvolvimento
```bash
# Executar apenas o host (após build do remote)
npm start

# Build apenas o remote
npm run build:remote

# Build apenas o host  
npm run build:host
```

### 4. Tasks do VS Code
Use as seguintes tasks no VS Code (Ctrl/Cmd + Shift + P > "Tasks: Run Task"):
- **Build All**: Compila todo o projeto
- **Build Remote MFE**: Compila apenas o micro frontend
- **Start Host App**: Executa a aplicação host

## 🎯 Funcionalidades

### Remote Widget Component
O micro frontend inclui:
- ✅ Propriedades configuráveis (`title`, `message`)
- ✅ Estado interno (contador)
- ✅ Interações (botões, alerts)
- ✅ Estilos encapsulados
- ✅ Interface responsiva

### Host Application
A aplicação host oferece:
- ✅ Carregamento dinâmico do web component
- ✅ Toggle para mostrar/ocultar o micro frontend
- ✅ Interface limpa e intuitiva
- ✅ Comunicação com o web component via propriedades

## 📁 Estrutura do Projeto

```
mfes_injects/
├── .github/
│   └── copilot-instructions.md    # Instruções para o Copilot
├── .vscode/
│   ├── tasks.json                 # Tasks do VS Code
│   ├── launch.json                # Configurações de debug
│   └── extensions.json            # Extensões recomendadas
├── host-app/                      # Aplicação host
│   ├── src/
│   │   └── app/
│   │       ├── app.component.html # Template do host
│   │       ├── app.component.ts   # Lógica do host
│   │       └── app.component.scss # Estilos do host
│   └── public/
│       └── remote-widget.js       # Bundle do micro frontend
├── remote-app/                    # Micro frontend
│   ├── src/
│   │   └── app/
│   │       └── remote-widget/     # Componente do micro frontend
│   ├── build-bundle.js            # Script de build customizado
│   └── angular.json               # Configuração Angular customizada
├── package.json                   # Scripts do workspace
└── README.md                      # Esta documentação
```

## 🔧 Configurações Técnicas

### Angular Elements Setup
O projeto remote usa Angular Elements para criar web components:

```typescript
// main.ts do remote
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { RemoteWidgetComponent } from './app/remote-widget/remote-widget.component';

(async () => {
  const app = await createApplication();
  const remoteWidget = createCustomElement(RemoteWidgetComponent, { 
    injector: app.injector 
  });
  customElements.define('remote-widget', remoteWidget);
})();
```

### Build Process
1. **Remote Build**: Compila o projeto Angular normalmente
2. **Bundle Creation**: Script customizado concatena os arquivos JS
3. **Asset Copy**: Bundle é copiado para `host-app/public/`
4. **Host Build**: Host pode ser compilado com o bundle incluído

### Dynamic Loading
O host carrega o micro frontend dinamicamente:

```typescript
private loadRemoteWidget() {
  const script = document.createElement('script');
  script.src = '/remote-widget.js';
  script.onload = () => console.log('Micro frontend carregado!');
  document.head.appendChild(script);
}
```

## 🌐 Acesso à Aplicação

Após executar `npm start`, acesse:
- **Host Application**: http://localhost:4200

## 🎨 Customização

### Modificar o Remote Widget
1. Edite `remote-app/src/app/remote-widget/`
2. Execute `npm run build:remote`
3. Recarregue o host para ver as mudanças

### Adicionar Novos Web Components
1. Crie novos componentes no remote-app
2. Registre-os em `main.ts`
3. Use no host com `CUSTOM_ELEMENTS_SCHEMA`

## 🛠️ Tecnologias Utilizadas

- **Angular 19**: Framework principal
- **Angular Elements**: Criação de web components
- **TypeScript**: Linguagem de desenvolvimento
- **SCSS**: Pré-processador CSS
- **Node.js**: Runtime e scripts de build

## 📝 Notas de Desenvolvimento

- O bundle do remote é copiado automaticamente para o host
- Mudanças no remote requerem novo build
- O host suporta hot reload normalmente
- Web components permitem completo encapsulamento
- Comunicação via propriedades e eventos customizados

## 🚀 Próximos Passos

- [ ] Implementar comunicação bidirecional
- [ ] Adicionar roteamento no micro frontend
- [ ] Configurar deploy independente dos MFEs
- [ ] Implementar lazy loading
- [ ] Adicionar testes unitários e E2E
