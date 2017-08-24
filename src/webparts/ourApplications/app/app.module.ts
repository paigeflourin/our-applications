import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppSettings } from './shared/app.settings';
import { AppLoadingComponent } from './shared/loading/app.loading';
import { AppNotifyComponent } from './shared/notify/app.notify';
//import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AddApplicationComponent } from './add-application-modal';

@NgModule({
    imports: [BrowserModule,
        //ModalModule.forRoot(),
    ], 
    providers: [
        AppSettings
    ],
    declarations: [
        AppComponent, 
        AddApplicationComponent,
        AppLoadingComponent,
        AppNotifyComponent],
    bootstrap: [AppComponent],
    //entryComponents: [AddApplicationComponent]
})

export class AppModule {}