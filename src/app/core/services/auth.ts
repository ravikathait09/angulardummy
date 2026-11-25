
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'admin' | 'customer' | 'seller';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private demoUsers = [
    {
      id: 1,
      name: 'ShopKart Admin',
      email: 'admin@shopkart.com',
      password: 'Admin@123',
      role: 'admin' as UserRole
    },
    {
      id: 2,
      name: 'ShopKart Customer',
      email: 'customer@shopkart.com',
      password: 'Customer@123',
      role: 'customer' as UserRole
    },
    {
      id: 3,
      name: 'ShopKart Seller',
      email: 'seller@shopkart.com',
      password: 'Seller@123',
      role: 'seller' as UserRole
    }
  ];

 private currentUserSubject =
  new BehaviorSubject<User | null>(null);

currentUser$ = this.currentUserSubject.asObservable();

  login(
  email: string,
  password: string,
  role: UserRole
): User | null {

  const user = this.demoUsers.find(
    u =>
      u.email === email &&
      u.password === password &&
      u.role === role
  );

  if (!user) {
    return null;
  }

  const { password: _, ...safeUser } = user;


  // Dummy token for Angular learning only
  const dummyToken = `dummy-token-${user.role}-${user.id}`;

  sessionStorage.setItem('access_token', dummyToken);
  sessionStorage.setItem(
    'shopkart_user',
    JSON.stringify(safeUser)
  );

  return safeUser;
}

  getCurrentUser(): User | null {

  const currentUser = this.currentUserSubject.value;

  if (currentUser) {
    return currentUser;
  }

  const storedUser = sessionStorage.getItem('shopkart_user');

  if (!storedUser) {
    return null;
  }

  const user = JSON.parse(storedUser) as User;

  this.currentUserSubject.next(user);

  return user;
}

logout(): void {

  this.currentUserSubject.next(null);

  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('shopkart_user');

}
}
