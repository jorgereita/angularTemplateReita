import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AppState } from './app.reducer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'MO-Test';
  data$: Observable<any>;
  constructor(
    public translate: TranslateService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.initializeApp();
    this.data$ = this.store.select('message');
    this.translate.addLangs(['es']);
    this.translate.use('es');
  }
  initializeApp() {
   this.store.dispatch({type:'CREATEDAPP'});
  }

}
