import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankInfoPage } from './rank-info.page';

describe('RankInfoPage', () => {
  let component: RankInfoPage;
  let fixture: ComponentFixture<RankInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
