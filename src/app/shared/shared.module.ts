import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [HeaderComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    MaterialModule,
    HeaderComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
