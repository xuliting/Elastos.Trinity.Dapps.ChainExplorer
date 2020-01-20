import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockInfoPage } from './block-info.page';

describe('BlockInfoPage', () => {
  let component: BlockInfoPage;
  let fixture: ComponentFixture<BlockInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
