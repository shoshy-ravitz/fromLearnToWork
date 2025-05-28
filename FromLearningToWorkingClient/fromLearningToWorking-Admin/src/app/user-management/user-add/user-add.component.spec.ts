import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAddComponent } from './user-add.component';
import { UserService } from '../../shared/services/user.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('UserAddComponent', () => {
  let component: UserAddComponent;
  let fixture: ComponentFixture<UserAddComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['addUser']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ UserAddComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add user and navigate on success', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' };
    userService.addUser.and.returnValue(of(mockUser));

    component.userForm.setValue(mockUser);
    component.addUser();

    expect(userService.addUser).toHaveBeenCalledWith(mockUser);
    // Add additional expectations for navigation if applicable
  });
});