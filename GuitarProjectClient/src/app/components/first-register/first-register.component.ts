import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import MessageInterface from 'src/app/interfaces/message.interface';
import RegisterInterface from 'src/app/interfaces/register.interface';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-first-register',
  templateUrl: './first-register.component.html',
  styleUrls: ['./first-register.component.css'],
})
export class FirstRegisterComponent implements OnInit {
  constructor(
    public register: RegisterService,
    private r: Router,
    public data: DataService
  ) { }
  public passwordNotMatching: string;
  public invalidIDMessage: MessageInterface;
  public firstRegistryForm = new FormGroup({
    ID: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  public registryValidation() {
    if (
      this.firstRegistryForm.controls.password.value !==
      this.firstRegistryForm.controls.confirmPassword.value
    ) {
      this.passwordNotMatching = 'Password must match.';
    } else {
      this.passwordNotMatching = '';
      this.register.checkIfUserExists(this.firstRegistryForm.value).subscribe(
        (res: any) => {
          if (!res?.error) {
            this.data.registeringUser = {
              ID: this.firstRegistryForm.controls.ID.value,
              password: this.firstRegistryForm.controls.password.value,
              email: this.firstRegistryForm.controls.email.value,
            } as RegisterInterface;
            this.data.firstStepRegistryValidation = true;
            return this.r.navigateByUrl('/second-register');
          }
        },
        (err) => {
          this.data.registryMessage = err.error;
        }
      );
    }
  }
  ngOnInit(): void { }
}
