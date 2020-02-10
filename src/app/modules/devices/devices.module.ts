import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InViewportModule } from 'ng-in-viewport';

import { MaterialModule } from '../../material.module';
import { DevicesRoutingModule } from './devices-routing.module';

import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { DetailComponent } from './detail/detail.component';
import { ListConfigDialogComponent } from './list-config-dialog/list-config-dialog.component';

@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    DetailComponent,
    ListConfigDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    DevicesRoutingModule,
    MaterialModule,
    InViewportModule
  ],
  entryComponents: [
    ListConfigDialogComponent
  ]
})
export class DevicesModule { }
