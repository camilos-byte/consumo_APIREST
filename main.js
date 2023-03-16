console.log('CARGA COMPLETA');

const URLAPI = 'https://dog.ceo/api/breeds/image/random';

/* fetch(url)
    .then(response => response.json())
    .then( data => {
            const img = document.querySelector('img');
            img.src = data[0].url;
            
          }) */

async function miCat() {
    const resp = await fetch(URLAPI);
    const data = await resp.json();
    const img = document.querySelector('img');
    img.src = data.message
}

const mybutton = document.querySelector("button");
mybutton.onclick = miCat;