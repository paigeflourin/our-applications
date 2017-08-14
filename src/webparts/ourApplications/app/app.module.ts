import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppSettings } from './shared/app.settings';
import { AppLoadingComponent } from './shared/loading/app.loading';
import { AppNotifyComponent } from './shared/notify/app.notify';
import { CustomModal } from './add-application-modal';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';


@NgModule({
    imports: [BrowserModule, 
        ModalModule.forRoot(),
        BootstrapModalModule],
    declarations: [
        AppComponent, 
        AppLoadingComponent,
        AppNotifyComponent],
    bootstrap: [AppComponent],
    entryComponents: [CustomModal]
})

export class AppModule {}