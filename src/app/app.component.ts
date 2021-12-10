import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1><span class="important">{{ title }}</span></h1>\n' + '<h2>Harry Yuan</h2>' +
    '    <app-form></app-form>\n',
  styles: ['.important {\n' +
  '  color:  blue;\n' +
  '}']
})
export class AppComponent {
  title = 'Problem Set 6 - CS412';
}
