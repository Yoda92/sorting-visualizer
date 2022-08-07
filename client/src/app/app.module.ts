import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LineColorClassPipe } from 'src/pipes/lineColorClass.pipe';
import { LineHeightStylePipe } from 'src/pipes/lineHeightStyle.pipe';
import { LineWidthStylePipe } from 'src/pipes/lineWidthStyle.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SortingVisualizationComponent } from './sorting-visualization/sorting-visualization.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown/dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SortingVisualizationComponent,
    LineColorClassPipe,
    LineHeightStylePipe,
    LineWidthStylePipe,
    NavbarComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
