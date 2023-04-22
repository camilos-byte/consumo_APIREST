
/* fetch(url)
    .then(response => response.json())
    .then( data => {
            const img = document.querySelector('img');
            img.src = data[0].url;
            
          }) */
console.log('CARGA COMPLETA');
const d = document;
const endpoint = {
    URL_API_SEARCH_FAVOURITES : 'https://api.thedogapi.com/v1/favourites/api_key=live_nYwwvicoRKmzbTpDh7sS1MhVASUDuCY8QTYPWlV7lUa5LDRjRk4ydl0p9kT4a7bl' ,
    URL_API_SEARCH_RANDOM : 'https://api.thedogapi.com/v1/images/search?limit=4&api_key=live_nYwwvicoRKmzbTpDh7sS1MhVASUDuCY8QTYPWlV7lUa5LDRjRk4ydl0p9kT4a7bl',
    URL_API_FAVOURITES: 'https://api.thedogapi.com/v1/favourites?api_key=live_nYwwvicoRKmzbTpDh7sS1MhVASUDuCY8QTYPWlV7lUa5LDRjRk4ydl0p9kT4a7bl',
}


const btn_recarga = document.querySelector("#recargaImagen");
const img = document.querySelector("#imagenesDog");
const favDogs = document.querySelector("#favDogs");
async function fetchData() {
    const resp = await fetch(endpoint.URL_API_SEARCH_RANDOM);
    const data = await resp.json();
    try {
        console.log(data);
         let datos_imagen = `
    ${data.map (img =>
        ` 
        <div class="col mb-3 me-2 ms-3" style="float: left;">
            <div class="card " style="width: 18rem;" >
                <img src="${img.url}" class="card-img-top img_cambia" alt="..." width="300" height="300">
                <div class="card-body">
                   <button type="button" id="${img.id}" class="btn btn-primary btnAdd">Agregar a Favoritos</button>
                </div>
            </div>
        </div>
        `)}`;
        img.innerHTML = datos_imagen.replace(/,/g,"") 
        
        let btnAdd = d.querySelectorAll(".btnAdd");
         btnAdd.forEach((btnAddcats)=>{
           btnAddcats.addEventListener('click', (e)=>{
              let id = e.target.id
               saveFavoritesDogs (id)
              })
            })
    } catch (error) {
        const errorNode = document.querySelector('#error');
        errorNode.innerText = `Error: ${error.message}`;
    }
    
    }
    
    async function saveFavoritesDogs (id){
        // console.log(id);
        var option = { 
            method:'POST', 
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( {image_id: id})
        }
        const res = await fetch (endpoint.URL_API_FAVOURITES, option)
        console.log(res)
        const data = await res.json();
        console.log(data);
        if (res.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Agregado a favoritos',
                text: `El id de su perro favorito es ` + data.id
            })
            dogsFovurites (data.id)    
        }
    }


    async function dogsFovurites (subId) {
        const res = await fetch(`${endpoint.URL_API_FAVOURITES}?sub_id=`+subId)
        console.log(res);
        const data = await res.json();
        console.log(data);
        try {
            let data_nuevo = data.slice(data.length-4)
            console.log(data_nuevo);
            console.log(data_nuevo[3].image.url); 
            
        } catch (error) {
            const errorNode = document.querySelector('#error');
            errorNode.innerText = `Error: ${error.message}`;
        }
    }
    
    // boton carga nuevas imagenes 
    btn_recarga.onclick = fetchData
    fetchData()