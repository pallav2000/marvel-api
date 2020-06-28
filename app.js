window.onload = function()
{   
    const cors = 'https://cors-anywhere.herokuapp.com/'
    Public_key = "af8dc2c389a07e056c12fc74fbf0b468";
    Private_key = "b8cd7bac4ec73fc385a27e75ac0bb038cb8faeeb";
    const submit = this.document.querySelector('.container-form>form');
    const IMAGE_NOT_AVAIL = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
    const NOTE_found = `http://i.annihil.us/u/prod/marvel/i/mg/5/e0/4c0035c9c425d`; 
    var date = new Date();
    var ts = date.getTime();
    var anything = [];
    var nav = [];//image
    
  var hash = md5(ts+Private_key+Public_key);///not touch

  console.log(hash);

    submit.addEventListener('submit',(e)=>{
        e.preventDefault();
        let keyword = this.document.querySelector('.container-form>form>input[type="search"]').value;
        var URL = cors+`http://gateway.marvel.com/v1/public/characters?limit=80&nameStartsWith=${keyword}&ts=${ts}&apikey=${Public_key}&hash=${hash}`;
        http = new this.XMLHttpRequest();
        http.onreadystatechange = function(){
            if(http.readyState == 4 && http.status == 200){
                if(http.responseText!==null){
                    if(JSON.parse(http.responseText).data.results.length ===0){
                        document.querySelector('.responseDiv').innerHTML = '<h3>No Search Results</h3>';
                    } 
                    else{

                        document.querySelector('.responseDiv').innerHTML = createTemplate(http.responseText);
                    }
                }
            }
        }
        http.open('GET', URL);
        http.send();
    });

    function createTemplate(json){
        json = JSON.parse(http.responseText);
        let div1 = document.createElement('div');
        console.log(json);

        for(let x=0;x<json.data.results.length;x++){
            if(json.data.results[x].thumbnail.path != IMAGE_NOT_AVAIL && json.data.results[x].description != "")
            {
            let div2 = document.createElement('div');
            div2.classList.add('responseSpan');
            div2.innerHTML+=`<h3>${json.data.results[x].name}</h3><img src=${json.data.results[x].thumbnail.path}.jpg></img>`;
            div2.innerHTML+= `<p><b>Description : </b>${json.data.results[x].description}</p>`;
             div2.innerHTML+=`<p><b>Modified : </b>${json.data.results[x].modified}</p>`;
             div2.innerHTML+=`<p><b>Know more : </b><a href="${json.data.results[x].urls[0].url}" target="blank">click here</a></p>`;

        div2.innerHTML+=`<p><b>Comic Link : </b><a href="${json.data.results[x].urls[1].url}" target="blank">click here</a></p>`;
           /* div2.innerHTML+= `<p><b>Energy : </b>${json.hits[x].recipe.calories} KCAL</p>`;
            div2.innerHTML+=`<p><b>Fats : </b>${json.hits[x].recipe.totalNutrients.FAT.quantity} grams</p>`;
            div2.innerHTML+=`<p><b>Sugar : </b>${json.hits[x].recipe.totalNutrients.SUGAR.quantity} grams</p>`;
            div2.innerHTML+=`<p><b>Cholestrol : </b>${json.hits[x].recipe.totalNutrients.CHOLE.quantity} miligrams</p>`;
            div2.innerHTML+=`<p><b>Protein : </b>${json.hits[x].recipe.totalNutrients.PROCNT.quantity} grams</p>`;
            let ingredients='';

            for(let y=0;y<json.hits[x].recipe.ingredientLines.length;y++){
                ingredients+=`<li>${json.hits[x].recipe.ingredientLines[y]}</li>`;
            }
            div2.innerHTML+=`<p><b>Ingredients : </b><ul>${ingredients}</ul></p>`;
            div2.innerHTML+=`<a href="${json.hits[x].recipe.url}" target="_blank"><button><i class="fa fa-external-link" aria-hidden="true"></i>  Read Full Article</button></a>`;
            */div1.append(div2);
        }
    }
        return div1.outerHTML;
    }
}
