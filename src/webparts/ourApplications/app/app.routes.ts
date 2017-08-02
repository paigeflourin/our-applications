import { Routes } from '@angular/router';
import { AppComponent } from './app.component';


export const RouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: AppComponent },
    /*{
        path: 'emp',
        children: [
            { path: '', redirectTo: 'manage', pathMatch: 'full' },
            { path: 'manage', component: ManageComponent }
        ]
    }*/
];