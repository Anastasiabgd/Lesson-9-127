"use strict";

let mainWrapper = document.getElementById('postWrapper');
let overlay = document.getElementById('overlay');
let popapContent = document.getElementById('content');
let closeIcon = document.getElementById('close');



function ajax(url, callback) {
    let requist = new XMLHttpRequest();
    requist.open('GET', url)
    requist.addEventListener('load', function(){

        let mosuliData = JSON.parse(this.responseText);

        callback(mosuliData);
    
       
    })
    requist.send();

}
ajax('https://jsonplaceholder.typicode.com/posts', function(mosuliData){



mosuliData.forEach(item => {

    createPost(item);
    
});
    
});

function createPost(item) {
   let divWrapper = document.createElement('div');
   divWrapper.classList.add('posts');
   divWrapper.setAttribute('data-id', item.id);
   
   let postId = document.createElement('h4');
   postId.innerText = item.id;

   let postTitle = document.createElement('h2');
   postTitle.innerText = item.title;

   divWrapper.appendChild(postId);
   divWrapper.appendChild(postTitle);

   

   divWrapper.addEventListener('click', function(event){
    
    let id = event.target.getAttribute('data-id');
    overlay.classList.add('active');
   

    

    let serverUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(serverUrl, function(mosuliData){

        overlayDescription(mosuliData);

    })
    
    
   })
   mainWrapper.appendChild(divWrapper);

   function overlayDescription(item) {
    let description = document.createElement('p');
    description.innerText = item.body;

    popapContent.appendChild(description);
    
   }

closeIcon.addEventListener('click', function(){
    overlay.classList.remove('active');
    popapContent.innerHTML = " ";
})

}