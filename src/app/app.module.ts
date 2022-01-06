import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './features/core/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverlayModule} from "@angular/cdk/overlay";
import { DropdownDirective } from './shared/components/dropdown/dropdown.directive';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    DropdownComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
