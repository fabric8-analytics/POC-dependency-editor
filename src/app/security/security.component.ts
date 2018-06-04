import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
import {
  AccordionModule
} from 'ngx-bootstrap';
import {
  AlertBox, BoosterInfo, CveResponseModel
} from '../model/data.model';

@Component({
  selector: 'app-security',
  styleUrls: ['./security.component.less'],
  templateUrl: './security.component.html'
})

export class SecurityComponent implements OnInit, OnChanges {
  @Input() cveData: CveResponseModel;
  @Input() boosterInfo: BoosterInfo;

  public title = 'Security Alert';
  public icon = 'fa fa-shield';
  public noOfCves = 0;
  public hasIssue = false;
  public toHave = false;
  public secureIssue = false;
  public itSecurity = true;
  public cveName: any = [];

  public alertConfig: AlertBox = null;
  private config: any = {};

  constructor() {}

  ngOnChanges() {
    this.formAlert();
  }

  ngOnInit() {
    this.formAlert();
  }

  public formAlert() {
    this.hasIssue = false;
    this.secureIssue = false;
    this.cveName = [];
    if (this.cveData) {
      this.noOfCves = 0;
      let count = -1;
      this.itSecurity = true;
      this.cveData.result.forEach(item => {
        count++;
        if (item.cve) {
          this.noOfCves++;
          this.hasIssue = true;
          this.secureIssue = true;

          if (item.cve !== null) {
            this.cveName.push({
              isAccordion: false,
              primaryText: item.cve.details && item.cve.details.length > 0 ? item.cve.details[0].cve_id : '',
              secondaryText: item.package
            });
          }
        }
      });
      if (this.noOfCves > 0) {
        this.itSecurity = false;
      }
    } else {
      this.noOfCves = null;
    }



    // Forms configuration to make use of alert-box component

  this.config = {
      header: {
        icon: this.icon,
        name: this.title,
        countInfo: this.noOfCves,
        indicator: this.itSecurity === false ? 'ERROR' : ''
      },
      body: {
        normal: this.cveName,
        defaultText: 'The analytics engine has not identified any security issues affecting your stack.'
      }
  };



  this.alertConfig = <AlertBox> this.config;

  }

  public getShow(event: any) {
    this.toHave = event.toShow;
  }
}
