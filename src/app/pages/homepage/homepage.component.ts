import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  form: FormGroup;

  zipCodes: string[];

  constructor(
    private fb: FormBuilder
  ) {
    const lsZipcodes = localStorage.getItem('zipcodes');
    if(lsZipcodes){
      this.zipCodes = lsZipcodes.split(',');
    } else {
      this.zipCodes = [];
    }

    this.form = this.fb.group({
      zipcode: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  ngOnInit(): void {

  }

  submit(): void {
    if(this.form.invalid){
      return;
    }

    const formZipcode = this.form.value.zipcode;

    if(this.zipCodes.includes(formZipcode)){
      return;
    }

    this.zipCodes.push(formZipcode);
    localStorage.setItem('zipcodes', this.zipCodes.toString())

  }

  removeZipCode(zipcode: string): void {
    this.zipCodes = this.zipCodes.filter(el => el !== zipcode);
    localStorage.setItem('zipcodes', this.zipCodes.toString())
  }

}
