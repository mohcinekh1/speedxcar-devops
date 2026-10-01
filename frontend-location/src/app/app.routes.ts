import { Routes } from '@angular/router';
import { Login} from './features/auth/components/login/login';
import {Register} from './features/auth/components/register/register';
import { Onboarding1 } from './features/onboarding/components/onboarding-1/onboarding-1';
import { Onboarding2 } from './features/onboarding/components/onboarding-2/onboarding-2';
import { Onboarding3 } from './features/onboarding/components/onboarding-3/onboarding-3';
import {Home} from './features/public/pages/home/home';
import { Vehicles } from './features/public/pages/vehicles/vehicles';
import { CarDetails } from './features/public/pages/car-details/car-details';
import { AdminCars } from './features/admin/pages/admin-cars/admin-cars';
import { CarForm } from './features/admin/pages/car-form/car-form';

export const routes: Routes = [
  {path : '' , component : Onboarding1},
  {path : 'onboarding-1' , component : Onboarding1},
  {path : 'onboarding-2' , component : Onboarding2},
  {path : 'onboarding-3' , component : Onboarding3},
  {path : 'login' , component : Login},
  {path : 'register', component : Register},
  {path : 'home' , component : Home},
  {path : 'vehicles' , component : Vehicles},
  {path : 'details' , redirectTo: 'vehicles', pathMatch: 'full'},
  {path : 'details/:id' , component : CarDetails},
  {path : 'admin/cars' , component : AdminCars},
  {path : 'admin/cars/new' , component : CarForm},
  {path : 'admin/cars/edit/:id' , component : CarForm}
];
