import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from 'src/app/core/models/interfaces/issue';
import { IssuesService } from '../../../../core/services/issues.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public selectedIssue: Issue | null = null;

  constructor(private router: Router, private issuesService: IssuesService) {}

  ngOnInit(): void {}

  public goToIssueForm(): void {
    this.router.navigateByUrl('/issues/report-new');
  }

  public completeIssue(confirmed: boolean): void {
    if (confirmed && this.selectedIssue)
      this.issuesService.completeIssue(this.selectedIssue);

    this.selectedIssue = null;
  }
}
