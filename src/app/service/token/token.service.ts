import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenkey: string = "token";
  collabRoleKey: string = "";

  public setCollabRole(role: string){
    localStorage.setItem(this.collabRoleKey, role);
  }

  public getCollabRole():string{
    return localStorage.getItem(this.collabRoleKey)!;
  }

  public savetoken(token: string) {
    localStorage.setItem(this.tokenkey, token);

  }
  public gettoken(): String{
    return localStorage.getItem(this.tokenkey)!;
  }
  public deletetoken() {
    localStorage.removeItem(this.tokenkey);
  }
  constructor() { }
}
