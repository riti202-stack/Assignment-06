
const url1="https://openapi.programming-hero.com/api/categories";
    const url2="https://openapi.programming-hero.com/api/plants"

const loadData=()=>{
    
    fetch(url1).then((res)=>res.json())
               .then((data)=> DisplayCategories(data.categories));
    
    fetch(url2).then((res)=>res.json())
               .then((trees)=> DisplayTrees(trees.plants));
            
        
    }

    const allTrees=document.getElementById("all-trees");
    allTrees.addEventListener("click",()=>{
        fetch(url2).then((res)=>res.json())
               .then((trees)=> DisplayTrees(trees.plants));
               
            
    })

    const DisplayTrees=(trees)=>{
        const div=document.getElementById("card-container");
        div.innerHTML="";
        for(const tree of trees)
        {
            
            const card=document.createElement("div");
            card.className=" w-[250px] h-[290px] md:w-[343px] md:h-[381px] mb-8 p-[16px]";
            card.innerHTML=`
                    <img src=${tree.image} class=" w-[212px] h-[140px] md:w-[311px] md:h-[186px]">
                    <p>${tree.name}</p>
                    <p>${tree.description}</p>
                    <div class="flex justify-between items-center">
                        <button>${tree.category}</button>
                        <p>${tree.price}</p>
                    </div>
                    <button class="btn btn-block">Add Cart</button>
                `

                div.appendChild(card);
        }
        

        
    }

    const DisplaylevelTree=(id)=>{
        fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then((res)=>res.json())
        .then((data)=>DisplayTrees(data.plants));

    }
    
    

    

    
    const DisplayCategories=(data)=>{
        const div=document.getElementById("category");
        
        for(const datas of data)
       {
        
        const btnDiv=document.createElement("div");
        
        btnDiv.innerHTML=`<button class="btn btn-block" onclick="DisplaylevelTree(${datas.id})">${datas.category_name}</button>`;
        // console.log(btnDiv);
        
        div.appendChild(btnDiv);
        
       }
        
    }

    

    loadData();