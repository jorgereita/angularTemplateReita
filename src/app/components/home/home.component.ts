import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { INewLink } from '../interfaces/newlink.interface';
import { IProfile } from '../interfaces/profile.interface';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as fromAction from '../../app.actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  linkForm: FormGroup;
  linksList: Array<INewLink>;
  profile: IProfile;
  data$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private dataService: DataService,
    private store: Store<AppState>,
  ) { this.data$ = this.store.select('message'); }

  ngOnInit(): void {
    this.linkForm = this.formBuilder.group({
      url2save: new FormControl('', Validators.compose([
        Validators.required,
        // eslint-disable-next-line max-len
        Validators.pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)
      ])),
      nameofurl: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.getLinks();
    this.getProfile();
  }
  getProfile() {
    this.store.dispatch({ type: fromAction.HOME_TRY_PROFILE, data: {} });
    this.dataService.getUser(localStorage.getItem('id') ? localStorage.getItem('id') : 1).subscribe(data => {
      if (data) {
        this.store.dispatch( new fromAction.HOMEGETPROFILE(fromAction.HOME_TRY_PROFILE,data));
        this.profile = data;
      } else {
        Swal.fire(this.translate.instant('MESSAGES.SERV_LOGIN_FAIL'));
      }
    });
  }
  getLinks() {
    this.store.dispatch({ type: fromAction.HOME_TRY_LINKS, data: {} });

    this.dataService.getAllLinks().subscribe(data => {
      this.store.dispatch( new fromAction.HOMEGETLINKS(fromAction.HOME_GET_LINKS,data));
      if (data) {
        let jsonDta = (data.replace('name', ''));
        jsonDta = jsonDta.replaceAll(/\s/g, '');
        jsonDta = jsonDta.replace(/,([^,]*)$/, '$1');
        this.linksList = JSON.parse(jsonDta);
      } else {
        Swal.fire(this.translate.instant('MESSAGES.SERV_LIST_FAIL'));
      }
    });
  }
  addLink() {
    const dts = {
      url: this.linkForm.value.url2save,
      name: this.linkForm.value.nameofurl
    };
    this.dataService.createLink(dts).subscribe(data => {
      this.linkForm.reset();
      // this.store.dispatch({ type: '[HOME GET ADDLINK]', data });
      this.store.dispatch( new fromAction.HOMEGETADDLINK(fromAction.HOME_GET_ADDLINK,data));
      Swal.fire(this.translate.instant('MESSAGES.SERV_ADD_OK'));
    });
  }
  deleteLink(item) {
    this.store.dispatch({ type: fromAction.HOME_TRY_DELETE, data: {} });
    this.dataService.deleteLink(item.id).subscribe(data => {
      this.store.dispatch({ type: fromAction.HOME_TRY_DELETE, data: {} });
      Swal.fire(this.translate.instant('MESSAGES.SERV_DELETE_OK'));
    });
  }
}
