import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentprojectComponent } from '../current-project/current-project.component';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AlertBoxModule } from '../alert-box/alert-box.module';
import { LicenseComponent } from '../license/license.component';

import { DependencyEditorService } from '../shared/dependency-editor.service';
import { HttpInterceptor } from '../shared/http-interceptor';
import { URLProvider } from '../shared/url-provider';
import { DependencyEditorTokenProvider } from '../shared/depeditor-tokenprovider';

describe('LicenseComponent', () => {
  let component: LicenseComponent;
  let fixture: ComponentFixture<LicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AccordionModule.forRoot(),
        HttpModule,
        FormsModule,
        AlertBoxModule
     ],
      declarations: [
        LicenseComponent
     ],
     providers: [
      HttpInterceptor,
      DependencyEditorService,
      URLProvider,
      DependencyEditorTokenProvider
     ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
