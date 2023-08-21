import { Component, EventEmitter, Output, Input, computed, signal, effect} from '@angular/core';
import { EndpointDataService } from '../services/endpoint-data.service';

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

  pageSize = signal(25);
  pageIndex = signal(0);
  pageSizeOptions = [5, 10, 25, this.service.data()?.length ?? 0];

  showPageSizeOptions = true;
  showFirstLastButtons = true;

  pageEvent: any;

  visibleData = computed(() => (this.service.data() ?? [] ) .slice(this.pageSize() * this.pageIndex(), this.pageSize() * this.pageIndex() + this.pageSize()))

  download(_: any) {
    this.isDownloading = !this.isDownloading;
  }

  handlePageEvent(e: any) {
    this.pageEvent = e;
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);    
  }

  rowSelected(item: any) {
    // this.service.isClicked = item.id !== this.service.isClicked ? item.id : 0;
    this.selectedId = item.id !== this.selectedId ? item.id : 0;
    this.itemSelected.emit(this.selectedId);
  }
}
