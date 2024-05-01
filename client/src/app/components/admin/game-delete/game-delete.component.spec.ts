import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDeleteComponent } from './game-delete.component';

describe('GameDeleteComponent', () => {
  let component: GameDeleteComponent;
  let fixture: ComponentFixture<GameDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
