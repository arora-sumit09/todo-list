//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click' , deleteCheck);

//functions

function addTodo(event) {
  // prevent form from submitting -default nature
  event.preventDefault();
  //create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; // taking the value of the form
  newTodo.classList.add("todo-item"); // we created a li with an class as todo item now
  todoDiv.appendChild(newTodo);

  // now create buttons
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append to ul
  todoList.appendChild(todoDiv);
  //clear todo input value
  todoInput.value ="";
}

function deleteCheck(e){
  const item = e.target;
  if(item.classList[0] === 'trash-btn'){
    // todoList.remove(item);
    const todo = item.parentElement; 
    todo.remove();
  
  }
  if(item.classList[0] === 'complete-btn'){
    // todoList.remove(item);
    const todo = item.parentElement; 
    todo.classList.toggle('completed');
  }  
  
}
