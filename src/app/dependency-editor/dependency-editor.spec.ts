import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyEditorComponent } from './dependency-editor.component';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-modal';
import { InsightModule } from '../insights/insights.module';
import { AddDependencyModule } from '../add-dependency/add-dependency.module';
import { SecurityModule } from '../security/security.module';
import { LicenseModule } from '../license/license.module';
import { CurrentprojectModule } from '../current-project/current-project.module';
import { URLProvider } from '../shared/url-provider';
import { DependencyEditorTokenProvider } from '../shared/depeditor-tokenprovider';
import { DependencyEditorService } from '../shared/dependency-editor.service';
import { ErrorMessageHandler } from '../shared/error-message-handler';

describe('DependencyEditorComponent', () => {
  let component: DependencyEditorComponent;
  let fixture: ComponentFixture<DependencyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AccordionModule.forRoot(),
        HttpModule,
        FormsModule,
        ModalModule,
        AddDependencyModule,
        CurrentprojectModule,
        InsightModule,
        SecurityModule,
        LicenseModule
    ],
     declarations: [
        DependencyEditorComponent
    ],
     providers: [
        URLProvider,
        DependencyEditorTokenProvider,
        DependencyEditorService,
        ErrorMessageHandler
     ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
