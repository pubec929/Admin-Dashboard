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
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnChanges {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Input() selectedId: number = 0;
  constructor(public service: EndpointDataService, public MatDialog: MatDialog) {}

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

  handleFirstToggle(_: MouseEvent, id: number, stopMalware: boolean, response: boolean) {
    this.service.updateAgentConfig(id, !stopMalware, response).subscribe( () => {
        this.data$ = this.service.fetchId(this.selectedId)
      });
  }

  handleSecondToggle(_: MouseEvent, id: number, stopMalware: boolean, response: boolean) {
    this.service.updateAgentConfig(id, stopMalware, !response).subscribe( () => {
      this.data$ = this.service.fetchId(this.selectedId)
    });
  }

  handleDelete(_: MouseEvent, name: string, status: string) {
    
    const dialogRef = this.MatDialog.open(DialogInfoComponent, {
      width: '1000px',
      enterAnimationDuration: "300ms",
      exitAnimationDuration: "300ms",
      data: { name, status }
    });

    dialogRef.afterClosed().subscribe(checked => {
      console.log("The dialog was closed", checked);
      if (checked) {
        // delete whole endpoint close sidebar and update main content
      } else {
        // delete just the agent and show agent not existent on sidebar
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedId' in changes) {
      // this.data$ = this.service.fetchId(this.selectedId).subscribe(val => console.log(val));
      // console.log("changed")
      this.data$ = this.service.fetchId(this.selectedId)
    }
  }

}
