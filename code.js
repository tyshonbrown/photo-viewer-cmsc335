let imageArray = [];
let currentIndex = 0;
let isLocal = false;
let dataLoaded = false;
let startNum = 0;
let endNum = 0;
let slideShowInterval;

function loadImages() {

    // Get the start num of photo
    let folderName = document.getElementById('folder-name').value
    let commonName = document.getElementById('common-name').value;
    startNum = parseInt(document.getElementById('start-num').value);
    endNum = parseInt(document.getElementById('end-num').value);
    //let startNum = document.getElementById('start-num').value;

    if (folderName && commonName && !isNaN(startNum) && !isNaN(endNum) && startNum <= endNum) {
        
        // Filling the image array for iteration
        imageArray = [];
        for (let i = startNum; i <= endNum; i++) {
            imageArray.push(`${folderName}${commonName}${i}.jpg`);
        }
        isLocal = true;
        dataLoaded = true;
        currentIndex = 0;
        displayPhoto();

        let photoPath = `${folderName}${commonName}${startNum}.jpg`;
        document.getElementById('photo-name').value = photoPath;
        //document.getElementById('photo-name').innerText = `${folderName}${commonName}${startNum}.jpg`;
        document.getElementById('status-message').innerText = "Photo Viewer System";
        document.getElementById('status-message').style.color = "red";
    
    } else {
        document.getElementById('status-message').innerText = "Error: Invalid Range";
        document.getElementById('status-message').style.color = "red";
    }

}

async function loadJsonFile() {

    try {

        // Getting the url from input and fetching the data from it
        let jsonUrl = document.getElementById('json-url').value;
        let response = await fetch(jsonUrl);
        let data = await response.json();

        imageArray = data.images.map(img => img.imageURL);
        isLocal = false;
        dataLoaded = true;
        currentIndex = 0;
        displayPhoto();
        document.getElementById('photo-name').value = imageArray[currentIndex];

        document.getElementById('status-message').innerText = "Photo Viewer System";
        document.getElementById('status-message').style.color = "red";

    } catch (error) {
        alert("Failed to load JSON file.");
    }
}

function displayPhoto() {

    if (imageArray.length > 0) {
        document.getElementById('photo').src = imageArray[currentIndex];
        document.getElementById('photo-name').innerText = imageArray[currentIndex];
    
    }

}

function previousPhoto() {
    if (currentIndex > 0) {
        currentIndex--;
        displayPhoto();

    } else {
        currentIndex = imageArray.length - 1;
        displayPhoto();
    }
}

function nextPhoto() {
    if (dataLoaded && (currentIndex < imageArray.length - 1)) {
        currentIndex++;
        displayPhoto();

    } else if (dataLoaded) {
        currentIndex = 0;
        displayPhoto();

    } else {
        document.getElementById('status-message').innerText = "Error: you must load data first";
        document.getElementById('status-message').style.color = "red";
    }
}

function nextSlidePhoto() {

    if (currentIndex <= imageArray.length - 1) {
        displayPhoto();
        currentIndex++;
    }
}

function firstPhoto() {
    currentIndex = 0;
    displayPhoto();
}

function lastPhoto() {
    currentIndex = imageArray.length - 1;
    displayPhoto();
}

function startSlideShow() {
    if (dataLoaded) {
        stopSlideShow();
        currentIndex = 0;
        slideShowInterval = setInterval(() => {
        nextSlidePhoto()

        if (currentIndex > imageArray.length - 1) {
            currentIndex = 0;
        }
        }, 1000);
    } else {
        document.getElementById('status-message').innerText = "Error: you must load data first";
        document.getElementById('status-message').style.color = "red";
    }
}

function randomSlideShow() {
    if (dataLoaded) {
        stopSlideShow();
        slideShowInterval = setInterval(() => {

            currentIndex = Math.floor(Math.random() * imageArray.length);
            displayPhoto();

        }, 1000);
    } else {
        document.getElementById('status-message').innerText = "Error: you must load data first";
        document.getElementById('status-message').style.color = "red";
    }
}

function stopSlideShow() {
    clearInterval(slideShowInterval);
}

function reset() {
    let isLocal = false;
    let dataLoaded = false;
}