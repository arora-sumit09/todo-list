//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');
// event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click' , deleteCheck);
filterOption.addEventListener("click" , filterTodo);

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
  // saving it to local storage
  saveLocalTodos(todoInput.value);

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
    // adding animation 
    // todo.classList.add("fall");
    removeLocalTodos(todo);
    // todo.addEventListener("transitioned", ()=>{
      //   todo.remove();
      // });
      todo.remove();
      
  }
  if(item.classList[0] === 'complete-btn'){
    // todoList.remove(item);
    const todo = item.parentElement; 
    todo.classList.toggle('completed');
  }  
  
}

function filterTodo(e){
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
        case "completed":
          if(todo.classList.contains("completed")){
            todo.style.display="flex";
          } else{
              todo.style.display = "none";
          }
          break;
         case "uncompleted" : 
         if(!todo.classList.contains("completed")){
          todo.style.display="flex";
        } else{
            todo.style.display = "none";
        }
    }
  
  });
}
function checkTodos(){
  let todos ; 
  if(localStorage.getItem('todos')===null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}


function saveLocalTodos(todo){
  // check for previous todos
  let todos = checkTodos();
  todos.push(todo);
  localStorage.setItem("todos" , JSON.stringify(todos));
}
// in the below function what i am doing is -> firstly i am just storing the key value pairs that is todos and corresponding to it the form input value
// i am not storing an complete element in the list so i have to go to each value i.e already present in the local storage and create the corresponding 
// div tags and all the above things i have done

function getTodos(){
  let todos = checkTodos();

  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; // taking the value of the form
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
  });
}
// for the function below i want to remove the elements i am clicking on from the array
function removeLocalTodos(todo){
  let todos = checkTodos();
  // console.log(todo.children);
  const todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex,1);
  localStorage.setItem('todos',JSON.stringify(todos));
}