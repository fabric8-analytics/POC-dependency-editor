import {  Component,  OnInit,  OnChanges,  Input,  Output,  EventEmitter,  ViewEncapsulation, ViewChild } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';

@Component({
  selector: 'dependency-editor',
  templateUrl: './dependencyeditor.component.html',
  styleUrls: ['./dependencyeditor.component.less']
})

export class DependencyEditorComponent implements OnInit {
  
  @ViewChild('dependencyPreview') modalDependencyPreview : any; 

  public component: string[];
  public pdep: string[] = [];

  constructor() { }

  ngOnInit() {
    this.component = ['Hystrix', 'Hystrix01', 'Comp with big name 01', 'Comp with big name 02'];
    // console.log("project dep"+ this.projectDependencies);
  }

  public showDependencyModal(event: Event) {
    this.modalDependencyPreview.open();
    this.giveDependencies;
  }

  public giveDependencies(projectDependencies: string[]){
  //   projectDependencies.forEach(i =>{ 
  //     this.projectDep.push([
  //       projectDependencies[i],
  //   ]);
  // });
  debugger;
  console.log("project dependencies", projectDependencies,this.pdep);

  projectDependencies.forEach(element => {
    console.log("element",element);    
    this.pdep.push(element);
  });
  
  console.log("project dep", this.pdep);
}

}
