import { TestBed, inject, fakeAsync, flush } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const testMockConfig = {
  registerUser: {
    positive: {
      firstName: 'testfirst',
      lastName: 'testlast',
      userId: 'testuser',
      password: 'testpass'
    }
  },
  loginUser: {
    positive: {
      userId: 'testuser',
      password: 'testpass'
    }
  }
};

describe('AuthenticationService', () => {
  let authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, HttpClientTestingModule
      ],
      providers: [
        AuthenticationService
      ]
    });
    authService = TestBed.get(AuthenticationService);
  });

  it('should create the authentication service',
    inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service).toBeTruthy();
    })
  );

  it(`should register user data`, fakeAsync(() => {
    let data = testMockConfig.registerUser.positive;
    inject([AuthenticationService, HttpTestingController], (backend: HttpTestingController) => {
      const mockReq = backend.expectOne(authService.authBackendUri);
      expect(mockReq.request.url).toEqual(authService.authBackendUri, 'requested url should match with Backend uri');
      expect(mockReq.request.method).toEqual('POST', 'should handle requested method type');
      mockReq.flush(data);
      backend.verify();
    });

    authService.registerUser(data).subscribe((res:any) => {
      expect(res).toBeDefined();
      expect(res._body).toBe(data, 'data should be same');
    });
  }));

  it(`should login user`, fakeAsync(() => {
    let data = testMockConfig.loginUser.positive;
    inject([AuthenticationService, HttpTestingController], (backend: HttpTestingController) => {
      const mockReq = backend.expectOne(authService.authBackendUri);
      expect(mockReq.request.url).toEqual(authService.authBackendUri, 'requested url should match with Backend uri');
      expect(mockReq.request.method).toEqual('POST', 'should handle requested method type');
      mockReq.flush(data);
      backend.verify();
    });

    authService.registerUser(data).subscribe((res:any) => {
      expect(res).toBeDefined();
      expect(res._body).toBe(data, 'data should be same');
    });
  }));

});
