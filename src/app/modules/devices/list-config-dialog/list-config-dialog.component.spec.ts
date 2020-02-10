import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConfigDialogComponent } from './list-config-dialog.component';

describe('ListConfigDialogComponent', () => {
  let component: ListConfigDialogComponent;
  let fixture: ComponentFixture<ListConfigDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
