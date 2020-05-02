import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
 
 constructor(private router: Router){}

 canActivate(): boolean {
    const role = localStorage.getItem('role');
    console.log(role);
    if (role === 'user') {
      this.router.navigateByUrl('error');
      return false;
    }
    return true;
  }
  
}
