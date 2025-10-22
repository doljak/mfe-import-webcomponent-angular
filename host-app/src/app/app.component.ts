import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'host-app';
  showRemoteWidget = false;

  ngOnInit() {
    this.loadRemoteWidget();
  }

  toggleRemoteWidget() {
    this.showRemoteWidget = !this.showRemoteWidget;
    console.log('🔄 Toggle remote widget:', this.showRemoteWidget);
  }

  private loadRemoteWidget() {
    // Carregar o script do micro frontend dos assets locais
    const script = document.createElement('script');
    script.src = '/remote-widget.js'; // Bundle local no host
    console.log('📦 Carregando bundle do micro frontend...');
    
    // Escutar quando o web component estiver pronto
    window.addEventListener('remote-widget-ready', () => {
      console.log('🎉 Web component pronto para uso!');
    });
    
    script.onload = () => {
      console.log('✅ Micro frontend carregado com sucesso!');
      // Verificar se o web component foi registrado
      setTimeout(() => {
        const isRegistered = customElements.get('remote-widget');
        console.log('🔍 Web component registrado?', !!isRegistered);
        if (!isRegistered) {
          console.error('❌ Web component não foi registrado após carregamento');
        }
      }, 100);
    };
    
    script.onerror = () => {
      console.error('❌ Erro ao carregar micro frontend');
    };
    
    document.head.appendChild(script);
  }
}
