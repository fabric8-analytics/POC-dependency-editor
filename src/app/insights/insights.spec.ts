import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightComponent } from './insights.component';
import { CommonModule } from '@angular/common';
import { AccordionModule, TooltipModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ListElementModule } from '../list-element/list-element.module';
import { DependencyEditorService } from '../shared/dependency-editor.service';
import { HttpInterceptor } from '../shared/http-interceptor';
import { URLProvider } from '../shared/url-provider';
import { DependencyEditorTokenProvider } from '../shared/depeditor-tokenprovider';

describe('InsightComponent', () => {
  let component: InsightComponent;
  let fixture: ComponentFixture<InsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      providers: [
        DependencyEditorService,
        HttpInterceptor,
        URLProvider,
        DependencyEditorTokenProvider
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
