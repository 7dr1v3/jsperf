import { Routes } from '@angular/router';

import { PerfComponent } from './perf/perf.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'perf', pathMatch: 'full' },
  { path: 'perf', component: PerfComponent }
];
