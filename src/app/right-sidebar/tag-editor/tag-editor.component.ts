import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { EndpointDataService } from '../../services/endpoint-data.service';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.css'],
})
export class TagEditorComponent {
  @Input() selectedId: number = 0;
  constructor(public service: EndpointDataService) {}

  // endpoint = this.service.getEndpoint(this.selectedId);

  addingTag = false;
  formControl = new FormControl(['angular']);

  onClick(event: MouseEvent) {
    this.addingTag = true;
  }

  // removeKeyword(keyword: string) {
  //   // const index = this.endpoint!.tag.indexOf(keyword);
  //   if (index >= 0) {
  //     // this.service.data.mutate(_ => this.endpoint!.tag = this.endpoint!.tag.filter((val, i) => i !== index))
  //   }
  // }

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   // Add our keyword
  //   if (value) {
  //     // this.service.data.mutate(_ => this.endpoint!.tag = [...this.endpoint!.tag, value]);
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();
  // }
  ngOnChanges(changes: SimpleChanges): void {
    // if ('selectedId' in changes) this.endpoint = this.service.getEndpoint(this.selectedId);
  }
}
