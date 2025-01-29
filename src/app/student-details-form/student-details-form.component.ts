import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { i18n } from '../mock.config'

export interface User {
  name: string;
}


@Component({
  selector: 'app-student-details-form',
  templateUrl: './student-details-form.component.html',
  styleUrls: ['./student-details-form.component.css']
})
export class StudentDetailsFormComponent implements OnInit {

  @Output() sendStudentDetailsData = new EventEmitter<any>;

  mockData = i18n;

  options: User[] = [
    { name: 'India' },
    { name: 'Spain' },
    { name: 'UK' }
  ];

  age = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  filteredOptions: Observable<User[]> | undefined;
  studentDetails: any;
  languages: any;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.studentDetails = new FormGroup({
      country: new FormControl(''),
      gender: new FormControl(''),
      city: new FormControl(''),
      age: new FormControl(''),
      name: new FormControl(''),
      languages: new FormGroup({
        english: new FormControl(false),
        hindi: new FormControl(false),
        marathi: new FormControl(false),
      })
    });

    // console.log(this.studentDetails);


    this.filteredOptions = this.studentDetails.get('country')?.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );

  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name?.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  handleSubmitStudentDetails() {
    this.studentDetails.value.country = this.studentDetails.value.country.name ? this.studentDetails.value.country.name : this.studentDetails.value.country;
    this.studentDetails.value.languages = Object.keys(this.studentDetails.value.languages).filter(key => this.studentDetails.value.languages[key] === true); 
    this.sendStudentDetailsData.emit(this.studentDetails.value);
    this.studentDetails.reset();

  }

}
