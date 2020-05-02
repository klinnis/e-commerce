import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private router: Router){}
  
  canActivate(): boolean {
    const logStatus = localStorage.getItem('logged');
    if (logStatus === null) {
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
  
}
