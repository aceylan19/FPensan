import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';


import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './views/login/login.component';
import {FormsModule} from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {MainComponent} from './views/main/main.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {MenuComponent} from './views/menu/menu.component';
import {NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SuccessModalComponent} from './views/modals/success-modal/success-modal.component';
import {MdlForgotPasswordComponent} from './views/modals/mdl-forgot-password/mdl-forgot-password.component';
import {MessageAccountListComponent} from './views/settings/message-account/message-account-list/message-account-list.component';
import {MessageAccountDetailComponent} from './views/settings/message-account/message-account-detail/message-account-detail.component';
import {MdlDeleteConfirmComponent} from './views/modals/mdl-delete-confirm/mdl-delete-confirm.component';
import {MessageTemplateComponent} from './views/settings/message-template/message-template-detail/message-template.component';
import {MessageTemplateListComponent} from './views/settings/message-template/message-template-list/message-template-list.component';
import {SystemParametersComponent} from './views/settings/system-parameters/system-parameters.component';
import {TextMaskModule} from 'angular2-text-mask';
import {EnumTranlationsComponent} from './views/settings/translations/enum-tranlations/enum-tranlations.component';
import {StaticTranlationsComponent} from './views/settings/translations/static-tranlations/static-tranlations.component';
import {LanguageListComponent} from './views/settings/translations/language-list/language-list.component';
import {LanguageDetailsComponent} from './views/settings/translations/language-details/language-details.component';
import {LaddaModule} from 'angular2-ladda';
import {UserListComponent} from './views/settings/user/user-list/user-list.component';
import {UserDetailComponent} from './views/settings/user/user-detail/user-detail.component';
import {CountryListComponent} from './views/settings/country/country-list/country-list.component';
import {CountryDetailComponent} from './views/settings/country/country-detail/country-detail.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {ResetPasswordComponent} from './views/reset-password/reset-password.component';
import {NgbDateFRParserFormatter} from './ngb-date-fr-parser-formatter';
import {ChangePasswordComponent} from './views/change-password/change-password.component';
import {AgmCoreModule} from '@agm/core';
import {DynamicTranslationsComponent} from './views/settings/translations/dynamic-translations/dynamic-translations.component';

import {ArraySortPipe} from './views/heplers/pipes/sort.pipe';
import {ArrayASortPipe} from './views/heplers/pipes/Asort.pipe';
import {GoogleChartsModule} from 'angular-google-charts';
import {NgSelectModule} from '@ng-select/ng-select';
import {AppGuard} from './app.guard';import {environment} from './models/consts/enviroment';
import {Consts} from './models/consts/consts';
import { ServiceListComponent } from './views/settings/api-structure/api-service/api-service-list/service-list.component';
import { ApiServiceDetailsComponent } from './views/settings/api-structure/api-service/api-service-details/api-service-details.component';
import { ApiEndPointListComponent } from './views/settings/api-structure/api-end-point/api-end-point-list/api-end-point-list.component';
import { ApiEndPointDetailsComponent } from './views/settings/api-structure/api-end-point/api-end-point-details/api-end-point-details.component';
import {ApiMessageListComponent} from './views/settings/api-structure/api-message/api-message-list/api-message-list.component';
import { ApiMessageDetailsComponent } from './views/settings/api-structure/api-message/api-message-details/api-message-details.component';
import { MdlNewMessageComponent } from './views/modals/mdl-new-message/mdl-new-message.component';
import { CityDetailComponent } from './views/settings/city/city-detail/city-detail.component';
import { CityListComponent } from './views/settings/city/city-list/city-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeLayoutComponent,
    MainComponent,
    LoginLayoutComponent,
    MenuComponent,
    MdlForgotPasswordComponent,
    MessageAccountListComponent,
    MessageAccountDetailComponent,
    MdlDeleteConfirmComponent,
    MessageTemplateComponent,
    MessageTemplateListComponent,
    SystemParametersComponent,
    EnumTranlationsComponent,
    StaticTranlationsComponent,
    LanguageListComponent,
    LanguageDetailsComponent,
    UserListComponent,
    UserDetailComponent,
    CountryListComponent,
    CountryDetailComponent,
    ResetPasswordComponent,
    SuccessModalComponent,
    ChangePasswordComponent,
    DynamicTranslationsComponent,
    ArraySortPipe,
    ArrayASortPipe,
    ServiceListComponent,
    ApiServiceDetailsComponent,
    ApiEndPointListComponent,
    ApiEndPointDetailsComponent,
    ApiMessageListComponent,
    ApiMessageDetailsComponent,
    MdlNewMessageComponent,
    CityDetailComponent,
    CityListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    DragDropModule,
    NgSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyASxz3UxRJKFkQt7F-Mj4x2Zbb_lct4Vic',
      libraries: ['places']
    }),
    // ngx-translate and the loader module
    HttpClientModule,
    TextMaskModule,
    LaddaModule,
    NgbDatepickerModule,
    GoogleChartsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgMultiSelectDropDownModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    AppGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
