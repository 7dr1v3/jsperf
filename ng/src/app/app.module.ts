import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { PerfService } from './perf/services/perf.service';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfComponent } from './perf/perf.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    PerfService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
