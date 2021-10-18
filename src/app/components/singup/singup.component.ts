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
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  singupForm: FormGroup;
  submitted = false;
  loading = false;
  hide = true;
  error = false;
  mensaje: string;
  data$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public translate: TranslateService,
    private store: Store<AppState>,
    private authService: AuthService) {
    this.data$ = this.store.select('message');
  }

  ngOnInit() {
    this.singupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
      ])),
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  get f() { return this.singupForm.controls; }


  singup() {

    if (this.singupForm.invalid) {
      return;
    }

    this.store.dispatch({
      type: fromAction.TRY_SINGUP, data:
        { name: this.f.name.value, user: this.f.email.value, pass: this.f.password.value }
    });
    this.authService.singup(this.f.name.value, this.f.email.value, this.f.password.value).subscribe(res => {
      if (res.id) {
        this.singupForm.reset();
        this.store.dispatch(new fromAction.SINGUPOK(fromAction.SINGUP_OK,res));
        localStorage.setItem('id', res.id);
        Swal.fire(this.translate.instant('MESSAGES.SERV_SINGUP_OK'));
      }

    }, err => {
      this.store.dispatch({ type: fromAction.SINGUP_FAIL, data: {} });
      Swal.fire(this.translate.instant('MESSAGES.SERV_LOGIN_FAIL'));
    });


  }
}
