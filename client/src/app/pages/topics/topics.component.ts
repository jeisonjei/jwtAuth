import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

const baseUrl = 'http://localhost:8000/api/';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent {
  constructor(){}
  // ***************************************************************
  http = inject(HttpClient);
  data = null;
  getData() {
    var url = baseUrl + 'topics/';
    this.http.get(url).subscribe((res:any) => {
      this.data = JSON.stringify(res, null, 2);
     });
  }

}
