import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  HostListener,
} from '@angular/core';
import { EndpointDataService } from '../services/endpoint-data.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnChanges {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() selectedId: number = 0;
  constructor(public service: EndpointDataService) {}

  // close() {
  //   this.selectedId = 0;
  // }
  isChecked = true;

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: any) {
    if (event.key === 'Escape') this.close.emit();
  }

  handleClick() {
    console.log('clicked');
    this.close.emit();
  }

  handleFirstToggle(event: MouseEvent) {
    this.data.agent.stopMalware = !this.data.agent.stopMalware;
  }

  handleSecondToggle(event: MouseEvent) {
    this.data.agent.response = !this.data.agent.response;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedId' in changes) {
      this.data = this.service.getEndpoint(this.selectedId);
    }
  }

  data: any;
}
