import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() state: string;

  data$: Observable<any>;
  constructor(
    private router: Router,
    public translate: TranslateService,
    private store: Store<AppState>,
  ) {
    this.data$ = this.store.select('message');
   }

  ngOnInit() {

  }

  goNavigate(){
    const url = this.state.toLowerCase( );
    this.store.dispatch({type:'[NAV GO '+url+']'});
    if(url!=='logout'){
      this.router.navigate(['/'+url]);
      return;
    }
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }
}
