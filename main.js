
/* fetch(url)
    .then(response => response.json())
    .then( data => {
            const img = document.querySelector('img');
            img.src = data[0].url;
            
          }) */
console.log('CARGA COMPLETA');

const endpoint = {
    URL_API_SEARCH_RANDOM : 'https://api.thedogapi.com/v1/images/search?limit=4&api_key=live_nYwwvicoRKmzbTpDh7sS1MhVASUDuCY8QTYPWlV7lUa5LDRjRk4ydl0p9kT4a7bl',
    URL_API_FAVOURITES: 'https://api.thedogapi.com/v1/favourites?api_key=live_nYwwvicoRKmzbTpDh7sS1MhVASUDuCY8QTYPWlV7lUa5LDRjRk4ydl0p9kT4a7bl',
}


const btn_recarga = document.querySelector("#recargaImagen");
const img = document.querySelector("#imagenesDog");
async function fetchData() {
    const resp = await fetch(endpoint.URL_API_SEARCH_RANDOM);
    const data = await resp.json();
    try {
        console.log(data);
         let datos_imagen = `
    ${data.map (img =>
        ` 
        <div class="col-auto mb-3 me-2 ms-3" style="float: left;">
            <div class="card " style="width: 18rem;" >
                <img src="${img.url}" class="card-img-top img_cambia" alt="..." width="300" height="300">
                <div class="card-body">
                   <button type="button" id="${img.id}" class="btn btn-primary ">Agregar a Favoritos</button>
                </div>
            </div>
        </div>
        `)}`;
        img.innerHTML = datos_imagen.replace(/,/g,"") 
    } catch (error) {
        const errorNode = document.querySelector('#error');
        errorNode.innerText = `Error: ${error.message}`;
    }
   
    }
    // boton carga nuevas imagenes 
    btn_recarga.onclick = fetchData
    fetchData()

 
   


//  async function saveFavoritesDogs (){
//     const option = {
//         method:'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(
//             {image_id: 'UyN27ZccR'}
//         )
//     }
//     const res = await fetch (endpoint.URL_API_FAVOURITES, option)
//     console.log("SAVE");
//  }