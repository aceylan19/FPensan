import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorManagementService {

  constructor() {
  }

  public static onShowErrorMessage(error) {
    if (error.error.Status.StatusLevel == 20 || error.error.Status.StatusLevel == 21) {
      // @ts-ignore
      window.location = '/login';
    } else {
      let errorText = null;
      if (error.error.Status.StatusText == null) {
        errorText = error.statusText;
      } else {
        errorText = error.error.Status.StatusText;
      }
      alert(errorText);
      if (error.error.Status.StatusLevel == 22) {
      //  window.history.back();
      }
    }
  }
}
