const menuIcon = document.querySelector(".fa");
let buttons = document.querySelectorAll("button");
buttons = Array.from(buttons);
const menu = document.querySelector("ul");

const overview = document.getElementById("overview");
const structure = document.getElementById("internal-structure");
const surface = document.getElementById("surface-geology");
const content = document.getElementById("content");
const source = document.getElementById("source");
const heroImg = document.getElementById("planet-image");

// Toggle menu icon
menuIcon.addEventListener("click", () => {
  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
    menu.classList.add("active");
  } else {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
    menu.classList.remove("active");
  }
});

// Array of routes
const routes = [
  "index.html",
  "venus.html",
  "earth.html",
  "mars.html",
  "jupiter.html",
  "saturn.html",
  "uranus.html",
  "neptune.html",
];

// Load JSON data
const getURL = (url) => {
  url = window.location.href;
  if (url.includes("routes")) {
    url = url.split("routes/")[0];
    return url;
  }

  if (url.includes("index.html")) {
    url = url.split("index.html")[0];
    return url;
  }

  if (!url.includes("routes") && !url.includes("index.html")) {
    return url;
  }
};

const port = `${getURL()}data.json`;

const getData = async () => {
  try {
    const response = await fetch(port);
    const jsonResponse = await response.json();
    return jsonResponse[currentRouteIndex];
  } catch (error) {
    console.log(error);
  }
};

const getCurrentRoute = () => {
  let currentRoute = window.location.href;
  if (currentRoute.includes("routes/")) {
    return currentRoute.split("routes/")[1];
  } else {
    return "index.html";
  }
};

const currentRouteIndex = routes.indexOf(getCurrentRoute());

//Button active states and dynamic rendering of
// text, links and images
overview.addEventListener("click", () => {
  if (structure.classList.contains("active"))
    structure.classList.remove("active");

  if (surface.classList.contains("active")) surface.classList.remove("active");

  overview.classList.add("active");

  getData().then((response) => {
    content.innerHTML = response.overview.content;
    source.href = response.overview.source;

    if (routes[currentRouteIndex] === "index.html") {
      heroImg.src = response.images.planet;
    } else {
      heroImg.src = `.${response.images.planet}`;
    }
  });
});

structure.addEventListener("click", () => {
  if (overview.classList.contains("active"))
    overview.classList.remove("active");

  if (surface.classList.contains("active")) surface.classList.remove("active");

  structure.classList.add("active");

  getData().then((response) => {
    content.innerHTML = response.structure.content;
    source.href = response.structure.source;

    if (routes[currentRouteIndex] === "index.html") {
      heroImg.src = response.images.internal;
    } else {
      heroImg.src = `.${response.images.internal}`;
    }
  });
});

surface.addEventListener("click", () => {
  if (structure.classList.contains("active"))
    structure.classList.remove("active");

  if (overview.classList.contains("active"))
    overview.classList.remove("active");

  surface.classList.add("active");

  getData().then((response) => {
    content.innerHTML = response.geology.content;
    source.href = response.geology.source;

    if (routes[currentRouteIndex] === "index.html") {
      heroImg.src = response.images.geology;
    } else {
      heroImg.src = `.${response.images.geology}`;
    }
  });
});
