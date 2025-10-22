import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-second-component',
  imports: [],
  templateUrl: './second-component.component.html',
  styleUrl: './second-component.component.scss'
})
export class SecondComponentComponent {
  @Input() title: string = 'Micro Frontend Remote';
  @Input() message: string = 'Este é um componente injetado via Angular Elements!';

  sendMessage() {
    alert('Mensagem do Micro Frontend: ' + this.message);
  }
}
