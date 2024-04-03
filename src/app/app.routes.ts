import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@users/pages/list/list.component').then(m => m.ListComponent)
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
