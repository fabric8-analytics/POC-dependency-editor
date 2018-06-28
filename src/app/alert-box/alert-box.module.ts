import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AlertBoxComponent } from './alert-box.component';
import { ChartModule } from '../utils/chart/chart.module' ;
import { AlertLoaderModule } from '../alert-loader/alert-loader.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip/tooltip.module';


@NgModule({
 imports: [
    AlertLoaderModule,
    TooltipModule.forRoot(),
    CommonModule,
    HttpModule,
    FormsModule,
    ChartModule
],
 declarations: [
    AlertBoxComponent
],
 exports: [
    AlertBoxComponent
],
 providers: []
})
export class AlertBoxModule {}
