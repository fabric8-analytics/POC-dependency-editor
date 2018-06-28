import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentprojectComponent } from './current-project.component';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SecurityModule } from '../security/security.module';
import { LicenseModule } from '../license/license.module';
import { DependencyEditorService } from '../shared/dependency-editor.service';
import { HttpInterceptor } from '../shared/http-interceptor';
import { DependencyEditorTokenProvider } from '../shared/depeditor-tokenprovider';
import { URLProvider } from '../shared/url-provider';

describe('CurrentprojectComponent', () => {
  let component: CurrentprojectComponent;
  let fixture: ComponentFixture<CurrentprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
         CommonModule,
         AccordionModule.forRoot(),
         HttpModule,
         FormsModule,
         SecurityModule,
         LicenseModule
     ],
      declarations: [
         CurrentprojectComponent
     ],
     providers: [
       HttpInterceptor,
       DependencyEditorService,
       DependencyEditorTokenProvider,
       URLProvider
     ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
