const createCard = ({ title, href, img }) => `
  <div class="card">
    <img src="${img}" class="card-img-top"  alt="${img}" />

    <div class="card ">
      <h5>${title}</h5>
      <a href="http://www.rifftrax.com/${href}" class="btn btn-primary" target="_blank"> Check it out </a>
    </div>
  </div>
`;

fetch("movies.json")
  .then((response) => response.json())
  .then((movies) => {
    movies.sort((a, b) => a.title.localeCompare(b.title));

    const cards = document.querySelector("#cards");
    const elRow = document.createElement("div");
    elRow.className = "row";
    cards.appendChild(elRow);

    const updateMovies = (movies) => {
      elRow.innerHTML = movies
        .map((card) => `<div class="col-6 col-lg-3">${card}</div>`)
        .join("");
    };

    updateMovies(movies.map((movie) => createCard(movie)));

    const search = document.querySelector(".search");
    search.addEventListener("keyup", (evt) => {
      const text = evt.target.value.toLowerCase();
      updateMovies(
        movies
          .filter(({ title }) => title.toLowerCase().includes(text))
          .map((movie) => createCard(movie))
      );
    });
  });
