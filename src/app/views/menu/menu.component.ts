import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {EnumsList} from '../../models/enums/enum-list';
import {ManagementService} from '../../services/management/management.service';
import {BaseMethodsService} from '../../services/base/base-methods.service';

import {AngularFireModule} from 'angularfire2';

import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {TanslationService} from '../../services/translation-service/tanslation.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor(public translationService: TanslationService,
              public baseMethod: BaseMethodsService,
              private ro: RouterOutlet,
              private activatedRoute: ActivatedRoute,
              public firestore: AngularFireDatabase) {

    const userId = this.baseMethod.getHandleStorageData('userId');
    firestore.list('/users/' + userId.toString().toLocaleLowerCase()).valueChanges().subscribe(notificationCount => {
      if (notificationCount[0] != null) {
        // @ts-ignore
        this.notificationCount = parseInt(notificationCount[0]);
        if (this.notificationCount > 0 && !this.fromOnInit) {
          this.playAudio();
        }
        this.fromOnInit = false;
      }
    });
  }

  @Output() changeLangugeEventEmitter: EventEmitter<null> = new EventEmitter();

  menuList = EnumsList.menuItems;
  userTitle = null;
  notificationCount = 0;
  fromOnInit = true;


  playAudio() {
    const audio = new Audio();
    audio.src = '../../../assets/mp3/notification.mp3';
    audio.load();
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
      })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
    }
  }

  ngOnInit() {
    this.translationService.getLanguageList();
    this.userTitle = this.baseMethod.getHandleStorageData('userTitle');
  }

  changeLanguage(languageId) {
    this.baseMethod.setHandleStorageData('languageId', languageId);
    this.baseMethod.changeLanguageOnPage();
    const params = {
      Language: languageId
    };
    this.translationService.updateUserLanguage(params);
  }

  onClickMenuButton() {
    if (document.getElementById('navbarNavDropdown').style.display == 'none' ||
      document.getElementById('navbarNavDropdown').style.display == '') {
      document.getElementById('navbarNavDropdown').style.display = 'block';
    } else {
      document.getElementById('navbarNavDropdown').style.display = 'none';
    }
  }

}
