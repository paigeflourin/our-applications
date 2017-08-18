import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddApplicationComponent } from './add-application-modal';

export const RouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: AppComponent },
    { path: 'add', component: AddApplicationComponent }
    
];