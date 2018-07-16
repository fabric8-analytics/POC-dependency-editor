import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule, TooltipModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DependencyEditorTokenProvider } from '../shared/depeditor-tokenprovider';
import { ModalModule } from 'ngx-modal';

import { DependencyEditorComponent } from './dependency-editor.component';
import { InsightModule } from '../insights/insights.module';
import { AddDependencyModule } from '../add-dependency/add-dependency.module';
import { SecurityModule } from '../security/security.module';
import { LicenseModule } from '../license/license.module';
import { CurrentprojectModule } from '../current-project/current-project.module';
import { DependencyEditorService } from '../shared/dependency-editor.service';
import { URLProvider } from '../shared/url-provider';
import { ErrorMessageHandler } from '../shared/error-message-handler';
import { HttpInterceptor } from '../shared/http-interceptor';
import { TelemetryService } from '../shared/telemetry.service';

@NgModule({
 imports: [
    CommonModule,
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    HttpModule,
    FormsModule,
    ModalModule,
    InsightModule,
    AddDependencyModule,
    SecurityModule,
    LicenseModule,
    CurrentprojectModule
],
 declarations: [
    DependencyEditorComponent
],
 exports: [
    DependencyEditorComponent
],
 providers: [
    URLProvider,
    DependencyEditorTokenProvider,
    DependencyEditorService,
    ErrorMessageHandler,
    HttpInterceptor,
    TelemetryService
 ]
})
export class DependencyEditorModule {}
