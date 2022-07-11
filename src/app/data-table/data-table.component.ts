import { Component, Input, OnInit, Output , EventEmitter, ViewChild, AfterViewInit} from '@angular/core';
import { TodoService } from '../todo.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
/*B-addImport*/

/*Code injected by: Images-alterAddImport*/
import {MatSort, Sort} from '@angular/material/sort';
/*Code injected by: Images-alterAddImport*/


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() tableName: string  = '';
  @Input() columnNames:any;
  @Input() dataSource:any;
  @Input() actionIcons:any;
  @Output() updateTasks = new EventEmitter<string>();
  
  constructor(private todoService:TodoService, private _liveAnnouncer: LiveAnnouncer) { }
  /*B-addViewChild*/

/*Code injected by: Images-alterAddViewChild*/
@ViewChild(MatSort) sort: MatSort | undefined;
/*Code injected by: Images-alterAddViewChild*/

  dataSource2:any
  
  ngOnInit(): void {
  }
  updateTable(state:string){
    const selectService = state === 'OPEN' ? this.todoService.getPendingTasks() : this.todoService.getClosedTasks();
    selectService.subscribe((data:any)=>{this.dataSource = data.list})
  }
  updateTask(id:any,state:string){
    this.todoService.updateTask(id,state).subscribe((res: any) => {
      this.updateTasks.emit();
    })
  }

  deleteTask(element:any){
    this.todoService.deleteTask(element.id).subscribe((res: any) => {
    this.updateTable(element.state) 
    })
  }

 /*B-addannounceSortChange*/

/*Code injected by: Images-alterAddannounceSortChange*/
announceSortChange(sortState: Sort) {
            const selectService = this.dataSource[0].state === 'OPEN' ? this.todoService.sortPendingTasks(sortState.direction) : this.todoService.sortClosedTasks(sortState.direction);
            selectService.subscribe((data:any)=>{this.dataSource = data.list})

            if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
            } else {
            this._liveAnnouncer.announce('Sorting cleared');
            }
        }
/*Code injected by: Images-alterAddannounceSortChange*/



}
