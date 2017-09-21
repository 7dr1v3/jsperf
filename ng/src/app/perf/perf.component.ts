import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { PerfService } from './services/perf.service';

@Component({
  selector: 'perf',
  styleUrls: ['./perf.component.css'],
  templateUrl: './perf.component.html'
})
export class PerfComponent {
  public table:any;
  constructor(private perf: PerfService) {

  }

  ngOnInit() {
    this.table = this.perf.start();
  }
}
