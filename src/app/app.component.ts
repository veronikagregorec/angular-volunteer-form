import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  locations: string[] = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];

  volunteerform: FormGroup;

  alertMessage: boolean = false;

  constructor(private fb: FormBuilder) { }

  initilizeForm() {
    let emailValidation = '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'

    this.volunteerform = this.fb.group({
      name: ["", [Validators.required, Validators.pattern('[A-Z][a-z]* [A-Z][a-z]*')]],
      phoneNumber: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      preferredLocation: ["", Validators.required],
      animals: this.fb.group({
        dogs: [false, Validators.required],
        cats: [false, Validators.required],
        rabbits: [false, Validators.required]
      }),
      references: this.fb.array([this.fb.control('', [Validators.email, Validators.required,  Validators.pattern(emailValidation)])])
    });
  }
  
  onSubmit(): void{
    console.log(this.volunteerform.value);
    
    if (this.volunteerform.invalid) {
      return;
    }else{
      this.volunteerform.reset();
    }

    this.alertMessage = true;
  }

  addEmail() {
    this.references.push(this.fb.control(""));
  }

  removeEmail(index:number) {
    this.references.removeAt(index)
  }

  selectLocation(event:any) {
    this.volunteerform.patchValue({
      preferredLocation: event.target.value
    })
  }

  get references(): FormArray{
    return this.volunteerform.get('references') as FormArray;
  }

  ngOnInit(): void {
    this.initilizeForm();
  }
}