import { Injectable } from '@angular/core';
import Counter from "./counter"
import 'rxjs/add/operator/map';
import * as _ from 'lodash'
import { Subject, Observable, Subscription }    from 'rxjs/Rx';

@Injectable()
export class PerfService {
  private counter:any;
  public output:Observable<any>;

  constructor() {
    this.counter = new Counter();
    this.counter.load_display();
  }

  public start() {
    this.output = Observable.create(observer => {
      let data = [];
      let fn = (event)=>{
        if(event.action == "ADD") {
          data[event.id] = event.data
          data[event.id].unshift(`id: ${event.id}`);
        }
        else {
          data[event.id] = [];
        }
        //handle event
        _.debounce(() => { observer.next(data) }, 0);
        observer.next(data);
      }
      this.counter.start(fn);
    });

    return this.output;
  }
}
