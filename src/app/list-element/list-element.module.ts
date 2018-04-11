import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';

import { URLProvider } from '../shared/url-provider';
import { DependencyEditorTokenProvider } from '../shared/depeditor-tokenprovider';
import { DependencyEditorService } from '../shared/dependency-editor.service';
import { ListElementComponent } from './list-element.component';


@NgModule({
 imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    TooltipModule.forRoot()
],
 declarations: [
    ListElementComponent
],
 exports: [
    ListElementComponent
],
    providers: [
        URLProvider,
        DependencyEditorTokenProvider,
        DependencyEditorService
    ]
})
export class ListElementModule {}
