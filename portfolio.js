// script.js

document.addEventListener("DOMContentLoaded", function() {
    const email = "ma.petrov@innopolis.university"; 
    const urlParams = new URLSearchParams({ email });
    const comicIdUrl = `https://fwd.innopolis.university/api/hw2?${urlParams.toString()}`;

    fetch(comicIdUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log("Received comic ID:", data);  // Добавляем логирование для отладки
            const comicId = data.trim();
            const comicUrl = `https://fwd.innopolis.university/api/comic?id=${comicId}`;
            
            return fetch(comicUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(comic => {
            console.log("Received comic data:", comic);  // Добавляем логирование для отладки

            const comicCont = document.getElementById("comic-container");
            const name = document.createElement("h2")
            const image = document.createElement("img")
            const date = document.createElement("p")
            image.src = comic.img
            image.alt = comic.alt

            name.textContent = comic.safe_title



            const publishedDate = new Date(comic.year, comic.month - 1, comic.day);
            date.textContent = publishedDate.toLocaleDateString();
            comicCont.appendChild(name)
            comicCont.appendChild(image)
            comicCont.appendChild(date)

            // Дополнительное логирование для проверки данных
            console.log("Image src:", image.src);
            console.log("Image alt:", image.alt);
            console.log("Title:", name.textContent);
            console.log("Date:", date.textContent);
        })
        .catch(error => {
            console.error("Error fetching comic:", error);
            document.getElementById("comic").innerHTML = `<p>Error loading comic: ${error.message}</p>`;
        });
});
