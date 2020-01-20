import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransInfoPage } from './trans-info.page';

describe('TransInfoPage', () => {
  let component: TransInfoPage;
  let fixture: ComponentFixture<TransInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
