import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {MainComponent} from './views/main/main.component';
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {MessageAccountListComponent} from './views/settings/message-account/message-account-list/message-account-list.component';
import {MessageAccountDetailComponent} from './views/settings/message-account/message-account-detail/message-account-detail.component';
import {MessageTemplateListComponent} from './views/settings/message-template/message-template-list/message-template-list.component';
import {MessageTemplateComponent} from './views/settings/message-template/message-template-detail/message-template.component';
import {SystemParametersComponent} from './views/settings/system-parameters/system-parameters.component';
import {EnumTranlationsComponent} from './views/settings/translations/enum-tranlations/enum-tranlations.component';
import {StaticTranlationsComponent} from './views/settings/translations/static-tranlations/static-tranlations.component';
import {LanguageListComponent} from './views/settings/translations/language-list/language-list.component';
import {LanguageDetailsComponent} from './views/settings/translations/language-details/language-details.component';
import {UserListComponent} from './views/settings/user/user-list/user-list.component';
import {UserDetailComponent} from './views/settings/user/user-detail/user-detail.component';
import {ResetPasswordComponent} from './views/reset-password/reset-password.component';
import {ChangePasswordComponent} from './views/change-password/change-password.component';
import {DynamicTranslationsComponent} from './views/settings/translations/dynamic-translations/dynamic-translations.component';
import {CountryListComponent} from './views/settings/country/country-list/country-list.component';
import {CountryDetailComponent} from './views/settings/country/country-detail/country-detail.component';
import {AppGuard} from './app.guard';
import {ServiceListComponent} from './views/settings/api-structure/api-service/api-service-list/service-list.component';
import {ApiServiceDetailsComponent} from './views/settings/api-structure/api-service/api-service-details/api-service-details.component';
import {ApiEndPointListComponent} from './views/settings/api-structure/api-end-point/api-end-point-list/api-end-point-list.component';
import {ApiEndPointDetailsComponent} from './views/settings/api-structure/api-end-point/api-end-point-details/api-end-point-details.component';
import {ApiMessageListComponent} from './views/settings/api-structure/api-message/api-message-list/api-message-list.component';
import {ApiMessageDetailsComponent} from './views/settings/api-structure/api-message/api-message-details/api-message-details.component';
import {CityListComponent} from './views/settings/city/city-list/city-list.component';
import {CityDetailComponent} from './views/settings/city/city-detail/city-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
      },
      {
        path: 'reset-password/:token/:email',
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: 'main',
    component: HomeLayoutComponent,
    canActivate: [AppGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'well-come',
        component: MainComponent
      },
      {
        path: 'message-account-list',
        component: MessageAccountListComponent
      },
      {
        path: 'message-account',
        component: MessageAccountDetailComponent
      },
      {
        path: 'message-account/:dbMessageAccountId',
        component: MessageAccountDetailComponent
      },
      {
        path: 'message-template-list',
        component: MessageTemplateListComponent
      },
      {
        path: 'message-template',
        component: MessageTemplateComponent
      },
      {
        path: 'message-template/:dbMessageTemplateId',
        component: MessageTemplateComponent
      },
      {
        path: 'sys-parameters',
        component: SystemParametersComponent
      },
      {
        path: 'enum-translation',
        component: EnumTranlationsComponent
      },
      {
        path: 'static-translation',
        component: StaticTranlationsComponent
      },
      {
        path: 'dynamic-translation',
        component: DynamicTranslationsComponent
      },
      {
        path: 'language-list',
        component: LanguageListComponent
      },
      {
        path: 'language',
        component: LanguageDetailsComponent
      },
      {
        path: 'language/:languageId',
        component: LanguageDetailsComponent
      },
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: 'user',
        component: UserDetailComponent
      },
      {
        path: 'user/:userId',
        component: UserDetailComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'country-list',
        component: CountryListComponent
      },
      {
        path: 'country',
        component: CountryDetailComponent
      },
      {
        path: 'country/:countryId',
        component: CountryDetailComponent
      },
      {
        path: 'api-service-list',
        component: ServiceListComponent
      },
      {
        path: 'api-service-details',
        component: ApiServiceDetailsComponent
      },
      {
        path: 'api-service-details/:apiServiceId',
        component: ApiServiceDetailsComponent
      },
      {
        path: 'api-endpoint-list',
        component: ApiEndPointListComponent
      },
      {
        path: 'api-endpoint-details',
        component: ApiEndPointDetailsComponent
      },
      {
        path: 'api-endpoint-details/:apiEndpointId',
        component: ApiEndPointDetailsComponent
      },
      {
        path: 'api-message-list',
        component: ApiMessageListComponent
      },
      {
        path: 'api-message-details',
        component: ApiMessageDetailsComponent
      },
      {
        path: 'api-message-details/:apiMessageId',
        component: ApiMessageDetailsComponent
      },
      {
        path: 'city',
        component: CityListComponent
      },
      {
        path: 'city-detail',
        component: CityDetailComponent
      }
    ],
  },
  {path: '**', redirectTo: 'login'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
