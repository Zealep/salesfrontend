import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';
import {MatBadgeModule} from '@angular/material/badge';

import { MatMomentDateModule,MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTooltipModule,
    MatGridListModule,
    MatStepperModule,
    MatMomentDateModule,
    MatBadgeModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTooltipModule,
    MatGridListModule,
    MatStepperModule,
    MatMomentDateModule,
    MatBadgeModule
  ],
  providers: [
     {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
     {provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
     {provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
     {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
   ]
})
export class MaterialModule { }
