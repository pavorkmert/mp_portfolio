// src/portfolio.ts

import { Comic } from './types';

document.addEventListener("DOMContentLoaded", function () {
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
            console.log("Received comic ID:", data);
            const comicId = data.trim();
            const comicUrl = `https://fwd.innopolis.university/api/comic?id=${comicId}`;

            return fetch(comicUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json() as Promise<Comic>;
        })
        .then(comic => {
            console.log("Received comic data:", comic);

            const comicCont = document.getElementById("comic-container") as HTMLElement;
            const name = document.createElement("h2");
            const image = document.createElement("img");
            const date = document.createElement("p");
            image.src = comic.img;
            image.alt = comic.alt;

            name.textContent = comic.safe_title;

            const year = parseInt(comic.year, 10);
            const month = parseInt(comic.month, 10) - 1; // JavaScript months are 0-based
            const day = parseInt(comic.day, 10);

            const publishedDate = new Date(year, month, day);
            date.textContent = `${formatDate(publishedDate)} (${timeFromNow(publishedDate)})`;
            comicCont.appendChild(name);
            comicCont.appendChild(image);
            comicCont.appendChild(date);

            console.log("Image src:", image.src);
            console.log("Image alt:", image.alt);
            console.log("Title:", name.textContent);
            console.log("Date:", date.textContent);
        })
        .catch(error => {
            console.error("Error fetching comic:", error);
            document.getElementById("comic")!.innerHTML = `<p>Error loading comic: ${error.message}</p>`;
        });
});

function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
}

function timeFromNow(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return years + (years === 1 ? ' year ago' : ' years ago');
    } else if (months > 0) {
        return months + (months === 1 ? ' month ago' : ' months ago');
    } else if (days > 0) {
        return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (hours > 0) {
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (minutes > 0) {
        return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else {
        return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
    }
}
