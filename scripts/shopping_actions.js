"use strict";
let ul = document.getElementById("shoppingList");

import { shoppingList } from "./shoppinglist.js";

export const updateShoppingList = (shoppingList) => {
    
    let eventList = Array.from(ul.getElementsByTagName('li'));
    eventList.forEach(task => {
        task.childNodes[1].removeEventListener('click', completeTask);
    });

    ul.innerHTML = "";
    
    shoppingList.forEach((item, index) => {
        let li = document.createElement('li');

        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        let taskName = document.createElement('h5');
        let main = document.createElement('main');
        let button = document.createElement('button');
        let removeButton = document.createElement('button');
        
        taskName.innerText = item.name;
        main.classList.add('d-flex', 'gap-2');

        button.classList.add('btn', 'btn-sm');
        button.addEventListener('click', completeTask);
        button.dataset.taskId = index;

        if(!item.status) {
            button.innerText = "Skończ";
            button.classList.add("btn", "btn-sm", "btn-success");
        } else {
            button.innerText = "Przywróć";
            button.classList.add("btn", "btn-sm",'btn-danger');
            taskName.style.textDecoration = "line-through";
        }

        removeButton.classList.add('btn', 'btn-sm', 'btn-danger');
        removeButton.addEventListener('click', deleteTask);
        removeButton.dataset.taskId = index;
        removeButton.innerText = "USUŃ";

        main.appendChild(button);
        main.appendChild(removeButton);

        li.appendChild(taskName);
        li.appendChild(main);

        ul.appendChild(li);
    });
    
}

const completeTask = (event) => {
    let task = shoppingList[Math.round(event.target.dataset.taskId)]; // The way to get object index in a list from event properties (since it's written in the button dataset-task-id=id)
    task.status = !task.status;
    updateShoppingList(shoppingList);
}
const deleteTask = (event) => {

    shoppingList.splice(Math.round(event.target.dataset.taskId), 1);
    updateShoppingList(shoppingList);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}
export const clearList = () => {
    localStorage.removeItem('shoppingList');
    location.reload();
}