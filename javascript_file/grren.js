
const url1="https://openapi.programming-hero.com/api/categories";
    const url2="https://openapi.programming-hero.com/api/plants"

const loadData=()=>{
    
    fetch(url1).then((res)=>res.json())
               .then((data)=> DisplayCategories(data.categories));
    
    fetch(url2).then((res)=>res.json())
               .then((trees)=> DisplayTrees(trees.plants));
            
        
    }

    const DisplayCategories=(data)=>{
        const div=document.getElementById("category");
        
        for(const datas of data)
       {
        
        const btnDiv=document.createElement("div");
        
        
        btnDiv.innerHTML=`<button class="btn md:btn-block" id="${datas.id}" onclick="DisplaylevelTree(${datas.id})">${datas.category_name}</button>`;
        // console.log(btnDiv);
        
        div.appendChild(btnDiv);
        
       }
        
    }

    

    
    const DisplayTrees=(trees)=>{
        const div=document.getElementById("card-container");
        div.innerHTML="";
        for(const tree of trees)
        {
            
            const card=document.createElement("div");
            card.className=" w-[250px] h-[450px] mx-auto md:w-[343px] md:h-[430px]  p-[16px] space-y-2 bg-white";
            card.innerHTML=`
                    <img src=${tree.image} class=" w-[212px] h-[140px] md:w-[311px] md:h-[186px]">
                    <p onclick="DisplayDetails()" class="font-bold">${tree.name}</p>
                    <p>${tree.description}</p>
                    <div class="flex justify-between items-center">
                        <button  class="bg-[#dcfce7] rounded-xl p-2  text-[#15803d]">${tree.category}</button>
                        <p>${tree.price}</p>
                    </div>
                    <button class="btn btn-block rounded-2xl bg-[#15803d] text-white" onclick="addCart(${tree.id})">Add Cart</button>
                `

                div.appendChild(card);
        }

        
       
        

        
    }
    // all tree btn click.
    const allTrees=document.getElementById("all-trees");
    allTrees.addEventListener("click",()=>{

        const div=document.getElementsByClassName("active");
       Array.from(div).forEach(element => {
        element.classList.remove("active");
        
       });
               document.getElementById("all-trees").classList.add("active");
                
               fetch(url2).then((res)=>res.json())
               .then((trees)=> 
                {
                    DisplayTrees(trees.plants);
                   
                }
                );

               
               
            
    })
//   any tree btn clicked
    const DisplaylevelTree=(id)=>{

        const div=document.getElementsByClassName("active");
       Array.from(div).forEach(element => {
        element.classList.remove("active");
        
       });
        document.getElementById(id).classList.add("active");
        
        fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then((res)=>res.json())
        .then((data)=>
            {
                DisplayTrees(data.plants);
               
            }
            
            );
       
        



    }

    // id": 1,
    // "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
    // "name": "Mango Tree",
    // "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
    // "category": "Fruit Tree",
    // "price": 500

    //fruit name clicked.
     const DisplayDetails=(id)=>{
        fetch(`https://openapi.programming-hero.com/api/plant/${id}`).then((res)=>res.json())
    .then((data)=>{
        const detail=data.plants;
       
        

            const div=document.querySelector(".modal-box");
            div.innerHTML=`<h3 class="text-lg font-bold">Mango Tree</h3>
                 <img src="assets/about.png">
                <p class="py-4">Press ESC key or click the button below to close</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex quae commodi consectetur, corrupti deleniti officiis repellat ut, aperiam laudantium ducimus natus, error sunt optio molestiae voluptate tempore quidem ea repudiandae?</p>
                <div class="modal-action">
               <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
             <button class="btn">Close</button>
              </form>
             </div>`;

             
            document.getElementById("my_modal_5").showModal();
             
    })
    
}

let total=0;
const p= document.createElement("p");
p.innerText=`Total:${total}`;
document.getElementById("cart").appendChild(p);
 const addCart=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`).then((res)=>res.json())
    .then((data)=>{
        const detail=data.plants;

       

        const div=document.createElement("div");
        div.innerHTML=`<div class="flex justify-between items-center">
        <p>${detail.name}<br>${detail.price}</p>
        <p onclick="removeit(this,${detail.price})"><i class="fa-solid fa-xmark"></i></p>
        
        </div>`
        total+=detail.price;
        p.innerText=`Total:${total}`;
        document.getElementById("cart").insertBefore(div,p);
        
        




    
    
    
    })
 }

 function removeit(para,price)
 {
    para.parentElement.parentElement.remove();
    total-=price;
    p.innerText=`Total:${total}`;

 }

        
        

     

    // const DisplayDeatails(id)
    
    

    

    
    
    

    loadData();