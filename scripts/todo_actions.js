"use strict";
import { todoList } from "./todo.js";
let ul = document.getElementById("todoList");

export function updateTodoList() {
    let iList = Array.from(ul.getElementsByTagName('li'));
    iList.forEach(task => {
        task.childNodes[1].removeEventListener('click', completeTask);
    });

    ul.innerHTML = ""
    
    todoList.forEach((todo, index) => {
        console.log(iList);
        let li = document.createElement("li");
        
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
        let main = document.createElement('main');
        let heading = document.createElement('h5');
        let paragraph = document.createElement('p');
        let button = document.createElement('button');
        
        button.classList.add('btn', 'btn-sm');
        button.addEventListener('click', completeTask);
        button.dataset.taskId = index;
        
        if(!todo.status) {
            button.innerText = "Skończ";
            button.classList.add("btn", "btn-sm", "btn-success");
        } else {
            button.innerText = "Przywróć";
            button.classList.add("btn", "btn-sm",'btn-danger');
            main.style.textDecoration = "line-through";
        }
        
        heading.innerText = todo.name;
        paragraph.innerText = todo.desc;

        main.appendChild(heading);
        main.appendChild(paragraph);

        li.appendChild(main);
        li.appendChild(button);

        ul.appendChild(li);
    });
}
const completeTask = (event) => {
    console.log("task zrobiony");
    console.log(event.target);
    let todo = todoList[Math.round(event.target.dataset.taskId)];
    console.log(todo);
    if(todo.status === true) {
        todo.status = false;
    } else {
        todo.status = true;
    }
    updateTodoList();
    return;
}

export const clearList = () => {
    localStorage.removeItem('todoList');
    location.reload();
}