// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addToDo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAlltodos);
}
function clearAlltodos(e){

    //Arayüzden todoları temizleme

    if(confirm("Tümünü slmek istediğinize emin misiniz?")){
        //todoList.innerHTML = ""; //  yavaş teknik
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild); // hızlı teknik
        }
        localStorage.removeItem("todos");
        
    }
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display: none !important");
        }else{
            listItem.setAttribute("style","display: block");
        }
    });
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi");
    }
}
function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1); // Arrayden değeri silebiliriz
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addToDoToUI(todo);
    });
}
function addToDo(e){
    const newToDo = todoInput.value.trim();
    if(newToDo === ""){
                /*    
                    <div class="alert alert-danger" role="alert">
                        This is a danger alert—check it out!
                    </div>
                */

        showAlert("danger","Lütfen bir todo girin!");
    }else{
        addToDoToUI(newToDo);
        addTodotoStorage(newToDo);
        showAlert("success","Todo başarıyla eklendi!");
    }
    
    e.preventDefault();
}
function getTodosFromStorage(){ // Storage dan todoları alacak
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodotoStorage(newToDo){
    let todos = getTodosFromStorage();

    todos.push(newToDo);
    localStorage.setItem("todos",JSON.stringify("todos"));
}
function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = "alert alert-${type}";
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    //setTimeout
    setTimeout(function(){
        alert.remove();
    },1000);

   
}
function addToDoToUI(newToDo){ //String değerini list item olarak UI ya eklenecek
                    /*
                        <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> 
                    */
    //List item oluşturma
    const listItem = document.createElement("li");
    //Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    //Text node ekleme
    listItem.appendChild(document.createTextNode(newToDo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "";
}