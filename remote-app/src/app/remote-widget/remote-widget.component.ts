import { Component, Input } from '@angular/core';

@Component({
  selector: 'remote-widget',
  imports: [],
  templateUrl: './remote-widget.component.html',
  styleUrl: './remote-widget.component.scss'
})
export class RemoteWidgetComponent {
  @Input() title: string = 'Micro Frontend Remote';
  @Input() message: string = 'Este é um componente injetado via Angular Elements!';
  
  counter: number = 0;

  sendMessage() {
    alert('Mensagem do Micro Frontend: ' + this.message);
  }

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
