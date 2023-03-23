let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
   
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    const toyCollection = document.getElementById("toy-collection")
    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        // addToy = !addToy;
        // if (addToy) {
        //     toyFormContainer.style.display = "block";
        // } else {
        //     toyFormContainer.style.display = "none";
        // }
        toyFormContainer.classList.toggle('containerToggle')
    });

    //   Block below is for adding toy info to the card
     function getToys(){
        fetch('http://localhost:3000/toys')
        .then(res => res.json())
        .then(toys => toys.forEach(element => renderToyCard(element)))
     }
    
       
    
    function renderToyCard(element) {
        const card = document.createElement('div')
        card.className = 'card'
        toyCollection.append(card)
        const toyName = document.createElement('h2')
        const toyImage = document.createElement('img')
        const toyP = document.createElement('p')
        const toyBtn = document.createElement('button')
        toyName.innerText = element.name
        toyImage.src = element.image
        toyImage.className = 'toy-avatar'
        toyP.innerText = `${element.likes} likes`
        toyBtn.id = element.id
        toyBtn.className = 'like-btn'
        toyBtn.innerText = 'Like ❤️'
        card.append(toyName, toyImage, toyP, toyBtn)


        // Block below is for increasing Toy's likes
        const likeBtn=document.getElementById(`${element.id}`)
        likeBtn.addEventListener('click',addLikes)
        function addLikes(){
          element.likes++
          toyP.innerText = `${element.likes} likes`
          addLikesToBack(element)
        }
    }
    
    function addLikesToBack(element){
        fetch(`http://localhost:3000/toys/${element.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(element)
        })
        .then(res=>res.json())
        .then(a=>console.log(a))
    }

    //   Block below is for adding a new toy
    
        document.getElementsByTagName('form')[0].addEventListener('submit',submitToy)
        function submitToy(e){
            e.preventDefault()
            const obj={
                name:e.target.name.value,
                image:e.target.image.value,
                likes:0
            }
            renderToyCard(obj)
            addNewToy(obj)
        }
        function addNewToy(obj){
            const jsonObj={
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                },
                body:JSON.stringify(obj)
            }
            fetch('http://localhost:3000/toys',jsonObj)
            
        }
    

       
    function initialize(){
        getToys()
    }
        initialize()
        
    }
);



