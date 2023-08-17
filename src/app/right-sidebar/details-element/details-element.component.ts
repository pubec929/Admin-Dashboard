import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-element',
  templateUrl: './details-element.component.html',
  styleUrls: ['./details-element.component.css']
})
export class DetailsElementComponent {
    @Input()  key!:any;
    @Input()  value!:any;
}
