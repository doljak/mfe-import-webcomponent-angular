import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RemoteWidgetComponent } from './remote-widget/remote-widget.component';

@Component({
  selector: 'app-root',
  imports: [RemoteWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'remote-app';
}
