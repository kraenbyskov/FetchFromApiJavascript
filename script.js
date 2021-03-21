const Key = `7c105b21789fdf773ab798b1c284f40e`;
const category = `popular`;
const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${Key}`;

const Root = document.getElementById("Root");
const Imageurl = "https://image.tmdb.org/t/p/original/";

function CreateElement({
  elmt = "div",
  content = "",
  src = "",
  className = "",
}) {
  let CreateElmt = document.createElement(elmt);
  if (elmt === "img") {
    CreateElmt.src = Imageurl + src;
  }
  CreateElmt.innerHTML = content;
  CreateElmt.classList.add(className);
  return CreateElmt;
}

const fetchMyData = new Promise((resolve, reject) => {
  fetch(url)
    .then((response) => response.json())
    .then((result) => resolve(result.results))
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

fetchMyData
  .then((Data) => {
    for (i = 0; i < Data.length; i++) {
      const Card = CreateElement({
        className: "Card",
      });
      Root.appendChild(Card);
      const Title = CreateElement({
        elmt: "h4",
        content: Data[i].title,
        className: "Card_Title",
      });
      const Poster = CreateElement({
        elmt: "img",
        src: Data[i].poster_path,
        className: "Card_poster",
      });
      const Rating = CreateElement({
        elmt: "p",
        content: "Rating " + Data[i].vote_average,
        className: "Card_poster",
      });
      Card.appendChild(Poster);
      Card.appendChild(Title);
      Card.appendChild(Rating);
    }
  })
  .catch((error) => {
    console.log("error");
    const Error = CreateElement({
      elmt: "h4",
      content: error,
      className: "Card_Title",
    });
    Root.appendChild(Error);
  });
