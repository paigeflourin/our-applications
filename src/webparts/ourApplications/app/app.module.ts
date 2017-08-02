import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppSettings } from './shared/app.settings';
import { AppLoadingComponent } from './shared/loading/app.loading';
import { AppNotifyComponent } from './shared/notify/app.notify';

@NgModule({
    imports: [BrowserModule],
    declarations: [
        AppComponent, 
        AppLoadingComponent,
        AppNotifyComponent],
    bootstrap: [AppComponent]
})

export class AppModule {}