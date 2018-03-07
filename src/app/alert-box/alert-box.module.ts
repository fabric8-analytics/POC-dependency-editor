import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AlertBoxComponent } from './alert-box.component';
import { IssueModule } from '../issue/issue.module';
import {ChartModule} from '../utils/chart/chart.module' ;


@NgModule({
 imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    IssueModule,
    ChartModule
],
 declarations: [
    AlertBoxComponent
],
 exports: [
    AlertBoxComponent,
],
 providers: [],
})
export class AlertBoxModule { }