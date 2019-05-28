import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  constructor(private httpClient: HttpClient) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.addUser(this.userForm.value).subscribe(_ => {});
    } else {
      console.log('Fail.');
    }
  }

  

  addUser(user: User): Observable<User> {
    console.log(user);
    return this.httpClient
      .post<User>('/create', user, {}).pipe(
        tap(_ => console.log('added user')),
        catchError(this.handleError('add User', new User()))
      );
  }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}

class User {
  email: string;
  name: string;
  phone: string;
}
