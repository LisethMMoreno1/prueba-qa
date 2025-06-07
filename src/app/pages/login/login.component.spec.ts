import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      login: jasmine.createSpy('login'),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginComponent
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el formulario inválido cuando está vacío', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('debería validar correctamente el formulario con valores válidos', () => {
    component.loginForm.setValue({
      email: 'usuario@prueba.com',
      password: 'abc123',
    });
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('no debería enviar el formulario si es inválido', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('debería llamar a login y navegar al perfil si las credenciales son correctas', () => {
    component.loginForm.setValue({
      email: 'usuario@prueba.com',
      password: 'abc123',
    });
    fixture.detectChanges();
    mockAuthService.login.and.returnValue(true);

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('usuario@prueba.com', 'abc123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile']);
    expect(component.loginError).toBeFalsy();
  });

  it('debería mostrar error si las credenciales son incorrectas', () => {
    component.loginForm.setValue({
      email: 'usuario@prueba.com',
      password: 'incorrecta',
    });
    fixture.detectChanges();
    mockAuthService.login.and.returnValue(false);

    component.onSubmit();

    expect(component.loginError).toBeTruthy();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
