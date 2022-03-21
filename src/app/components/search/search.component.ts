import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { IPost } from 'src/app/models/IPost';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor() {}

  @Output('onAddPost') postEmitter = new EventEmitter<IPost>();

  @ViewChild('dialogAlarm') dialogAlarm!: ElementRef;

  errorAlarm = '';

  dateFrom = Date;
  dateTo = Date;
  publishers = '';
  hashTags = '';
  taggedUsers = '';

  addFiltering() {
    if (this.ValidationValues()) {
      this.dateFrom = Date;
      this.dateTo = Date;
      this.publishers = '';
      this.hashTags = '';
      this.taggedUsers = '';
    }
  }

  ValidationValues(): boolean {
    console.log(this.dateFrom);
    if (
      this.dateFrom == Date &&
      this.dateTo == Date &&
      this.publishers == '' &&
      this.hashTags == '' &&
      this.taggedUsers == ''
    ) {
      this.errorAlarm = 'Please, put something!';
      this.openDialog();
      return false;
    } else if (
      (this.dateFrom == Date && this.dateTo != Date) ||
      (this.dateFrom != Date && this.dateTo == Date)
    ) {
      this.errorAlarm = 'Please, choose the dateFrom and dateTo!';
      this.openDialog();
      return false;
    } else if (this.publishers != '') {
      if (this.hasWhiteSpace(this.publishers))
        this.errorAlarm = 'Please, put Publishers without spaces!';
      this.openDialog();
      return false;
    } else if (this.hashTags != '') {
      if (this.hasWhiteSpace(this.hashTags))
        this.errorAlarm = 'Please, put #Tags without spaces!';
      this.openDialog();
      return false;
    } else if (this.taggedUsers != '') {
      if (this.hasWhiteSpace(this.taggedUsers))
        this.errorAlarm = 'Please, put "Tagged users" without spaces!';
      this.openDialog();
      return false;
    } else return true;
  }

  openDialog() {
    this.dialogAlarm.nativeElement.classList.add('backdrop');
    this.dialogAlarm.nativeElement.classList.remove('ref');
  }

  closeDialog() {
    this.dialogAlarm.nativeElement.classList.remove('backdrop');
    this.dialogAlarm.nativeElement.classList.add('ref');
  }

  hasWhiteSpace(s: string) {
    return s.indexOf(' ') >= 0;
  }
}
