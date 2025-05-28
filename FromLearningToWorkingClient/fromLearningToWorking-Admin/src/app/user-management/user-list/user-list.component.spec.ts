import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../shared/services/user.service';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);

    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
    const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    userService.getUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(component.users).toEqual(mockUsers);
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('should delete a user', () => {
    const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
    userService.getUsers.and.returnValue(of(mockUsers));
    component.ngOnInit();

    userService.deleteUser.and.returnValue(of(undefined));
    component.deleteUser(1);

    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(component.users.length).toBe(0);
  });

  it('should navigate to user detail on viewUser', () => {
    spyOn(component, 'viewUser');
    component.viewUser(1);
    expect(component.viewUser).toHaveBeenCalledWith(1);
  });
});