import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RanksPage } from './ranks.page';

describe('RanksPage', () => {
  let component: RanksPage;
  let fixture: ComponentFixture<RanksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RanksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RanksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
