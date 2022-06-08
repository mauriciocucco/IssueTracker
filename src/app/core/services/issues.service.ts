import { Injectable } from '@angular/core';
import { Issue } from '../models/interfaces/issue';
import { issues } from 'src/assets/mocks/issues';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private mockIssues: BehaviorSubject<Issue[]> = new BehaviorSubject(issues);
  public issues$ = this.mockIssues.asObservable();

  constructor() {}

  get getIssues(): Issue[] {
    return [...this.mockIssues.value];
  }

  public getPendingIssues(): Observable<Issue[]> {
    return this.issues$.pipe(
      map((issues) => issues.filter((issue) => !issue.completed))
    );
  }

  public createIssue(issue: Issue) {
    issue.issueNo = this.getIssues.length + 1;
    this.mockIssues.next([...this.getIssues, issue]);
  }

  private replaceCompletedIssue(index: number, selectedIssue: Issue): Issue[] {
    const issues = this.getIssues;
    issues[index] = selectedIssue;

    return issues;
  }

  public completeIssue(issue: Issue) {
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date(),
    };
    const index = this.getIssues.findIndex((i) => i === issue);

    this.mockIssues.next(this.replaceCompletedIssue(index, selectedIssue));
  }

  public getSuggestions(title: string): Issue[] {
    if (title.length > 2) {
      return this.getIssues.filter(
        (issue) => issue.title.toLowerCase().trim().indexOf(title) !== -1
      );
    }

    return [];
  }
}
