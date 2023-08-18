import { Component } from '@angular/core';
import { EndpointDataService } from './services/endpoint-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  selectedId:number = 0;
 
  constructor(public service: EndpointDataService) {}

  // handleKeyPress(event: any) {
  //   console.log("jlaödsjflksdf", event);
  // }

  itemSelected(id:number){
    this.selectedId = id;
  }

  close(_: boolean) {
    console.log("event received")
    this.selectedId = 0;
  }
}