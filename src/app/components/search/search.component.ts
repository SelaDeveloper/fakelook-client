import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { IFilter } from 'src/app/models/IFilter';
import { IPost } from 'src/app/models/IPost';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private postsService: PostService) {}

  @Output() searchEmitter = new EventEmitter<IPost[]>();

  @ViewChild('dialogAlarm') dialogAlarm!: ElementRef;

  errorAlarm = '';

  startDate = '';
  endDate = '';
  publishers = [];
  tags = [];
  taggedUsers = [];
  publishersString = '';
  tagsString = '';
  taggedUsersString = '';

  addFiltering() {
    if (this.ValidationValues()) {
      if (this.startDate == '') this.startDate = '2000-01-01';
      if (this.endDate == '') this.endDate = '2000-01-01';

      const filter: IFilter = {
        startDate: formatDate(new Date(this.startDate), 'yyyy-MM-dd', 'en-US'),
        endDate: formatDate(new Date(this.endDate), 'yyyy-MM-dd', 'en-US'),
        publishers: this.splitPublishers(this.publishersString),
        tags: this.splitTags(this.tagsString),
        taggedUsers: this.splitUserTaggedPost(this.taggedUsersString),
      };

      this.postsService.insertFilter(filter).subscribe((res) => {
        this.searchEmitter.emit(res);
      });
    }
    this.startDate = '';
    this.endDate = '';
    this.publishers = [];
    this.tags = [];
    this.taggedUsers = [];
    this.publishersString = '';
    this.tagsString = '';
    this.taggedUsersString = '';
  }

  ValidationValues(): boolean {
    if (
      (this.startDate == '' && this.endDate != '') ||
      (this.startDate != '' && this.endDate == '')
    ) {
      this.errorAlarm = 'Please, choose the dateFrom and dateTo!';
      this.openDialog();
      return false;
    } else if (this.publishersString != '') {
      if (this.hasWhiteSpace(this.publishersString)) {
        this.errorAlarm = 'Please, put Publishers without spaces!';
        this.openDialog();
        return false;
      }
    } else if (this.tagsString != '') {
      if (this.hasWhiteSpace(this.tagsString)) {
        this.errorAlarm = 'Please, put #Tags without spaces!';
        this.openDialog();
        return false;
      }
    } else if (this.taggedUsersString != '') {
      if (this.hasWhiteSpace(this.taggedUsersString)) {
        this.errorAlarm = 'Please, put "Tagged users" without spaces!';
        this.openDialog();
        return false;
      }
    }
    return true;
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

  splitPublishers(publishersString: string) {
    var splitted = publishersString.split(',');
    return splitted;
  }

  splitTags(tagsString: string) {
    var splitted = tagsString.split(',');
    return splitted;
  }

  splitUserTaggedPost(taggedUsersString: string) {
    let splitted = taggedUsersString.split(',');
    return splitted;
  }
}
