import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { config, i18n } from '../mock.config'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  actions: any;
}

// const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})

export class StudentDetailsComponent {

  constructor(public dialog: MatDialog){}
  
  studenDetailsDataArray:any[] = [];
  editStudentData:any;
  config = config;
  displayedColumns: string[] = config.studentDetails.table.columnsName;
  dataSource = [...this.studenDetailsDataArray];

  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;

  addData() {
    this.table.renderRows();
  }
  handleDeleteStudentDetails(deleteItemIndex:number){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.dataSource.splice(deleteItemIndex, 1);
        this.table.renderRows();
        
      }
    });    
  }

  handleEditStudentDetails(editItemIndex:number){
    this.editStudentData = this.dataSource.filter((item, index)=>{
      return index == editItemIndex
    })
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {data: this.editStudentData},
      width: '800px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        this.dataSource.splice(editItemIndex, 1, result);
        this.table.renderRows();  
      }
    });
  }

  handleGetStudentDetailsData(event:any){
    this.studenDetailsDataArray = [...this.studenDetailsDataArray, event];
    this.dataSource = this.studenDetailsDataArray;
  }


}
