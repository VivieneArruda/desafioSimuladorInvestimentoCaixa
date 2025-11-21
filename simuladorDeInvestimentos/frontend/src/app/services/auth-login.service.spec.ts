import { TestBed } from '@angular/core/testing';
import { AuthLoginService } from './auth-login.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthLoginService', () => {
  let service: AuthLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLoginService, provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
