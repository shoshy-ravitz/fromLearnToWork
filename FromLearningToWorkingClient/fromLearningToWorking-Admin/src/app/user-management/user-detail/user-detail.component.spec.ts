import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../../shared/services/user.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserById']);
    activatedRoute = { snapshot: { paramMap: { get: () => '1' } } } as any;

    await TestBed.configureTestingModule({
      declarations: [ UserDetailComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on init', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    userService.getUserById.and.returnValue(of(mockUser));

    component.ngOnInit();

    expect(userService.getUserById).toHaveBeenCalledWith(1);
    expect(component.user).toEqual(mockUser);
  });

  it('should handle error when fetching user details', () => {
    userService.getUserById.and.returnValue(of(null));

    component.ngOnInit();

    expect(component.user).toBeNull();
  });
});