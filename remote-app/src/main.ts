import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { bootstrapApplication } from '@angular/platform-browser';
import { RemoteWidgetComponent } from './app/remote-widget/remote-widget.component';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { SecondComponentComponent } from './app/second-component/second-component.component';

interface WebComponentElement {
  name: string;
  component: any;
  constant?: any;
}

// Verificar se está em modo de desenvolvimento (porta 4201) ou produção (bundle)
const isDev = window.location.port === '4201';

console.log('🌍 Ambiente detectado:', isDev ? 'Desenvolvimento (4201)' : 'Produção (bundle)', 'Port:', window.location.port);

if (isDev) {
  // Modo desenvolvimento - mostra como aplicação normal
  console.log('🚀 Iniciando modo desenvolvimento...');
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
} else {
  // Modo produção - registra como web component
  console.log('🔧 Modo produção detectado, registrando web component...');

  // Verificar se o web component já foi registrado
  const elements = [
    { name: 'remote-widget', component: RemoteWidgetComponent },
    { name: 'second-component', component: SecondComponentComponent }
  ]

  for (const element of elements) {
    verifyWebComponentRegistration(element);
  }
  
}
function verifyWebComponentRegistration(element: WebComponentElement) {
  if (customElements.get(element.name)) {
    console.log(`⚠️ Web component "${element.name}" já estava registrado`);
  } else {
    (async () => {
      try {
        const app = await createApplication();

        // Criar o custom element
        element.constant = createCustomElement(element.component, { injector: app.injector });

        // Registrar o custom element
        customElements.define(element.name, element.constant);
        console.log(`✅ Web component "${element.name}" registrado com sucesso!`);

        // Disparar evento para notificar que está pronto
        window.dispatchEvent(new CustomEvent(`${element.name}-ready`));
      } catch (error) {
        console.error('❌ Erro ao registrar web component:', error);
      }
    })();
  }
}