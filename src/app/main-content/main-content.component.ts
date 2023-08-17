import { Component, VERSION, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
 
interface tableEntry{
  id:number,
  name: string,
  status: string,
  lastUpdate: string,
  version: string,
  tag: string,
  organisationUnit: string
}

function getVisibleData(data: tableEntry[], pageSize: number, pageIndex: number) {
  return data.slice(pageSize  * pageIndex, pageSize * pageIndex + pageSize);
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
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  constructor(private elRef: ElementRef, private sanitizer: DomSanitizer) {
  }

  isClicked = 0; // id of the row that was clicked

  tmp = 1;

  data: tableEntry[] = [
    {id:this.tmp++, name: "Aerified", status: "Deinstallation geplant", lastUpdate: "01.01.2000, 01:00:20", version: "20230124_1155", tag: "Test", organisationUnit: "...ATA Endpoint View Inc./A-OU"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "1", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "2", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "3", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "4", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "5", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "6", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "7", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "8", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "9", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "10", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "11", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "12", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "13", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "14", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "15", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "16", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "17", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "18", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "19", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "20", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "21", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "22", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "23", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "24", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "25", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "26", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "27", version: "1.0.1", tag: "", organisationUnit: "1412"},
    {id:this.tmp++, name: "Simon", status: "online", lastUpdate: "28", version: "1.0.1", tag: "", organisationUnit: "1412"},
  ]
  displayedColumns = ["Name", "Status", "lastUpdate", "Version", "Tag", "Organisationseinheit"]

  selectOptions = [
    {value: "option-0", viewValue: "Test 1"},
    {value: "option-1", viewValue: "Test 2"},
    {value: "option-2", viewValue: "Test 3"}
  ]

  length = this.data.length;
  pageSize: any = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, this.length];

  hze = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;

  pageEvent: any;

  visibleData: tableEntry[] = getVisibleData(this.data, this.pageSize, this.pageIndex)

  handlePageEvent(e: any) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.visibleData = getVisibleData(this.data, this.pageSize, this.pageIndex)
  }

  rowSelected(item: any){
    console.log(item);
    this.isClicked = item.id;
  }
}
