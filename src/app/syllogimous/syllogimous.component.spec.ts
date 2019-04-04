import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllogimousComponent } from './syllogimous.component';

describe('SyllogimousComponent', () => {
  let component: SyllogimousComponent;
  let fixture: ComponentFixture<SyllogimousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyllogimousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllogimousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
