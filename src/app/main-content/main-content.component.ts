import { Component, EventEmitter, Output, Input, computed, effect} from '@angular/core';
import { EndpointDataService} from '../services/endpoint-data.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {
  @Output() itemSelected: EventEmitter<number> = new EventEmitter();
  @Input() selectedId: number = 0;

  constructor(public service: EndpointDataService) {
    effect(() => {
      this.service.refetch();
      this.visibleData$ = this.load(this.pageIndex, this.pageSize); 
      console.log("refetch");
    })
  }
  isDownloading = false;

  displayedColumns = [
    'Name',
    'Status',
    'lastUpdate',
    'Version',
    'Tag',
    'Organisationseinheit',
  ];

  selectOptions = [
    { value: 'option-0', viewValue: 'Test 1' },
    { value: 'option-1', viewValue: 'Test 2' },
    { value: 'option-2', viewValue: 'Test 3' },
  ];

  pageSize = 25;
  pageIndex = 0;
  total:number = 0;
  pageSizeOptions = [5, 10, 25, this.total];

  showPageSizeOptions = true;
  showFirstLastButtons = true;

  pageEvent: any;

  visibleData$ = this.load(this.pageIndex, this.pageSize); 

  load(skip:number, take:number){
    return this.service.fetchData(skip * take, take)
    .pipe(tap(resp=> this.total = resp.metadata.totalItems ), map(resp=> resp.content))  
  }
  
  download(_: any) {
    this.isDownloading = !this.isDownloading;
  }
  
  handlePageEvent(e: any) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    
    this.visibleData$ = this.load(e.pageIndex, e.pageSize);
  }

  rowSelected(item: any) {
    // this.service.isClicked = item.id !== this.service.isClicked ? item.id : 0;
    this.selectedId = item.id !== this.selectedId ? item.id : 0;
    this.itemSelected.emit(this.selectedId);
  }
}
