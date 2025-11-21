import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardsComponent } from './dashboards.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DashboardsComponent', () => {
  let component: DashboardsComponent;
  let fixture: ComponentFixture<DashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsComponent],
      providers: [provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardsComponent);
    component = fixture.componentInstance;
    component.perfil = 'Moderado';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have perfil defined', () => {
    expect(component.perfil).toBeDefined();
    expect(component.perfil).toBe('Moderado');
  });
});
