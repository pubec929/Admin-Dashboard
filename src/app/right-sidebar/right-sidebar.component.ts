import {
  Component,
  EventEmitter,
  Output,
  HostListener,
  effect
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
export class RightSidebarComponent {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  constructor(
    public service: EndpointDataService,
    public MatDialog: MatDialog
  ) {
    effect(() => {
      this.data$ = this.service.fetchId(this.service.selectedId());
    })
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: any) {
    if (event.key === 'Escape') this.close.emit();
  }

  data$ = this.service.fetchId(8);

  handleClick() {
    this.close.emit();
  }

  handleFirstToggle(
    _: MouseEvent,
    id: number,
    stopMalware: boolean,
    response: boolean
  ) {
    this.service.updateAgentConfig(id, !stopMalware, response).subscribe(() => {
      this.data$ = this.service.fetchId(this.service.selectedId());
    });
  }

  handleSecondToggle(
    _: MouseEvent,
    id: number,
    stopMalware: boolean,
    response: boolean
  ) {
    this.service.updateAgentConfig(id, stopMalware, !response).subscribe(() => {
      this.data$ = this.service.fetchId(this.service.selectedId());
    });
  }

  handleDelete(_: MouseEvent, name: string, status: string, agentId: number) {
    const dialogRef = this.MatDialog.open(DialogInfoComponent, {
      width: '1000px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { name, status },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data.confirmed) return;
      if (data.checked) {
        // delete whole endpoint close sidebar and update main content
        this.service.deleteEndpoint(this.service.selectedId()).subscribe(() => {
          this.close.emit();
          this.service.refetch.set(!this.service.refetch())
        });
      } else {
        // delete just the agent and show agent not existent on sidebar
        this.service.deleteAgent(agentId).subscribe(() => {
          this.data$ = this.service.fetchId(this.service.selectedId());
        })
      }
    });
  }
}
