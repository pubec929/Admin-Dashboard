import { Component, EventEmitter, Output, Input } from '@angular/core';
import { EndpointDataService } from '../services/endpoint-data.service';

function getVisibleData(data: any, pageSize: number, pageIndex: number) {
  return data.slice(pageSize * pageIndex, pageSize * pageIndex + pageSize);
}

// class Entry {
// //   constructor(
// // ) {}
// }

// const x = new Entry("Simon Müller", "online", "12.08.23", "1.0", "none", "1");
// console.log(x)
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent {
  @Output() itemSelected: EventEmitter<number> = new EventEmitter();
  @Input() selectedId: number = 0;

  constructor(public service: EndpointDataService) {}

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

  length = this.service.data.length;
  pageSize: any = 25;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, this.length];

  showPageSizeOptions = true;
  showFirstLastButtons = true;

  pageEvent: any;

  visibleData: any = getVisibleData(
    this.service.data,
    this.pageSize,
    this.pageIndex
  );

  download(_: any) {
    this.isDownloading = !this.isDownloading;
  }

  handlePageEvent(e: any) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.visibleData = getVisibleData(
      this.service.data,
      this.pageSize,
      this.pageIndex
    );
  }

  rowSelected(item: any) {
    // this.service.isClicked = item.id !== this.service.isClicked ? item.id : 0;
    this.selectedId = item.id !== this.selectedId ? item.id : 0;
    this.itemSelected.emit(this.selectedId);
  }
}
