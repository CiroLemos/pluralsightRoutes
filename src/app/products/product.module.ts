import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolverService } from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { AuthGuard } from '../user/auth.guard';
import { ProductEditGuard } from './product-edit/product-edit.guard';

//Configuração da rota quando o projeto não estava configurado para lazy load.
const ROUTE_NO_LAZY =
  [
    {
      path: 'products',
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          component: ProductListComponent
        },
        {
          path: ':id',
          component: ProductDetailComponent,
          resolve: { resolvedData: ProductResolverService }
        },
        {
          path: ':id/edit', component: ProductEditComponent,
          canDeactivate: [ProductEditGuard],
          resolve: { resolvedData: ProductResolverService },
          children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: ProductEditInfoComponent },
            { path: 'tags', component: ProductEditTagsComponent }
          ]
        }
      ]
    }
  ];

  //Configuração para lazy loading.
  const ROUTE_WITH_LAZY = 
  [
    {
      path: '',
      component: ProductListComponent
    },
    {
      path: ':id',
      component: ProductDetailComponent,
      resolve: { resolvedData: ProductResolverService }
    },
    {
      path: ':id/edit', component: ProductEditComponent,
      canDeactivate: [ProductEditGuard],
      resolve: { resolvedData: ProductResolverService },
      children: [
        { path: '', redirectTo: 'info', pathMatch: 'full' },
        { path: 'info', component: ProductEditInfoComponent },
        { path: 'tags', component: ProductEditTagsComponent }
      ]
    }
  ]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTE_WITH_LAZY)
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ]
})
export class ProductModule { }
