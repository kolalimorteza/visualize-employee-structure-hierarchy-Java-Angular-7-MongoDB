/**
 * Angular 2 decorators and services
 */
import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data-service';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public treeConfig = {
    nodeWidth: 350,
    nodeHeight: 180
  };
  constructor(private _httpClient: HttpClient, private data: DataService) {

  }
  public searchText: any = 'Sajjan';
  public tree: any;
  getAllEmployees(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`/api/getAllEmployee`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }
    );
  }

  onTextChange(event: any) {
    this.data.changeMessage(event.target.value);
  }

  public ngOnInit(): void {

    this.data.currentMessage.subscribe(message => {
      console.log('subscribed message ' + message);
      this.searchText = message;
    });
    console.log('ng on init called');
    this.getAllEmployees().then((result) => {
      let json: any;
      console.log(result);
      json = result['data'];
      this.tree = {
        json: json,
        config: this.treeConfig
      };
      this.tree['searchText'] = 'Deepak';
      console.log(this.tree);
    });
  }
}
