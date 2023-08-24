import { Component, computed, effect, signal, OnDestroy} from '@angular/core';
import { EndpointDataService} from '../services/endpoint-data.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnDestroy{
  constructor(public service: EndpointDataService) {
    effect(() => {
      this.service.refetch();
      this.visibleData$ = this.load(this.pageIndex(), this.pageSize(), this.query()); 
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

  query = signal("");

  pageSize = signal(25);
  pageIndex = signal(0);
  total = signal(0);
  pageSizeOptions = computed(() => [5, 10, 25, this.total()]);

  showPageSizeOptions = true;
  showFirstLastButtons = true;

  pageEvent: any;

  visibleData$ = this.load(this.pageIndex(), this.pageSize()); 

  load(skip:number, take:number, query: string=""){
    return this.service.fetchData(skip * take, take, query)
    .pipe(tap(resp=> this.total.set(resp.metadata.totalItems)), map(resp=> resp.content))  
  }
  
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
    this.service.selectedId.set(item.id !== this.service.selectedId() ? item.id : 0);
  }

  debounce(cb: any, delay = 250) {
    let timeout: any;
  
    return (...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(...args)
      }, delay)
    }
  }

  search = this.debounce((query: string) => {
    this.query.set(query)
    this.pageIndex.set(0);
    this.pageSize.set(25);
  }, 500)


  onInput(event: any) {
    this.search(event.target.value)
  }

  ngOnDestroy() {
    this.service.selectedId.set(0);
  }
}
