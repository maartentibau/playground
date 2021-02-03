import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestScheduler } from 'rxjs/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailFormComponent } from './email-form.component';

@Component({
  template: `<playground-email-form canManage="canManage"></playground-email-form>`,
})
export class MockHostComponent {
  canManage: boolean;
}

describe('formComponent', () => {
  let hostComponent: MockHostComponent;
  let component: EmailFormComponent;
  let fixture: ComponentFixture<MockHostComponent>;
  let testScheduler: TestScheduler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [MockHostComponent, EmailFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(EmailFormComponent)).componentInstance;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toBe(expected);
    });
  });

  describe('disableButton$', () => {
    beforeEach(() => {
      hostComponent.canManage = true;
      fixture.detectChanges();
    });

    // this test should fail .. but it does not :(
    it('should emit false when a valid e-mail address is set', () => {
      testScheduler.run(({ expectObservable }) => {
        // prepare
        const expectedMarbles: string = 'a';
        const expectedValues: Record<string, boolean> = { a: true };

        // act
        component.emailForm.controls.email.setValue('valid@gmail.com');

        // check
        expectObservable(component.disableButton$).toBe(expectedMarbles, expectedValues);
      });
    });
  });
});
