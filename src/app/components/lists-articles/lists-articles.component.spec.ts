import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsArticlesComponent } from './lists-articles.component';

describe('ListsArticlesComponent', () => {
  let component: ListsArticlesComponent;
  let fixture: ComponentFixture<ListsArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
