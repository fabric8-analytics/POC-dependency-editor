import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.less'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  githubUrl = 'https://github.com/openshiftio-vertx-boosters/vertx-health-checks-booster-redhat';
  boosterInfo = {
    "mission": {
      "id": "configmap"
    },
    "runtime": {
      "id": "vert.x",
      "name": "Eclipse Vert.x",
      "version": "redhat"
    }
  };
  githubRef = 'v12';
}
