console.log('CARGA COMPLETA');

const URLAPI = 'https://gateway.marvel.com:443/v1/public/characters/1011334/comics?ts=1&apikey=3c464487ddb485dd26e90b1a2ccc74bd&hash=48a4ae55c01d78c3f46250a6ff7d5a17';


/* fetch(url)
    .then(response => response.json())
    .then( data => {
            const img = document.querySelector('img');
            img.src = data[0].url;
            
          }) */
const imagen = document.querySelector('#img')
async function fetchData(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

async function getAvenger(url) {
    try {
        const response = await fetchData(url);
        const image =  response.data.results[0].images[0].path+".jpg";
        const cantidad =  response.data.results;
        for (let i = 0; i < cantidad.length; i++) {
           imagen.innerHTML +=`<div class="col-sm-3 align-self-center mt-4">
           <div class="card text-center">
           <div class="card-header" id="group"></div>
           <div class="card-body">
             <h5 class="card-title " id="name"> ${cantidad[i].title}</h5>
             <p class="card-text" id="text"></p>
             <img src="${cantidad[i].images[0].path +".jpg"}" alt=""style="width: 200px; height: 300px;">
           </div>
           <div class="card-footer text-muted" id="description_book">
            ${cantidad[i].textObjects[0].text}
           </div>
           </div>
      </div>`
        }
    } catch {
        throw new Error("Error en la API");
    }
}


getAvenger(URLAPI);

