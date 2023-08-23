import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.css']
})
export class DialogInfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, status: string}) { }

  isChecked = false;

  onClick(_: MouseEvent) {
    this.isChecked = !this.isChecked;
  }
}
