import { TestBed } from '@angular/core/testing';
import { InvestimentoService } from './investimento.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('InvestimentoService', () => {
  let service: InvestimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestimentoService, provideHttpClientTesting()]
    });
    service = TestBed.inject(InvestimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Testar métodos públicos chamando HttpClient
});
