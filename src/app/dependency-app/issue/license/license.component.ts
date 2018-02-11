import {  Component,  OnInit,  OnChanges,  Input,  Output,  EventEmitter,  ViewEncapsulation } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';
import * as c3 from 'c3';

@Component({
  selector: 'license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.less']
})

export class LicenseComponent implements OnInit {
  
  public issue_name: string;
  public issue_symbol: string;
  public issue_status: string;
  public alert_title: string;
  public colored: string ;
  public license_issue: boolean = true;
  public licenseData: any = [['data1', 30], ['data2', 120]];
  public y: any = [['data1', 30], ['data2', 120]];
  
  constructor() { }

  ngOnInit() {}


}
