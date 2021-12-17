import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentPaginatorComponent } from './home-content-paginator.component';

describe('HomeContentPaginatorComponent', () => {
  let component: HomeContentPaginatorComponent;
  let fixture: ComponentFixture<HomeContentPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeContentPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
