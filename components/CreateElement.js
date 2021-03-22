/*
   Function til at Create de elementer vi ønsker at bruge
   ========================================================================== */
function CreateElement({
  elmt = "div",
  content = "",
  src = "",
  className = "",
}) {
  /* Url til at hente billeder ned */

  const Imageurl = "https://image.tmdb.org/t/p/original/";

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

export default CreateElement;
