import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as fromAction from '../../app.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data$: Observable<any>;
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  hide = true;
  error = false;
  mensaje: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public translate: TranslateService,
    private store: Store<AppState>,
    private authService: AuthService) {

    this.data$ = this.store.select('message');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
      ])),
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  get f() { return this.loginForm.controls; }


  login() {

    if (this.loginForm.invalid) {
      return;
    }
    // this.store.dispatch({type:'[TRY LOGIN]', data:{user:this.f.email.value, pass :this.f.password.value}});
    this.store.dispatch({type:fromAction.TRY_LOGIN,data:{user:this.f.email.value, pass :this.f.password.value}});
    this.authService.authenticate(this.f.email.value, this.f.password.value).subscribe(res => {
      if (res.token) {
        this.loginForm.reset();
        localStorage.setItem('token', res.token);
        this.store.dispatch(new fromAction.LOGINOK(fromAction.LOGIN_OK,res));
        this.router.navigate(['/home']);
      }
    }, err => {
      Swal.fire(this.translate.instant('MESSAGES.SERV_LOGIN_FAIL'));
      this.store.dispatch({type:fromAction.LOGIN_FAIL, data:err});
    });

  }

}
