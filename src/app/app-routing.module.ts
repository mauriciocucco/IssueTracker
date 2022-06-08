import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'issues',
    loadChildren: () =>
      import('./modules/issues/issues.module').then((m) => m.IssuesModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'issues',
  },
  {
    path: '**',
    redirectTo: 'issues',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
