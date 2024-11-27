document.addEventListener('DOMContentLoaded', function () {
    const apodContent = document.getElementById('apod-content');

    fetch('https://api.nasa.gov/planetary/apod?api_key=74NyTSOU9GD9sG8jbUf5Ubah2jNddCj9CTvNRBpz')
        .then(response => response.json())
        .then(data => {
            const title = document.createElement('h2');
            title.textContent = data.title;

            const date = document.createElement('h2');
            date.textContent = `Date: ${data.date}`;

            const explanation = document.createElement('p');
            explanation.textContent = data.explanation;

            const image = document.createElement('img');
            image.src = data.url;
            image.alt = data.title;

            apodContent.appendChild(title);
            apodContent.appendChild(date);
            apodContent.appendChild(image);
            apodContent.appendChild(explanation);
        })
        .catch(error => {
            console.error('Error fetching APOD data:', error);
            apodContent.textContent = 'Error fetching APOD data. Please try again later.';
        });
});
