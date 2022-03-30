import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/services/todo';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: [ './todo.component.scss' ]
})
export class TodoComponent implements OnInit {
  toDo!: Todo;

  constructor(toDoService: TodoService) {
  }

  ngOnInit(): void {
    this.toDo = {
      name: '',
      description: '',
      deadLine: new Date(),
      color: '#0d6efd'
    };
  }

  onSubmit() {
    console.log(this.toDo);
  }
}
