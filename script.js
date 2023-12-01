let refresh = document.getElementById('refresh')
refresh.addEventListener('click', ()=>{
    window.location.href = './index.html'
})


async function getrandom(){
    try{
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
        const data = response.data
        // console.log(data)
        document.getElementById('randomfoodname').textContent = data.meals[0].strMeal
        // console.log("Title:",data.meals[0].strMeal)
        document.getElementById('caegory').textContent = data.meals[0].strCategory
        // console.log("Category: ", data.meals[0].strCategory)
        document.getElementById('type').textContent = data.meals[0].strArea
        // console.log("Type: ", data.meals[0].strArea)
        document.getElementById('reference').href = data.meals[0].strSource
        // console.log("Reference:", data.meals[0].strSource)
        document.getElementById('viewing').addEventListener('click',()=>{
            displaying(data.meals[0].idMeal)
        })


        getins(data.meals[0].strMeal, data.meals[0].strInstructions) 
        // console.log(ins)

        document.getElementById('fetured_dish').src = data.meals[0].strMealThumb

    }
    catch(err){
        console.log(err)
    }
}

getrandom()

async function getsearchdata(){
    try{
        window.location.href = "#searchhead"
        let search = document.getElementById("search").value
        const response  = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`)
        const meals = await response.data.meals
        if(meals == null){
            document.getElementById('searchlist').innerHTML="<h1>No search result found, try another category</h1>"
        }
        else if(search==''){
            document.getElementById('searchlist').innerHTML=''
        }
        else{
            document.getElementById('searchlist').innerHTML = '';
            meals.forEach(meal=>{
                let i = meal.idMeal
                let title = meal.strMeal
                let src = meal.strMealThumb
    
                document.getElementById('searchlist').innerHTML+=`
                <div class="food" id=${i}>
                <div class="back">
                </div>
                <img src=${src} id="food" alt="food${1}">
                <h1 id="title">${title}</h1>
                </div>`
            })
    
    
    
            let foods = document.getElementsByClassName('food')
    
            for (let i = 0; i<foods.length; i++){
                let id = foods[i].id
                foods[i].addEventListener('click',()=>{
                    displaying(id)
                })
            }    
        }

        

    }catch(err){
        console.log(err)
    }
}


function getins(name, ins){
    document.getElementById('mealname').textContent=  name

    document.getElementById('instru').textContent = ins
}




document.getElementById('close').addEventListener('click', ()=>{
    document.getElementById('popup1').style.display='none'
})

document.getElementById('getins').addEventListener('click',()=>{
    document.getElementById('popup2').style.display='block'
})

document.getElementById('close2').addEventListener('click', ()=>{
    document.getElementById('popup2').style.display='none'
})


async function displaying(id){
    try{
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = response.data
        
        document.getElementById('popup1').style.display='block'
        
        document.getElementById('mealname').textContent= data.meals[0].strMeal
        let items = ''
        document.getElementById('ingr').innerHTML = ''

        const meal = Object.keys(data.meals[0])
        let ing = []
        let meas = []
        meal.forEach(key => {
            if(key.slice(3,13) == "Ingredient"){
                if (data.meals[0][`${key}`] != ''){
                    ing.push(data.meals[0][`${key}`])
                }
            }
            if(key.slice(3,10) == "Measure"){
                if (data.meals[0][`${key}`] != ''){
                    meas.push(data.meals[0][`${key}`])
                }
            }
         });

        for(let i= 0; i<ing.length;i++){
            items += `<li>${ing[i]} : ${meas[i]}</li>`
        }

        document.getElementById('ingr').innerHTML = items


    }catch(err){
        console.log(err)
    }
}
