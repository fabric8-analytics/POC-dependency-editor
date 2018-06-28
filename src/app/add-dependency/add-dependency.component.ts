import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  NgModule,
  ViewEncapsulation,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  AccordionModule
} from 'ngx-bootstrap';
import {
  ModalModule
} from 'ngx-modal';
import {
  ComponentInformationModel,
  DependencySearchItem,
  DependencySnapshotItem,
  CategorySearchItem,
  CveResponseModel,
  BoosterInfo
} from '../model/data.model';
import {
  DependencyEditorService
} from '../shared/dependency-editor.service';
import {
  ErrorMessageHandler
} from '../shared/error-message-handler';
import {
  DependencySnapshot
} from '../utils/dependency-snapshot';
import { FilterPipe } from './add-dependency.pipe';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-dependency',
  styleUrls: ['./add-dependency.component.less'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './add-dependency.component.html'
})

export class AddDependencyComponent implements OnInit, OnDestroy, OnChanges {
  @Input() boosterInfo: BoosterInfo;
  @Input() dependencies: Array < ComponentInformationModel > ;
  @Input() dependencyAdded: Array < DependencySnapshotItem > ;
  @Input() existDependencies: Array < DependencySnapshotItem > ;
  @ViewChild('PackagePreview') modalPackagePreview: any;

  public queryString: any;
  public categoryString: string;
  public dependencySearchString: string;
  public dependencySearchResult: Array < DependencySearchItem > = [];
  public isLoading = false;
  public categorySearchResult: Array < CategorySearchItem > = [];
  public categoryResult: Array<any> = [];
  public tagZero = 0;
  public errorSecurity: string;
  public errorCategories: string;
  public errorComponentSearch: string;

  public searchKey = '';
  public selected: string;
  public suggestions: Array < any > = [];
  public dependenciesData: Array < any > = [];
  public masterTags: Array < any > = [];
  public selectedTags = new Set();
  public categories: Array<any> = [];
  public cveTemporaryData: CveResponseModel;
  public cveName: any = [];
  public noOfTags = 0;
  public saveTagname: Array<any> = [];
  public type = false;
  public tags: Array < any > = [];
  public toast: boolean = false;

  public categoriesStore: Array<any> = [];

  private addDependencySubscription: Subscription = null;

  constructor(
    private service: DependencyEditorService,
    private errorMessageHandler: ErrorMessageHandler) {}

  ngOnInit() {
  }

  ngOnChanges() {
  }

  getDependencies() {
    if (!this.dependencySearchString) {
      return;
    }
    this.isLoading = true;
    if (this.addDependencySubscription) {
      this.addDependencySubscription.unsubscribe();
    }
    this.addDependencySubscription = this .service.getDependencies(this.dependencySearchString)
                                                  .subscribe((response: any) => {
                                                    this.dependencySearchResult = response['result'];
                                                    this.isLoading = false;
                                                  }, (error: any) => {
                                                    // Handle server errors here
                                                    this.errorComponentSearch = this.errorMessageHandler.getErrorMessage(error.status);
                                                    this.isLoading = false;
                                                    console.log('error component search - ', this.errorComponentSearch);
                                                });
  }

  getCategories() {
    this.isLoading = true;
    let runtime = '';
    if (this.boosterInfo.runtime.id === 'vert.x') {
      runtime = 'vertx';
    } else if (this.boosterInfo.runtime.id === 'spring-boot') {
      runtime = 'springboot';
    } else if (this.boosterInfo.runtime.id === 'wildfly-swarm') {
      runtime = 'wildflyswarm';
    }
    this.service.getCategories(runtime)
      .subscribe((response: any) => {
        this.categorySearchResult = response['categories'];
        this.isLoading = false;
        this.categoryResult = [];
        this.categoriesStore = [];
        this.categoriesStore.push({
          isOpened: true
        });
        for (const key in this.categorySearchResult) {
          if (this.categorySearchResult.hasOwnProperty(key)) {
            this.categoryResult.push(this.categorySearchResult[key]);
            this.categoriesStore.push({
              isOpened: false
            });
          }
        }
        const p = this.getCategoryPayload(this.categoryResult);
        this.getCategoriesSecurity(p);
        this.addedTags();
      }, (error: any) => {
        // Handle server errors here
        this.isLoading = false;
        this.errorCategories =  this.errorMessageHandler.getErrorMessage(error.status);
        console.log('error categories - ', this.errorCategories);
    });
  }

  resetCategoryStore(fromIndex: number): void {
    for (let i = fromIndex; i < this.categoriesStore.length; ++ i) {
      if (this.categoriesStore[i].isOpened) {
        this.categoriesStore[i].isOpened = false;
      }
    }
  }

  getCategoryPayload(categoryResult: any) {
    const payload: any = {};
    let j = 0;
    let category: any = [];
    categoryResult.forEach((i: any) => {
      i.packages.forEach((k: any) => {
        category.push({
          'package' : k.name,
          'version' : k.version
        });
      });
    });
    payload['_resolved'] = category;
    payload['ecosystem'] = DependencySnapshot.ECOSYSTEM;
    payload['request_id'] = DependencySnapshot.REQUEST_ID;
    return payload;
  }

