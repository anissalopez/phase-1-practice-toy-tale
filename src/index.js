let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
//call on baseToys function to initialize fetch GET request to toys API
baseToys()
});

//function baseToys creates a GET fetch request and returns the response. We call on the method json on the returned response from JSON to javascript
// we call on the another .then method to save the returned JS date (object) into a variable toys. we call the function loadToys with the argument of the newly returned object
function baseToys(){

  fetch("http://localhost:3000/toys")
  .then(function (response){
    return response.json()
  })
  .then(function (object){
  let toys = object
  loadToys(toys)
  })
}

//we create a function loadToys to convert our javascript object into different elements to append to the DOM
function loadToys(toys){

//declared a variable divContainer and assigned it to the value of the HTML element with the ID of toy-collection. 
 let divContainer = document.getElementById("toy-collection")

  //loop through toy array to set values for elements at the respective indexes
  for (let i = 0; i < toys.length; i++){

  //create div to hold card elements and append it to the DOM calling on the appendChild method to append the newly created div to our divContainer variable 
  let div = document.createElement('div');
  div.classList.add('card');
  divContainer.appendChild(div)
 

//create elements that will house card values 

  let name = document.createElement('h2');
  let image = document.createElement('img');
  let p = document.createElement('p');
  let button = document.createElement('button');
  


  //assign the elements values as we loop through the toy array 

  name.textContent = toys[i].name;
  image.src = toys[i].image;
  image.classList.add("toy-avatar")
  p.textContent = `${toys[i].likes} Likes`;

  //assign button a class list and add text Like <3 to each button 
  button.setAttribute('id', toys[i].id)
  button.setAttribute('class', `like-btn`)
  button.textContent = `Like ❤️`


  //add eventListener to button and update p with incremental like. Create a function likeHandler to handle incrementing likes and rendering to the DOM

  button.addEventListener("click", likeHandler)

  //append name, image, likes + button to dom 
  div.appendChild(name)
  div.appendChild(image)
  div.appendChild(p)
  div.appendChild(button)
}  
}


//create a function that will update the value of the likes variable 
function likeHandler(event){

//capture toys ID
let objectID = event.target.id

//calculate the new number of likes 

//select all the p elements with an ID of card 
// declare a variable likesValue that will later be reassigned to the current likes at the index of the selected ID 
let likesObject = document.querySelectorAll('.card p')
let likesValue = " "


//loop through p elements and update likesValue by one
//to achieve this we set the current likesObject that contains are p elemenets to the index of the currentObject ID minus 1 to get its current position in the array
//this will give us the text of that p element at the current index, however, we have to split the text to get the actual number of likes at that index in the array
//to split the text we call on the split method with an argument of parenthesis with a space in between to split the text where there is a splace which produces a current array of the text content 
//once the text is split we can then get the number of likes by reassigning our likesValue to the index of the number which is 0. 

for (let i = 0; i < likesObject.length; i++){
  likesObject = likesObject[objectID - 1]
  likesValue = likesObject.textContent.split(" ")
  likesValue = likesValue[0]
  likesValue++


//create a function that will update the likesObject with current likesValue and append to the DOM 
function updateLikesOnDom (){
   likesObject.textContent = `${likesValue} Likes`
   

  }

  
}


//define object for body of fetch request 

let objectData = {
  likes: likesValue
}





//define object for fetch request and update likes to likes variable


fetchObject = {
  method: "PATCH",
  headers:{"Content-Type": "application/json",
  Accept: "application/json"
  },
  body: JSON.stringify(objectData)
}


//fetch request to obtain the id from the toys api and update the number of likes by calling on the updateLikesOnDom function defined in the for loop to udpate Likes value

fetch(`http://localhost:3000/toys/${objectID}`, fetchObject)
.then(function (response){
  return response.json();
})
.then(updateLikesOnDom())
}







// grab the form element using query selector and add an event listener to the element to listen for when it is submitted
//prevent the default behavior so that the form does not refresh when submitted
//grab the input variables and assign the key value pairs of name and image to the respective inputs at the index of 0 and 1. 

let toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener('submit', handleToys)


function handleToys (event){

//create toyObject that will be POST data object in fetch request below 
//event listener that will listen for form submit information and update toyObject with the input variables of name and image to be used to be used in Fetch POST request 
  

  let toyObject = {}
    
    let inputs = document.querySelectorAll('.input-text')
    let nameInput = inputs[0].value
    let urlInput = inputs[1].value
    toyObject.name = nameInput
    toyObject.image = urlInput
    toyObject.likes = 0;

    
    toyForm.reset();
   


 
    


let fetchObject = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify(toyObject),
};

fetch("http://localhost:3000/toys", fetchObject)
.then(function(response){
 return response
})

//call on loadToys with the argument of toyObject to format toyData and append to DOM
loadToys(toyObject);
}




  
  

