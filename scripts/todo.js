"use strict";
import { updateTodoList, clearList } from "./todo_actions.js";

let todoForm = document.getElementById("todoForm");
let clearButton = document.getElementById("clearButton");
export let todoList = [];

localStorage.setItem("penis", "długi");



const getTodoList = () => {
    if(localStorage.getItem("todoList")) {
        todoList = JSON.parse(localStorage.getItem('todoList'));
    } else {
        todoList = [];
    }
}
const init = () => {
    getTodoList();
    updateTodoList();
    clearButton.addEventListener('click', clearList);
    console.log(clearButton);
    
}

init();

todoForm.addEventListener('submit', (event) => {
    
    console.log(event);
    event.preventDefault();
    let todoName = event.target.elements[0];
    let todoDesc = event.target.elements[1];
    let todoNameError = document.getElementById("todoNameError");
    let todoDescError = document.getElementById("todoDescError");

    if(todoName.value.length > 2) {
        event.target.elements[0].classList.remove("input-danger");
        todoNameError.innerText = ""
    }
    if(todoDesc.value.length > 2) {
        event.target.elements[1].classList.remove("input-danger");
        todoDescError.innerText = ""
    }
    if (todoDesc.value.length > 2 && todoName.value.length > 2){
        
        for(let todo of todoList) {
            if(todo.name === todoName.value && todo.desc === todoDesc.value) return;
        }
        let todo = {
            name: todoName.value,
            desc: todoDesc.value,
            status: false
        };

        todoList.push(todo);
        localStorage.setItem('todoList', JSON.stringify(todoList));

        todoName.value = "";
        todoDesc.value = "";
        
        updateTodoList(todoList);
    } else {
        if (todoName.value.length <= 2) {
            event.target.elements[0].classList.add("input-danger");
            todoNameError.innerText = "Nazwa powinna mieć przynajmniej 3 znaki!";
        }
        if (todoDesc.value.length <= 2) {
            event.target.elements[1].classList.add("input-danger");
            todoDescError.innerText = "Opis powinien mieć przynajmniej 3 znaki!";
        }
            
    }
})