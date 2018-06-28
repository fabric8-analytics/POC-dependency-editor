import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    AccordionModule
} from 'ngx-bootstrap';
import {
    HttpModule
} from '@angular/http';
import {
    FormsModule
} from '@angular/forms';
import {
    ListElementModule
} from '../list-element/list-element.module';
import {
    InsightComponent
} from './insights.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip/tooltip.module';


@NgModule({
    imports: [
        CommonModule,
        AccordionModule.forRoot(),
        TooltipModule.forRoot(),
        HttpModule,
        FormsModule,
        ListElementModule
    ],
    declarations: [
        InsightComponent
    ],
    exports: [
        InsightComponent
    ],
    providers: []
})
export class InsightModule {}
