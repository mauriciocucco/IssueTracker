import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Issue } from 'src/app/core/models/interfaces/issue';
import { IssuesService } from 'src/app/core/services/issues.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
})
export class IssueListComponent implements OnInit {
  @Output() selected = new EventEmitter<Issue>();
  public issues$: Observable<Issue[]> = of([]);
  public messageMapping: { [k: string]: string } = {
    '=0': 'No issues.',
    '=1': 'One issue.',
    other: '# issues.',
  };

  constructor(private issueService: IssuesService) {}

  ngOnInit(): void {
    this.getIssues();
  }

  private getIssues(): void {
    this.issues$ = this.issueService.getPendingIssues();
  }

  public selectIssue(issue: Issue): void {
    this.selected.emit(issue);
  }
}
