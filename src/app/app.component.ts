import { Component } from '@angular/core';
import { EndpointDataService } from './services/endpoint-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public service: EndpointDataService) {}

  // handleKeyPress(event: any) {
  //   console.log("jlaödsjflksdf", event);
  // }

  itemSelected(id:number){
    this.service.selectedId.set(id);
  }

  close(_: boolean) {
    this.service.selectedId.set(0);
  }
}