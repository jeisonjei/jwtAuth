import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FocusDirective } from './directives/focus.directive';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { LoggingInterceptor } from './interceptors/logging.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FocusDirective,
    LoginComponent,
    TopicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
