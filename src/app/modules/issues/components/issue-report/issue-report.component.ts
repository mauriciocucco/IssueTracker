import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Issue } from 'src/app/core/models/interfaces/issue';
import { IssuesService } from 'src/app/core/services/issues.service';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.scss'],
})
export class IssueReportComponent implements OnInit, OnDestroy {
  public issueForm: FormGroup = this.builder.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['', Validators.required],
    type: ['', Validators.required],
  });
  public suggestions: Issue[] = [];
  private destroy = new Subject<boolean>();

  constructor(
    private builder: FormBuilder,
    private issueService: IssuesService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.titleWatch();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  private titleWatch(): void {
    this.issueForm
      .get('title')
      ?.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy)
      )
      .subscribe((title: string) => {
        if (title) {
          this.suggestions = this.issueService.getSuggestions(
            title.toLowerCase().trim()
          );
        }
      });
  }

  public addIssue(): void {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }

    this.issueService.createIssue(this.issueForm?.value);
    this.goBack();
  }

  public goBack(): void {
    this.locationService.back();
  }
}
