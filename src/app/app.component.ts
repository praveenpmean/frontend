import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private detailsService:DetailsService){
    
  }
  details:any
  folderID = 'p1';
  createItemData: any = false;
  search = '';
  status = '';
  message:any = false;
  ngOnInit(){
    this.getRecords();  
    //this.detailsService.postDetails();
  }

  getRecords(){
    this.details = this.detailsService.getworkItems();
  }
  
  SendDataToSheet(){
    this.detailsService.postDetails().subscribe((data) => {
      this.message = "Work Item date uploaded to spreadSheet"
      setTimeout(() => { this.message = false;  }, 5000)
    })
  }
  selectedItem:any
  selectEditItem(i, item){
    this.selectedItem=i
  }

  edit(item){
    if(this.createItemData)  this.details = this.detailsService.addWork(item);
    else this.details = this.detailsService.updateWork(item);
    this.selectedItem = null;
    if(this.createItemData) this.message = "New Work Item was created successfully"
    else this.message = "Work Item updated successfully"
    setTimeout(() => { this.message = false;  }, 5000)
    this.createItemData = false;
   
  }

  createItem(item){
    this.selectedItem = null;
    this.createItemData = {id: Math.floor((Math.random() * 1000) + 1), Item: '', Date: '', resources: 0};
  }

  DeleteItem(item){
    if(confirm('Are you sure due you want to delete ?')){
      this.details = this.detailsService.deleteWork(item)
    }
  }

  searchValue(){
 
   if(this.search != '' || this.status != '' ) return  this.details.filter(item => (item.Item.indexOf(this.search) != -1 && item.status.indexOf(this.status) != -1));
   else return  this.details;
  }
}
