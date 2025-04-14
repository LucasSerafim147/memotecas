import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tarefa8Component } from './tarefa8.component';

describe('Tarefa8Component', () => {
  let component: Tarefa8Component;
  let fixture: ComponentFixture<Tarefa8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tarefa8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tarefa8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
