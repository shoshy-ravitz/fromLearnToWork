import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditComponent } from './user-edit.component';
import { UserService } from '../../shared/services/user.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById', 'updateUser']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

    await TestBed.configureTestingModule({
      declarations: [ UserEditComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
    .compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on init', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password', role: 'Admin' };
    activatedRoute.snapshot.params = { id: 1 };
    userService.getUserById.and.returnValue(of(mockUser));

    component.ngOnInit();

    expect(userService.getUserById).toHaveBeenCalledWith(1);
    expect(component.user).toEqual(mockUser);
  });

  it('should update user details', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password', role: 'Admin' };
    component.user = mockUser;
    userService.updateUser.and.returnValue(of(mockUser));

    component.updateUser();

    expect(userService.updateUser).toHaveBeenCalledWith(mockUser);
  });
});