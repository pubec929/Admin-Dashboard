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

  addingTag = false;
  keywords =
    this.selectedId != 0 ? this.service.getEndpoint(this.selectedId)!.tag : [];
  formControl = new FormControl(['angular']);

  onClick(event: MouseEvent) {
    console.log('clicked');
    this.addingTag = true;
  }

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.service.getEndpoint(this.selectedId)!.tag.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  test() {
    console.log(this.keywords);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedId' in changes) {
      this.keywords =
        this.selectedId != 0
          ? this.service.getEndpoint(this.selectedId)!.tag
          : [];
    }
  }
}