  getCategoriesSecurity(payload: any) {
    this.service.getDependencyData('CVE', payload)
      .subscribe((response: CveResponseModel) => {
        this.cveTemporaryData = response;
        if (this.cveTemporaryData) {
          let count = -1;
          this.cveTemporaryData.result.forEach((item: any) => {
            count++;
            if (item.cve) {
              if (item.cve !== null) {
                this.cveName.push({
                  'detail' : item.cve.details, // cve:
                  'package': item.package
                });
              }
            }
          });
        }
      }, (error: any) => {
        // Handle server errors here
        this.errorSecurity = this.errorMessageHandler.getErrorMessage(error.status);
        console.log('error add security - ', this.errorSecurity);
    });
      this.masterTags.forEach( (i: any) => {
        for (let j = 0; j < this.cveName.length; j++)
        if (i.name === this.cveName['j'].package) {
          i.security = this.cveName['j'].detail;
        }
      });
  }

  changeTagname(master: any, t: boolean) {
    this.type = !t;
    for (let i = 0; i < this.masterTags.length; i++) {
      if (this.masterTags[i].name === master.name && this.masterTags[i].version === master.version && this.masterTags[i].category === master.category) {
        this.type = !t;
       if (this.masterTags[i].type === true && this.type === true) {
         continue;
       } else if (this.masterTags[i].type === true && this.type === false) {
         this.masterTags[i].type = false;
           this.noOfTags--;
           i++;
           break;
         } else if (this.masterTags[i].type === false) {
         if (this.type === true) {
           this.masterTags[i].type = true;
           this.noOfTags++;
           break;
         } else if (this.type === false) {
           this.masterTags[i].type = false;
           this.noOfTags--;
           break;
         }
       }
     }
    }
  }

  listenInputSearch() {
    if (this.dependencySearchString === '') {
      this.dependencySearchResult = [];
    }
  }

  addDependency() {
    this.dependencySearchResult = [];
    this.dependencySearchString = '';
    this.noOfTags = 0;
    this.saveTagname = [];
    let currentTag: any = null;
    for (let i = 0; i < this.masterTags.length; i++) {
      currentTag = this.masterTags[i];
      if (currentTag.type === true) {
        this.tags = [];
        this.tags.push({
          'ecosystem' : DependencySnapshot.ECOSYSTEM,
          'version' : currentTag.version,
          'name' : currentTag.name,
          'category': currentTag.category
        });
        this.saveTagname.push({
          'name': this.masterTags[i].name
        });
        this.toast = true;
        this.masterTags[i].grouped = true;
        this.masterTags[i].type = false;
        this.service.dependencySelected.emit(this.tags[0]);
      }
    }
  }

  addSearchDependency(depItem: DependencySearchItem) {
    this.dependencySearchResult = [];
    this.dependencySearchString = '';
    this.service.dependencySelected.emit(depItem);
  }

  ngOnDestroy() {
    this.dependencies = [];
    this.dependencySearchResult = [];
    this.categorySearchResult = [];
    this.categoryResult = [];
    this.dependencySearchString = '';
    this.isLoading = false;
  }

  removeDependency(dependency: any) {
    this.service.removeDependency(dependency);
  }

  public showPackageModal(event: Event) {
    this.toast = false;
    this.modalPackagePreview.open();
    this.getCategories();
  }

  public closemodal() {
    this.modalPackagePreview.close();
  }

  public showDependency() {
  }

  handleUserInputKeyPress(event: KeyboardEvent): void {
  }

  public handleCategoryClick(tag: string, index: number) {
    this.queryString = '';
    this.categoryString = tag + '$$' + true;
    this.resetCategoryStore(0);
    this.categoriesStore[index].isOpened = true;
  }

  public addedTags() {
    let count = 0;
    this.tagZero = 0;
    this.categoryResult.forEach((i: any) => {
      count += i.packages.length || 0;
      i.packages.forEach((x: any) => {
        this.masterTags.push({
          'ecosystem' : DependencySnapshot.ECOSYSTEM,
          'version' : x.version,
          'name' : x.name,
          'description': x.description,
          'category' : x.category,
          'type' : false,
          'grouped' : false,
          'security' : null,
          'present' : false
        });
      });
    });
    this.tagZero = count;
    this.categoryResult.forEach((i: any) => {
        i.packages.forEach((x: any) => {
            this.saveTagname.push({'name' : x, 'type' : false});
        });
    });
  for (let i = 0; i < this.masterTags.length; i++) {
    this.masterTags[i].present = false;
  }
  if (DependencySnapshot.DEP_FULL_ADDED.length === 0) {
    for (let i = 0; i < this.masterTags.length; i++) {
      this.masterTags[i].grouped = false;
    }
  } else {
    DependencySnapshot.DEP_FULL_ADDED.forEach((depAdded: any) => {
      for (let i = 0; i < this.masterTags.length; i++) {
        if (this.masterTags[i].name === depAdded.name && this.masterTags[i].version === depAdded.version && this.masterTags[i].category === depAdded.category) {
          this.masterTags[i].grouped = true;
          this.masterTags[i].present = true;
        } else {
          if (this.masterTags[i].present === true) {
            continue;
          } else {
            this.masterTags[i].grouped = false;
          }
        }
      }
    });
  }
  }
}
