import { Component, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { EndpointDataService } from '../../services/endpoint-data.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.css'],
})
export class TagEditorComponent {
  @Input() selectedId: number = 0;
  @Input() tags: string[] = []
  constructor(public service: EndpointDataService) {}

  
  // endpoint = this.service.getEndpoint(this.selectedId);
  originalTags: string[] = [];

  addingTag = false;
  formControl = new FormControl(['angular']);

  onClick(event: MouseEvent) {
    this.addingTag = true;
    // console.log(this.addingTag)
  }

  @ViewChild("tagInput") input: any;
  onSubmit(_: MouseEvent) {

      if (this.tags.toString() === this.originalTags.toString() && this.input.nativeElement.value === "") {
        this.addingTag = false;
        console.log("return")
        return;
      }
      this.service.updateTags(this.selectedId, [...this.tags, this.input.nativeElement.value]).subscribe(
        () => { this.service.fetchId(this.selectedId).pipe(tap(_ => {
          this.service.refetch.set(!this.service.refetch())
          this.addingTag = false;
        })).subscribe();} 
      );
  }

  removeKeyword(keyword: string) {
    // // const index = this.endpoint!.tag.indexOf(keyword);
    // if (index >= 0) {
    //   // this.service.data.mutate(_ => this.endpoint!.tag = this.endpoint!.tag.filter((val, i) => i !== index))
    // }
    const index = this.tags.indexOf(keyword);
    this.tags = this.tags.filter((val, i) => i != index)
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if ('selectedId' in changes) this.endpoint = this.service.getEndpoint(this.selectedId);
    this.originalTags = [...this.tags];
  }
}
