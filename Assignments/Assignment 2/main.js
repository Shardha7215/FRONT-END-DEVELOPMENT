const gif_container = document.getElementById("gif-container");
const searchGifBox = document.querySelector("#search_gif");
const submit = document.querySelector("#submit_search");

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    await search_data(searchGifBox.value);
});

document.getElementById('trending').addEventListener('click', async () => {
    await trending_data();
});

document.getElementById('search').addEventListener('click', async () => {
    await search_data('animals');
});

document.getElementById('emoji').addEventListener('click', async () => {
    await emoji_data();
});

const api_key = "tod4to7L1tkCbruT8wPCgKMxRzDrP58b";
const search_api = "https://api.giphy.com/v1/gifs/search";
const trending_api = 'https://api.giphy.com/v1/gifs/trending';
const emoji_api = "https://api.giphy.com/v1/gifs/emoji";

const loader = document.createElement('h1');
loader.appendChild(document.createTextNode("Loading..."));
loader.style.color = "white";

const dataNotFound = document.createElement('h1');
dataNotFound.appendChild(document.createTextNode("Result not found !!"));
dataNotFound.style.color = "white";

function display_data(data) {
    gif_container.innerHTML = '';

    if (data.length === 0) {
        gif_container.appendChild(dataNotFound);
        return;
    }

    data.forEach((item) => {
        const gif_image = item.images.fixed_height;
        createGifDiv(gif_image);
    });
}

function createGifDiv({ url, height, width }) {
    const newDiv = document.createElement("div");
    const newImg = document.createElement("img");
    newImg.src = url;
    newImg.height = height;
    newImg.width = width;
    newDiv.appendChild(newImg);
    newDiv.classList.add("gif");

    const svg_div = document.createElement('div');
    svg_div.style.width = 'fit-content';

    svg_div.innerHTML = `
        <svg class='svg' width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

    svg_div.style.cursor = 'pointer';
    newDiv.appendChild(svg_div);
    gif_container.appendChild(newDiv);
}

async function search_data(search_parameter) {
    try {
        searchGifBox.value = search_parameter;
        gif_container.appendChild(loader);

        const response = await fetch(`${search_api}?api_key=${api_key}&q=${search_parameter}`);
        const json_data = await response.json();
        const data = json_data.data;
        display_data(data);
    } catch (error) {
        alert(error);
    } finally {
        gif_container.removeChild(loader);
    }
}

async function trending_data() {
    try {
        searchGifBox.value = "";
        gif_container.appendChild(loader);

        const response = await fetch(`${trending_api}?api_key=${api_key}`);
        const json_data = await response.json();
        const data = json_data.data;
        display_data(data);
    } catch (error) {
        alert(error);
    } finally {
        gif_container.removeChild(loader);
    }
}

async function emoji_data() {
    try {
        searchGifBox.value = "";
        gif_container.appendChild(loader);

        const response = await fetch(`${emoji_api}?api_key=${api_key}`);
        const json_data = await response.json();
        const data = json_data.data;
        display_data(data);
    } catch (error) {
        alert(error);
    } finally {
        gif_container.removeChild(loader);
    }
}
