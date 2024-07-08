



document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const fetchedDataDiv = document.getElementById('fetched-data');
    const clearBtn = document.getElementById('clear-btn');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            fetchData(query);
        } else {
            fetchedDataDiv.innerHTML = '<p>Enter Valid Query</p>';
        }
    });

    clearBtn.addEventListener('click', function () {
        fetchedDataDiv.innerHTML = '<p>Enter Valid Query</p>';
    });

    function fetchData(query) {
        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                fetchedDataDiv.innerHTML = '';  // Clear previous results
                let found = false;

                // Search in countries
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(query) || country.name.toLowerCase().includes(query)) {
                            const card = createCard(city.name, city.imageUrl, city.description);
                            fetchedDataDiv.appendChild(card);
                            found = true;
                        }
                    });
                });

                // Search in temples
                data.temples.forEach(temple => {
                    if (temple.name.toLowerCase().includes(query)) {
                        const card = createCard(temple.name, temple.imageUrl, temple.description);
                        fetchedDataDiv.appendChild(card);
                        found = true;
                    }
                });

                // Search in beaches
                data.beaches.forEach(beach => {
                    if (beach.name.toLowerCase().includes(query)) {
                        const card = createCard(beach.name, beach.imageUrl, beach.description);
                        fetchedDataDiv.appendChild(card);
                        found = true;
                    }
                });

                if (!found) {
                    fetchedDataDiv.innerHTML = '<p>No results found</p>';
                }
            })
            .catch(error => console.error('Error fetching the JSON data:', error));
    }

    function createCard(title, imageUrl, description) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-4';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card border-dark mb-3';
        cardDiv.style.width='35em';
       

        const img = document.createElement('img');
        img.className = 'card-img-top';
        const cacheBustedUrl = `${imageUrl}?t=${new Date().getTime()}`;
        img.src = cacheBustedUrl;
        img.alt = title;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = title;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = description;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
        
        return colDiv;
    }
});
