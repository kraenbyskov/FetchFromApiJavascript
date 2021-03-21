/* ==========================================================================
   Variables
   ========================================================================== */
/* Key til APIen */
const Key = `7c105b21789fdf773ab798b1c284f40e`;
/* Kategori for hvad vi ønsker at hente */
const category = `popular`;
/* Url */
const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${Key}`;

/* Roden af hjemmesiden */
const Root = document.getElementById("Root");
/* Url til at hente billeder ned */
const Imageurl = "https://image.tmdb.org/t/p/original/";

/*
   Function til at Create de elementer vi ønsker at bruge
   ========================================================================== */
function CreateElement({
  elmt = "div",
  content = "",
  src = "",
  className = "",
}) {
  /* Laver vores Element */
  let CreateElmt = document.createElement(elmt);
  /* Hvis det er et Image element tilføjes en source */
  if (elmt === "img") {
    CreateElmt.src = Imageurl + src;
  }
  /* Tilføjer vores indhold */
  CreateElmt.innerHTML = content;
  /* Giver vores element en class */
  CreateElmt.classList.add(className);

  return CreateElmt;
}

/*
   Fetcher vores data fra api som et Promise
   ========================================================================== */
const fetchMyData = new Promise((resolve, reject) => {
  fetch(url)
    .then((response) => response.json())
    .then((result) => resolve(result.results))
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

/* Køre vores Promise  */
fetchMyData
  /* Hvis resolve køre vi det her */
  .then((Data) => {
    /* Mapper igennem vores Array og creater vores indhold */
    for (i = 0; i < Data.length; i++) {
      const Card = CreateElement({
        className: "Card",
      });
      /* Tilføjre vores Card til Root */
      Root.appendChild(Card);

      /* Opretter titlen på film */
      const Title = CreateElement({
        elmt: "h4",
        content: Data[i].title,
        className: "Card_Title",
      });

      /* Opretter Poster på film */
      const Poster = CreateElement({
        elmt: "img",
        src: Data[i].poster_path,
        className: "Card_poster",
      });

      /* Opretter Rating på film */
      const Rating = CreateElement({
        elmt: "p",
        content: "Rating " + Data[i].vote_average,
        className: "Card_poster",
      });
      /* Tilføjer vores content til Card div */
      Card.appendChild(Poster);
      Card.appendChild(Title);
      Card.appendChild(Rating);
    }
  })
  /* Hvis fejl bliver den her kørt */
  .catch((error) => {
    const Error = CreateElement({
      elmt: "h4",
      content: error,
      className: "Card_Title",
    });
    Root.appendChild(Error);
  });
