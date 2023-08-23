// Angular build-ins
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavElementComponent } from './side-bar/nav-element/nav-element.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { DetailsElementComponent } from './right-sidebar/details-element/details-element.component';
import { TagEditorComponent } from './right-sidebar/tag-editor/tag-editor.component';
import { DialogInfoComponent } from './right-sidebar/dialog-info/dialog-info.component';

// Material Ui components
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    SideBarComponent,
    NavElementComponent,
    RightSidebarComponent,
    DetailsElementComponent,
    TagEditorComponent,
    DialogInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    _MatSlideToggleRequiredValidatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatMenuModule,
    HttpClientModule,
    MatButtonModule, 
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
