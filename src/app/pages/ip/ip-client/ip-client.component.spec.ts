import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpClientComponent } from './ip-client.component';

describe('IpClientComponent', () => {
  let component: IpClientComponent;
  let fixture: ComponentFixture<IpClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
