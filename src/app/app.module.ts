import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from 'src/app/shared/interceptor/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
