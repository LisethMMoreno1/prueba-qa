import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería permitir login con credenciales correctas', () => {
    const result = service.login('jdoe@example.com', 'abc123');
    expect(result).toBe(true);
    expect(service.getCurrentUser()).toEqual({
      name: 'Jonie doe',
      username: 'jdoe',
      email: 'jdoe@example.com',
      password: 'abc123'
    });
  });

  it('no debería permitir login con email incorrecto', () => {
    const result = service.login('prueba@example.com', 'abc123');
    expect(result).toBe(false);
    expect(service.getCurrentUser()).toBeNull();
  });

  it('no debería permitir login con contraseña incorrecta', () => {
    const result = service.login('jdoe@example.com', 'incorrecta');
    expect(result).toBe(false);
    expect(service.getCurrentUser()).toBeNull();
  });

  it('debería retornar null después del logout', () => {
    service.login('jdoe@example.com', 'abc123');
    service.logout();
    expect(service.getCurrentUser()).toBeNull();
  });
});
