import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'playground-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent {
  @Input() readonly canManage: boolean;

  readonly emailForm: FormGroup;
  readonly disableButton$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.email]],
    });

    this.disableButton$ = combineLatest([
      this.emailForm.controls.email.valueChanges,
      this.emailForm.controls.email.statusChanges,
    ]).pipe(
      map(([value, status]: [string, string]) => !value || status === 'INVALID'),
      tap(console.log)
    );
  }
}
