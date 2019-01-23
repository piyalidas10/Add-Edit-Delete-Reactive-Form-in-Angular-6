# Add-Edit-Delete-Reactive-Form-in-Angular-6
Add Edit Delete Reactive Form in Angular 6

    ng new project
    ng g component home
    
app.module.ts

To use reactive forms, import ReactiveFormsModule from the @angular/forms package and add it to your NgModule's imports array.

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule, ReactiveFormsModule} from '@angular/forms';
    import { HttpClientModule } from '@angular/common/http';
    import { RouterModule, Routes } from '@angular/router';
    import { AppComponent } from './app.component';
    import { HomeComponent } from './home/home.component';

    const appRoutes: Routes = [
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'home' }
    ];

    @NgModule({
      declarations: [
        AppComponent,
        HomeComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }

app.component.html

    <app-home></app-home>

home.component.html

    <div class="container">

    <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12 userForm">
        <h3 class="text-center">User Registration</h3>
            <form [formGroup]="userForm" novalidate>
                <div class="col-xs-12">
                    <div class="form-group clearfix">
                        <label>Name</label>
                        <input type="text" class="form-control" formControlName="uname" name="uname" />
                        <div class="error" *ngIf="userForm.controls['uname'].errors">
                            <div *ngIf="userForm.controls['uname'].errors.minlength">Name must be at least 6 characters</div>
                            <div *ngIf="userForm.controls['uname'].errors.maxlength">Name must be at most 20 characters</div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group clearfix">
                        <label>Email</label>
                        <input type="text" class="form-control" formControlName="uemail" name="uemail" />
                        <div class="error" *ngIf="userForm.controls['uemail'].errors">
                                <div *ngIf="userForm.controls['uemail'].errors.minlength">Email must be at least 20 characters</div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group clearfix">
                        <label>Mobile No</label>
                        <input type="text" class="form-control" formControlName="umobile" name="umobile" />
                        <div class="error" *ngIf="userForm.controls['umobile'].errors">
                                <div *ngIf="userForm.controls['umobile'].errors.minlength">Mobile must be at least 10 characters</div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group">
                        <button *ngIf="save" [disabled]="userForm.invalid" class="btn btn-primary btn-block" (click)="saveUser(userid)">Save</button>
                        <button *ngIf="!save" type="submit" [disabled]="userForm.invalid" class="btn btn-primary btn-block" (click)="addUser()">Submit</button>
                    </div>
                </div>            
            </form>
            <div class="col-xs-12">
                <div class="form-group">
                </div>
            </div>        
    </div>        

    <table class="table table-bordered" *ngIf="!users.length == 0">
        <thead>
            <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Action</th>
            </tr>            
        </thead>
        <tbody>
            <tr *ngFor="let user of users">
                <td>{{user.uid}}</td>
                <td>{{user.uname}}</td>
                <td>{{user.uemail}}</td>
                <td>{{user.umobile}}</td>
                <td>
                    <button type="button" class="btn btn-success btn-sm" (click)="editUser(user.uid)">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm" (click)="deleteUser(user.uid)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>


    </div>

If users array object length is greater than 0 then table will be shown. "users.length" is used for checking this. Submit button will be shown by default. When click on edit button then save button will be activated. *ngIf="save" is used for checking that we are on adding scenario or saving scenario.

home.component.ts

    import { Component, OnInit } from '@angular/core';
    import { FormGroup, FormBuilder, Validators } from '@angular/forms';
    import { UsersService} from '../users.service';

    @Component({
      selector: 'app-home',
      templateUrl: './home.component.html',
      styleUrls: ['./home.component.css']
    })
    export class HomeComponent implements OnInit {

      userForm: FormGroup;
      idgen: any;
      users: any[] = [];
      uid: any;
      uname: string;
      uemail: string;
      umobile: number;
      save: any;
      userid: any;


      constructor(private formBuilder: FormBuilder, public usersService: UsersService) { }

      ngOnInit() {
        this.createForm();
        this.save = false;
        console.log(this.save);
      }

      createForm() {
        this.userForm = this.formBuilder.group({
            uid: [''],
            uname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
            uemail: ['', [Validators.required, Validators.maxLength(20)]],
            umobile: ['', [Validators.required, Validators.minLength(10)]]
        });
      }

      addUser() {
        const idgen = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
        this.uid =  idgen;
        this.uname = this.userForm.controls['uname'].value;
        this.uemail = this.userForm.controls['uemail'].value;
        this.umobile = this.userForm.controls['umobile'].value;

        if (this.userForm.invalid) {
          return false;
        } else {
          this.users.push({
            uid: this.uid,
            uname: this.uname,
            uemail: this.uemail,
            umobile: this.umobile
          });
          console.log(this.users);
          this.userForm.reset();
        }
      }

      deleteUser(id) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].uid === id) {
            console.log(this.users[i].uname);
            this.users.splice(i, 1);
          }
        }
      }

      editUser(id) {
        this.save = true;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].uid === id) {
            console.log(this.users[i].uid);
            this.userid = this.users[i].uid;
            this.userForm.patchValue({
              uid: this.users[i].uid,
              uname: this.users[i].uname,
              uemail: this.users[i].uemail,
              umobile: this.users[i].umobile
            });
          }
        }
      }

      saveUser(id) {
        this.save = false;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].uid === id) {
              console.log(this.users[i].uid);
              this.users[i].uid = this.userForm.controls['uid'].value;
              this.users[i].uname = this.userForm.controls['uname'].value;
              this.users[i].uemail = this.userForm.controls['uemail'].value;
              this.users[i].umobile = this.userForm.controls['umobile'].value;
          }
        }
        this.userForm.reset();
      }


    }

We can generate randon id using this function --->>> (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();

I have reset the form after submit button to clear the form field using this.userForm.reset() function. 

this.userForm.patchValue is used for fill the the form with existing value for editing and have passed the userid through save button. In saveUser  function we are updating the array object of index in where the uid is matching with passing id of saveUser(userid) function.
