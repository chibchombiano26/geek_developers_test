import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: '[error]',
  host: {
    class: 'error-page app'
  },
  template: require('./error.html')
})
export class ErrorPage {
router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  searchResult(): void {
    this.router.navigate(['/app', 'dashboard']);
  }

}
