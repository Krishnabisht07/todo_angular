import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  description: [];
  action:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  titleG = '';
  descriptionG = '';
  listTodos = [{
    id: '1',
    title: 'Breakfast',
    description: 'I will have breakfast today around 8 am',
    status: 'active'
  },
  {
    id: '2',
    title: 'Lunch',
    description: 'I will have breakfast today around 1 pm',
    status: 'active'
  },
  {
    id: '3',
    title: 'Dinner',
    description: 'I will have breakfast today around 9 pm',
    status: 'active'
  }

  ];
  // completedTodos:any;
  // activeTodos: any;  
  // displayComplete:boolean = false;
  // displayActive:boolean = false;
  constructor(public dialog: MatDialog) {

  }
  deleteTodo(num: string,index?:number) {
    let i = this.listTodos.findIndex(data=> (data.id==num));
    this.listTodos.splice(Number(i) ,1);
    // if(index==1)
    // this.changeTab(index)
  }
  changeTab(index:number){
    // if(index==1)
    // {
    //  if(this.listTodos.filter(data => data.status=="completed"))
    //  {
    //    this.displayComplete = true;
    //    this.displayActive = false;
    //  }
    // }
    // else if(this.listTodos.filter(data => data.status=="active"))
    // {
    //   this.displayActive = true;
    //   this.displayComplete = false;
    // }
    // else{
    //   this.displayActive = false;
    //   this.displayComplete = false;
    // }
  }
  openDialog(action:string,id?:string) {
    if(action=='display')
    {
      let data = this.listTodos.find(data => data.id==id);
      if(data){
      this.titleG = data.title;
      this.descriptionG = data.description
      }
    }
    else{
      this.titleG='';
      this.descriptionG='';
    }

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { title: this.titleG, description: this.descriptionG, action:action}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let id = this.listTodos.length+1;
        result.id = id;
        result.status="active";
        this.listTodos.push(result);
      }
    });
  }
  changeStatus(checked: boolean, id: string) {

   let todo = this.listTodos.find(data => {
      return data.id==id;
    });
    if(todo && checked)
    {
    todo.status = "completed";
    }
    else if(todo){
    todo.status = "active";
    }
  
   }
}
@Component({
  selector: 'example-dialog',
  templateUrl: 'dialogPop.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef1: MatDialogRef<DialogOverviewExampleDialog>) {
    dialogRef1.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
