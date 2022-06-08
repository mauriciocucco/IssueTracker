import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { IndexComponent } from './pages/index/index.component';
import { SharedModule } from '../../shared/shared.module';
import { IssueReportComponent } from './components/issue-report/issue-report.component';
import { ReportComponent } from './pages/report/report.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [IssueListComponent, IndexComponent, IssueReportComponent, ReportComponent, ConfirmDialogComponent],
  imports: [CommonModule, IssuesRoutingModule, SharedModule],
})
export class IssuesModule {}
