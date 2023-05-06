"use strict";
import { updateShoppingList, clearList } from "./shopping_actions.js";

let newItemForm = document.getElementById("newItemForm");
let clearButton = document.getElementById("clearButton");

export let shoppingList = []; 


const getShoppingList = () => {
    if(localStorage.getItem("shoppingList")) {
        shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
    } else {
        shoppingList = [];
    }
}
const init = () => {
    getShoppingList();
    updateShoppingList(shoppingList);
    clearButton.addEventListener('click', clearList);
    console.log(clearButton); 
}
init();

newItemForm.addEventListener('submit', (event) => {
    console.log(event);
    event.preventDefault();
    
    let shoppingError = document.getElementById('shoppingError');
    let taskName = event.target.elements[0];
  
    if(taskName.value.length > 2) {
        let item = {
            name: taskName.value,
            status: false
        };

        shoppingList.push(item);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        taskName.value = "";

        taskName.classList.remove("input-danger");
        shoppingError.innerText = "";

        updateShoppingList(shoppingList);

    } else {
        taskName.classList.add("input-danger");
        shoppingError.innerText = "Nazwa Powinna mieć min 3 znaki!";
    }

   
     
})
