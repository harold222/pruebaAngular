import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    ErrorComponent,
    NavbarComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorComponent,
    NavbarComponent,
    NotificationsComponent
  ]
})
export class SharedModule { }
