//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image: ${url}`);
    });
}
function downloadImages() {
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    
    loadingDiv.style.display = 'block';
    errorDiv.innerHTML = '';
    output.innerHTML = '';
    
    const imagePromises = images.map(image => downloadImage(image.url));
    
    Promise.all(imagePromises)
        .then(images => {
            images.forEach(img => output.appendChild(img));
            loadingDiv.style.display = 'none';
        })
        .catch(error => {
            errorDiv.innerHTML = error;
            loadingDiv.style.display = 'none';
        });
}

btn.addEventListener("click", downloadImages);