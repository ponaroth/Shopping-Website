import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { ServicesComponent } from './services/services.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'services', component: ServicesComponent, canActivate: [AuthGuard]},
  { path: 'companies-list', component: CompaniesListComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  {path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'update-product', component:UpdateProductComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
