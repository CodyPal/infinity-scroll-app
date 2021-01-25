// Select the html elements
const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');
const proxyUrl = 'https://nameless-gorge-17603.herokuapp.com/';

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = '4EdafNrFOosKy7TU-ELAoJoTp6JRwWDR1O3E7FhJ8RU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


// Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
  
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
    // create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description
    });

    // Event listener, check when each photo is finished loading
    img.addEventListener('load', imageLoaded)

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}

// Get photos from unsplash api
async function getPhotos(){
    try{
        const response = await fetch(proxyUrl + apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){
        // catch any error
        console.log(error);
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){    
        getPhotos();
        ready = false;  
   }
})

// On Load
getPhotos();