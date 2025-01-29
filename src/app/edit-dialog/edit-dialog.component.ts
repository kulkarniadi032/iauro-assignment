import { i18n } from './../mock.config';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';

export interface User {
  name: string;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  options = [
    { name: 'India' },
    { name: 'Spain' },
    { name: 'UK' }
  ];

  mockData = i18n;
  age = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  filteredOptions: Observable<any[]> | undefined;
  studentDetails: any;
  languages: any;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<EditDialogComponent>) {

  }

  ngOnInit() {
    console.log("data", this.data);
    
    this.studentDetails = this.fb.group({
      // country: [this.data.data[0].country],
      country: [{ name: this.data.data[0].country}],
      gender: [this.data.data[0].gender],
      city: [this.data.data[0].city],
      age: [this.data.data[0].age],
      name: [this.data.data[0].name],
      languages: this.fb.group({
        english: [this.data.data[0].languages.includes('english') ? true : false],
        hindi: [this.data.data[0].languages.includes('hindi') ? true : false],
        marathi: [this.data.data[0].languages.includes('marathi') ? true : false],
      })
    });

    // console.log(this.studentDetails);


    this.filteredOptions = this.studentDetails.get('country')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        // console.log("value", value);
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );

  }

  displayFn(user: User): string {
    return user ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name?.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  handleSubmitStudentDetails() {
    this.studentDetails.value.country = this.studentDetails.value.country.name ? this.studentDetails.value.country.name : this.studentDetails.value.country;
    this.studentDetails.value.languages = Object.keys(this.studentDetails.value.languages).filter(key => this.studentDetails.value.languages[key] === true);
    this.dialogRef.close(this.studentDetails.value);
  }

  handleCancel(){
    this.dialogRef.close(false);
  }
}
