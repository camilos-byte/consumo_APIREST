
/* fetch(url)
    .then(response => response.json())
    .then( data => {
            const img = document.querySelector('img');
            img.src = data[0].url;
            
          }) */
console.log('CARGA COMPLETA');
const d = document;
const endpoint = {
    // URL_API_SEARCH_FAVOURITES : 'https://api.thedogapi.com/v1/favourites/api_key=live_how4GJ5F7BqESedRg4YV13F5gVCGELLDWCAhGW3j5ibdvuGkPETeRohdq517FuFQ' ,
    URL_API_SEARCH_RANDOM : 'https://api.thedogapi.com/v1/images/search?limit=4&api_key=live_how4GJ5F7BqESedRg4YV13F5gVCGELLDWCAhGW3j5ibdvuGkPETeRohdq517FuFQ',
    URL_API_FAVOURITES: 'https://api.thedogapi.com/v1/favourites?api_key=live_how4GJ5F7BqESedRg4YV13F5gVCGELLDWCAhGW3j5ibdvuGkPETeRohdq517FuFQ',
}

let URL_API_DELETE_FAV = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=live_how4GJ5F7BqESedRg4YV13F5gVCGELLDWCAhGW3j5ibdvuGkPETeRohdq517FuFQ`;

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
        <div class="" >
            <div class="card " style="width: 18rem;" >
                <img src="${img.url}" class="card-img-top img_cambia" alt="..." width="300" height="200">
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
               saveFavoritesDogs (id);
               btnAddcats.setAttribute("disabled", "");
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
        const res = await fetch (endpoint.URL_API_FAVOURITES, option);
        const data = await res.json();
        console.log(res);
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado a favoritos',
                    text: `El id de su perro favorito es ` + data.id
                })
                
                dogsFovurites (data.id);    
            }
    }


    async function dogsFovurites (subId) {
        let favDogs = d.querySelector('#favDogs');
        const res = await fetch(`${endpoint.URL_API_FAVOURITES}?sub_id=`+subId)
        const data = await res.json();
        try {
            console.log(data);
            let data_nuevo = data.slice(data.length-4)
            let datos_fav = `
            ${data_nuevo.map (dog_fav =>
                ` 
                <div class="col mb-3 me-2 ms-3" style="float: left;">
                    <div class="card " style="width: 18rem;" >
                        <img src="${dog_fav.image.url}" class="card-img-top img_cambia" alt="..." width="300" height="200">
                        <div class="card-body">
                           <button type="button" id="${dog_fav.id}" class="btn btn-primary btn_delete">Eliminar</button>
                        </div>
                    </div>
                </div>
                `)}`;
                favDogs.innerHTML = datos_fav.replace(/,/g,"") 
                   
        let btnDelete = d.querySelectorAll(".btn_delete");
        btnDelete.forEach((btnDeletecats)=>{
            btnDeletecats.addEventListener('click', (e)=>{
             let id = e.target.id
             console.log(id);
             deleteFavorites(id)
             })
           })
        } catch (error) {
            const errorNode = document.querySelector('#error');
            errorNode.innerText = `Error: ${error.message}`;
        }
    }
    

    async function deleteFavorites(id) {
       const resDelete = await fetch (URL_API_DELETE_FAV(id),{
        method: 'DELETE'
       })
       const dataDelete = await resDelete.json();
       console.log(dataDelete);
       if (resDelete.status == 200) {
        Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: `Eliminado`
        })

        dogsFovurites(id);
       } else {
        Swal.fire({
            icon: 'error',
            title: 'Oopss',
            text: `No se ha podido eliminar` +id
            })
       }
    }
    // boton carga nuevas imagenes 
    btn_recarga.onclick = fetchData
    fetchData()