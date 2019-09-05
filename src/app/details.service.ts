import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  url = 'http://localhost:8002/'

  constructor(private http: HttpClient) { }
  getworkItems() {
    if (localStorage.getItem('workItems') == '') {
      localStorage.setItem('workItems', JSON.stringify([]));
      return []
    } else {
      let workItems = JSON.parse(localStorage.getItem('workItems'));
      return workItems;
    }
  }

  postDetails() {
    let workItems = JSON.parse(localStorage.getItem('workItems'));
    for (let i = 0; i < workItems.length; i++) {
      return this.http.request('GET', 'https://script.google.com/macros/s/AKfycbxGW-O-Xo6CvCv8Wlqsipj56HwIpKtJ8VTu3vXmZAqF5664eBs/exec', workItems[i]); //}
    }
  }
  addWork(newWork) {
    var workItems: any = [];
    if (localStorage.getItem('workItems') != null) var workItems = JSON.parse(localStorage.getItem('workItems'));
    // Add New workItemservice
    workItems.push(newWork);
    // Set New workItems
    localStorage.setItem('workItems', JSON.stringify(workItems));
    return this.getworkItems();
  }

  deleteWork(item) {
    let workItems = JSON.parse(localStorage.getItem('workItems'));

    for (let i = 0; i < workItems.length; i++) {
      if (workItems[i].id == item.id) workItems.splice(i, 1);
    }
    // Set New workItems
    localStorage.setItem('workItems', JSON.stringify(workItems));
    return this.getworkItems();
  }

  updateWork(item) {
    let workItems = JSON.parse(localStorage.getItem('workItems'));

    for (let i = 0; i < workItems.length; i++) {
      if (workItems[i].id == item.id) {
        workItems[i] = item;
      }
    }
    // Set New workItems
    localStorage.setItem('workItems', JSON.stringify(workItems));
    return this.getworkItems();
  }
}
