function userSearch() {
    let YOUR_APP_ID = `0a2cb16c`; 
    let YOUR_APP_KEY= `df317eac9cacca743c171812de787e94`;
    let search_user = document.getElementById('search');
    let category_search = document.getElementById('category_search');
    let list_recipe =document.getElementById('list_recipe');
    let section_recipes = document.getElementById('section_recipes');
//Clears the results and shows him the result he requested  
    if(list_recipe!= null || list_recipe!=""||list_recipe!= undefined)                  
        document.getElementById('list_recipe').innerHTML="";
//checker if user dont file parameters (INPUT TEXT & SELECTION)

    if(search_user.value == '' || search_user.value=="Write something" && category_search.value == 'Category') 
    {
        search_user.value = "Write something";
        return  setTimeout(function(){search_user.value = "";},2000);
    } 
    else
    {   
        if(category_search.value != 'Category')              //cheacker if the user chose from optins selector                        
        {
            search_user.value = category_search.value 
        }
        let apiRecipe = fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search_user.value}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&diet=low-fat`)
        .then((jsonRecipe) => jsonRecipe.json())
        .then((Recipe) => cheackRecipe(Recipe))
    }
}
//Function That cheack if there is result for value`s user.
function cheackRecipe (Recipe)
{
    if(Recipe.hits.length==0 )                        
    return document.getElementById('no_result').innerHTML="No result";        //cheacker if have resualt for
    else
    {
        document.getElementById('no_result').innerText="";
        printRecipes(Recipe)
    }
}
//Function that Print value`s user recipes
function printRecipes(Recipe)
{
    for (let i=0 ; i< Recipe.hits.length ; i++)
    {
        let keyRecipe =Recipe.hits[i]._links.self.href;
        let numberButton = keyRecipe.substring(keyRecipe.indexOf('v2/')+3,keyRecipe.lastIndexOf("?")-1);
        //Crate Elements
        let card = document.createElement('div');
        let card_img_top = document.createElement('img');
        let card_body = document.createElement('div');
        let card_title = document.createElement('h5');
        let card_text = document.createElement('p');
        let card_btn = document.createElement('button')
        let list_recipe =document.getElementById('list_recipe');
        let section_recipes = document.getElementById('section_recipes');
        //Add class to Elements
        card.classList.add(`card`,`${numberButton}`);
        card_img_top.setAttribute("id", `card-img-top ${numberButton}`);
        card_body.classList.add('card-body');
        card_title.classList.add('card-title');
        card_text.classList.add('card-text');
        card_btn.classList.add('btn',`btn-primary`,`${numberButton}`);
        //Properties
        card_btn.innerHTML="Add Favorite";
        card_title.innerHTML = Recipe.hits[i].recipe.label;
        //Break text recipe to lines   
        card_text.innerHTML = Recipe.hits[i].recipe.ingredientLines.map((line_recipe)=>{   
            let line = line_recipe+"<br>";
            return line;
        })
        card.style.width = '18rem';
        //Print to DOM
        card_body.append(card_title);
        card_body.append(card_text);
        card_body.append(card_btn);
        card.append(card_img_top)
        card.append(card_body);
        list_recipe.append(card);
        section_recipes.append(list_recipe);
        document.getElementById(`card-img-top ${numberButton}`).src = `${Recipe.hits[i].recipe.image}`;
        //if img url is error404 = return img defult
        if(document.getElementById(`card-img-top ${numberButton}`).src == `https://www.edamam.com/web-img/56e/56ee3f1d9d4729e324aadf25c843501f`)
         document.getElementById(`card-img-top ${numberButton}`).src = `https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg`;

      //Button Add To Favorite//
        card_btn.addEventListener('click',(event)=>{
            favorite = document.getElementById('favorite');
            //Crate Elements
            let card_fav = document.createElement('div');
            let card_img_top_fav = document.createElement('img');
            let card_body_fav = document.createElement('div');
            let card_title_fav = document.createElement('h5');
            let card_text_fav = document.createElement('p');
            let card_btn_fav = document.createElement('button')

            //Add class to Elements
            card_fav.classList.add(`card`,`fav`,`${numberButton}`);
            card_img_top_fav.setAttribute(`id`, `card-img-top ${numberButton}`);
            card_body_fav.classList.add('card-body');
            card_title_fav.classList.add('card-title');
            card_text_fav.classList.add('card-text');
            card_btn_fav.classList.add('btn',`btn-primary`);
            card_btn_fav.setAttribute('id',`remove ${numberButton}`);

            //properties
            card_title_fav.innerText=card_title.innerText;
            card_text_fav.innerText=card_text.innerText;

            //Print to Favorite Site in DOM
            card_body_fav.append(card_title_fav);
            card_body_fav.append(card_text_fav);
            card_body_fav.append(card_btn_fav);
            card_fav.append(card_img_top_fav)
            card_fav.append(card_body_fav);
             favorite.append(card_fav);
                
            //add Text to Remove Button in Favorite Section
            document.getElementById(`card-img-top ${numberButton}`).src = card_img_top.src
            document.getElementById(`remove ${numberButton}`).innerHTML = "remove";


            // add to local host data
            if(window.localStorage.getItem('Data-Recipes')==null)
            {
                let arryData=[];
                let dataSave = {"id":card_fav.className,"title":card_title_fav.innerText,"recipe":card_text_fav.innerText,"image":document.getElementById(`card-img-top ${numberButton}`).src }
                arryData.push(dataSave);
                window.localStorage.setItem('Data-Recipes',JSON.stringify(arryData));
            }
            else
            {
                let backStorageData = window.localStorage.getItem('Data-Recipes');
                let arryData = JSON.parse(backStorageData)
                dataSave = {"id":card_fav.className,"title":card_title_fav.innerText,"recipe":card_text_fav.innerText,"image":document.getElementById(`card-img-top ${numberButton}`).src }
                arryData.push(dataSave);
                window.localStorage.setItem('Data-Recipes',JSON.stringify(arryData));
            }
            //Remove button in Favorite Section
            card_btn_fav.addEventListener('click', (event)=>{
                let jsonRecipe = localStorage.getItem('Data-Recipes');
                let back_Arry = JSON.parse(jsonRecipe)
                btn_id = card_btn_fav.id.substring(card_btn_fav.id.indexOf('ve ')+3,card_btn_fav.id.lastIndexOf(''));
                for(let i=0 ; i<back_Arry.length ; i++)
                {
                    let idRecipeData = back_Arry[i].id.substring(back_Arry[i].id.indexOf('fav ')+4,back_Arry[i].id.lastIndexOf(""))
                    if(idRecipeData==btn_id)
                    {
                        back_Arry.splice(i,1);
                    }
                }
                localStorage.setItem(`Data-Recipes`,JSON.stringify(back_Arry));
                document.getElementById('favorite').innerHTML="";
                startFavorite();
            })

        })
    }

 
}
 // //Print after user refresh the web, take data from local storage and print 

function startFavorite()
{   
 
    let jsonRecipe = localStorage.getItem('Data-Recipes');
    let startDataRecipes = JSON.parse(jsonRecipe)
    if(startDataRecipes!=null)
    {
        startDataRecipes.map((startDataRecipe)=>{
            //Crate Elements
            let card_fav = document.createElement('div');
            let card_img_top_fav = document.createElement('img');
            let card_body_fav = document.createElement('div');
            let card_title_fav = document.createElement('h5');
            let card_text_fav = document.createElement('p');
            let card_btn_fav = document.createElement('button')
            //Add class to Elements
            let idRecipe = startDataRecipe.id.substring(startDataRecipe.id.indexOf('fav ')+3,startDataRecipe.id.lastIndexOf(""))
            card_fav.classList.add(`card`,`fav`);
            card_fav.setAttribute('id',`${idRecipe}`);
            card_img_top_fav.setAttribute(`id`, `card-img-top ${idRecipe}`);
            card_body_fav.classList.add('card-body');
            card_body_fav.setAttribute('id',`${idRecipe}`);
            card_title_fav.classList.add('card-title');
            card_title_fav.setAttribute('id',`${idRecipe}`);
            card_text_fav.classList.add('card-text');
            card_text_fav.setAttribute('id',`${idRecipe}`);
            card_btn_fav.classList.add('btn',`btn-primary`);
            card_btn_fav.setAttribute('id',`remove ${idRecipe}`);
            //properties
            card_title_fav.innerText=startDataRecipe.title;
            card_text_fav.innerHTML = startDataRecipe.recipe;
            card_btn_fav.innerText ='remove';
            //Print to Favorite Site in DOM
            card_body_fav.append(card_title_fav);
            card_body_fav.append(card_text_fav);
            card_body_fav.append(card_btn_fav);
            card_fav.append(card_img_top_fav)
            card_fav.append(card_body_fav);
            favorite.append(card_fav);

            document.getElementById(`card-img-top ${idRecipe}`).src = startDataRecipe.image;  //image of each recipe
            card_btn_fav.addEventListener('click', (event)=>{
                let jsonRecipe = localStorage.getItem('Data-Recipes');
                let back_Arry = JSON.parse(jsonRecipe)
                btn_id = card_btn_fav.id.substring(card_btn_fav.id.indexOf('  ')+2,card_btn_fav.id.lastIndexOf(''));
                console.log(back_Arry);

                for(let i=0 ; i<back_Arry.length ; i++)
                {
                let idRecipeData = back_Arry[i].id.substring(back_Arry[i].id.indexOf('fav ')+4,back_Arry[i].id.lastIndexOf(""))
                if(idRecipeData==btn_id)
                {
                    back_Arry.splice(i,1);
                }

                }


                localStorage.setItem(`Data-Recipes`,JSON.stringify(back_Arry));
                document.getElementById('favorite').innerHTML="";
                startFavorite();

            })
        })
 
    } 
}

startFavorite();
let search_user=document.getElementById('search');
if(search_user.value == "Write someting")
{
    console.log("hello")
}