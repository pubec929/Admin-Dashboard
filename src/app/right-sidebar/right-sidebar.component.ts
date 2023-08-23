import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  HostListener,
} from '@angular/core';
import { EndpointDataService, data } from '../services/endpoint-data.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnChanges {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() selectedId: number = 0;
  constructor(public service: EndpointDataService) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: any) {
    if (event.key === 'Escape') this.close.emit();
  }

  // data$ = this.service.fetchId(1).subscribe(val => console.log(val));
  // test(val: any) {
  //   return JSON.stringify(val);
  // }

  data$ = this.service.fetchId(8);
  

  handleClick() {
    this.close.emit();
  }

  handleFirstToggle(event: MouseEvent, id: number, stopMalware: boolean, response: boolean) {
    this.service.updateAgentConfig(id, !stopMalware, response).subscribe( () => {
        this.data$ = this.service.fetchId(this.selectedId)
      });
  }

  handleSecondToggle(event: MouseEvent, id: number, stopMalware: boolean, response: boolean) {
    this.service.updateAgentConfig(id, stopMalware, !response).subscribe( () => {
      this.data$ = this.service.fetchId(this.selectedId)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedId' in changes) {
      // this.data$ = this.service.fetchId(this.selectedId).subscribe(val => console.log(val));
      // console.log("changed")
      this.data$ = this.service.fetchId(this.selectedId)
    }
  }

}
