import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  locations: string[] = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];

  volunteerform: FormGroup;

  isSubmitted = false;

  constructor(private fb: FormBuilder) { }

  initilizeForm() {
    this.volunteerform = this.fb.group({
      name: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      preferredLocation: "",
      animals: this.fb.group({
        dogs: false,
        cats: false,
        reptiles: false
      }),
      references: this.fb.array([this.fb.control('', [Validators.email, Validators.required])])
    });
  }

  onSubmit(): void{
    console.log(this.volunteerform.value, this.volunteerform.invalid);
    this.isSubmitted = true;
    
    if (this.volunteerform.invalid) {
        return;
    }else{
      this.volunteerform.reset();
      this.volunteerform.get('name')?.clearValidators();
      this.volunteerform.get('name')?.updateValueAndValidity();
      this.volunteerform.get('phoneNumber')?.clearValidators();
      this.volunteerform.get('phoneNumber')?.updateValueAndValidity();
    }
  }

  addEmail() {
    this.references.push(this.fb.control(""));
  }

  removeEmail(index:number) {
    this.references.removeAt(index)
  }

  selectLocation(event:any) {
    this.volunteerform.patchValue({
      preferredLocation:event.target.value
    })
  }

  get references(): FormArray{
    return this.volunteerform.get('references') as FormArray;
  }

  ngOnInit(): void {
    this.initilizeForm();
  }
}

