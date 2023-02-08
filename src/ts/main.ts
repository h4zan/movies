import { IMovie } from "./models/IMovie";
import { IMovieExtended } from "./models/IMovieExtended";
import { searchMovies } from "./services/movieServices";

window.addEventListener("load", () => {
  disablePreviousButton();
  nextPage();
  previousPage();
  clearAll();

});

const mainContainer = document.createElement("div") as HTMLDivElement;

const mainText = document.createElement("div") as HTMLDivElement;
const mainImgWrapper= document.createElement("div") as HTMLDivElement;
const mainImg = document.createElement("img") as HTMLImageElement;
const mainTitle = document.createElement("h1") as HTMLHeadingElement;
const searchForm = document.createElement("form") as HTMLFormElement;
const searchText = document.createElement("input") as HTMLInputElement;
const buttonWrapper = document.createElement("div") as HTMLDivElement;
const searchButton = document.createElement("button") as HTMLButtonElement;
const removeButton = document.createElement("button") as HTMLButtonElement;
const searchWrapper = document.createElement("div") as HTMLDivElement;
const searchResult = document.createElement("div") as HTMLDivElement;
const cardWrapper=document.createElement("div") as HTMLDivElement;


const previousButton = document.createElement("button") as HTMLButtonElement;
const nextButton = document.createElement("button") as HTMLButtonElement;

searchWrapper.classList.add("main");
mainText.classList.add("main__text");
mainTitle.classList.add("main__title");
searchForm.classList.add("main__form");
searchText.classList.add("main__form__text");
searchText.type = "text";
searchText.placeholder = "Search a movie title";
searchButton.classList.add("main__form__search-btn");
buttonWrapper.classList.add("search-result__button-wrapper");
removeButton.classList.add("main__form__remove-btn");
removeButton.type="reset";
mainContainer.classList.add("mainContainer");
mainImg.alt = "Illustration of a movie showing in a cinema";
mainImg.src ="https://i.postimg.cc/HsZ0Qf40/pexels-tima-miroshnichenko-7991579.jpg"
 

//"https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg";

mainImg.classList.add("main__bg__img");
mainImgWrapper.classList.add("main__bg")

mainTitle.innerHTML = "Cineaste";
searchButton.innerHTML = "Search";
removeButton.innerHTML = "Clear";

searchResult.classList.add("search-result");
cardWrapper.classList.add("cards");
previousButton.classList.add("search-result__previous-btn");
nextButton.classList.add("search-result__next-btn");

document.body.appendChild(mainContainer);
mainContainer.appendChild(mainImgWrapper)
mainImgWrapper.appendChild(mainImg)
//mainContainer.appendChild(mainImg);
mainContainer.appendChild(searchWrapper);
mainContainer.appendChild(searchResult);
searchWrapper.appendChild(mainTitle);
searchForm.appendChild(searchText);
searchForm.appendChild(searchButton);
searchForm.appendChild(removeButton);
searchWrapper.appendChild(searchForm);



////////////////////
searchText.value = "";

let currentpage: number = 1;

let detail= searchText.value;

let searchTexts = searchText.value;



export function getMovies(page: number) {
  searchForm.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();

    let searchTexts = searchText.value;

    let movies: IMovie[] = await searchMovies(searchTexts, currentpage);

    movies.sort((a:IMovie, b:IMovie)=>{
         if (+a.Year <+b.Year) return 1;
      if (+a.Year > +b.Year) return -1;
      return 0;
    })
    createHTML(movies);
    scrollToMovieSection();

  });

}

export function createHTML(movies: IMovie[]) {
  searchResult.innerHTML = "";
  
  for (let i = 0; i < movies.length; i++) {
    let searchResultWrapper = document.createElement("div");
    searchResultWrapper.classList.add("search-result__wrapper");
    let movieTitle = document.createElement("h3");
    movieTitle.classList.add("search-result__movie-title");
    movieTitle.innerHTML = movies[i].Title;
    searchResult.appendChild(movieTitle);
    let poster=document.createElement("div");

    let posterImg = document.createElement("img");
   /// poster.src = movies[i].Poster;
    poster.classList.add("search-result__movie-poster");
    posterImg.classList.add("search-result__movie-poster__img");

    if(movies[i].Poster === "N/A"){
      posterImg.alt = "Movie Poster not Found, Picture of Theater Curtains as Placeholder";
      posterImg.src="https://cdn.pixabay.com/photo/2014/11/30/17/15/theater-551797_1280.jpg";
     
    }else{
      posterImg.src = movies[i].Poster;
     
    }
    searchResult.appendChild(searchResultWrapper);

    searchResultWrapper.appendChild(movieTitle);
    searchResultWrapper.appendChild(poster);
    poster.appendChild(posterImg)
    searchResult.appendChild(buttonWrapper);
    buttonWrapper.appendChild(previousButton);
    buttonWrapper.appendChild(nextButton);


  }

  
 getMovies(currentpage);
}

export function scrollToMovieSection(){

  let movieSection: HTMLHeadingElement = document.querySelector(
    ".search-result"
  ) as HTMLHeadingElement;
  movieSection.scrollIntoView();

}

export function disablePreviousButton() {
  if (currentpage === 1) {
    previousButton.setAttribute("disabled", "true");
    previousButton.style.display="none";

  } else {
    previousButton.removeAttribute("disabled");
    previousButton.style.display="block";

  }
  getMovies(currentpage);

}

export function nextPage() {
  nextButton.addEventListener("click", async () => {
    currentpage++;
    disablePreviousButton();

    let movies: IMovie[] = await searchMovies(searchText.value, currentpage);
    
    createHTML(movies);
    getMovies(currentpage);
    scrollToMovieSection();
    clearAll();

  });
}

export function previousPage() {
  previousButton.addEventListener("click", async() => {
    if (currentpage === 1) {
      disablePreviousButton();

    } else {
      currentpage--;
      
      scrollToMovieSection();
      getMovies(currentpage);
      let movies: IMovie[] = await searchMovies(searchText.value, currentpage);
      createHTML(movies);
      nextPage();
      disablePreviousButton();


    }

  });
}

export function clearAll() {
  removeButton.addEventListener("click",  ()=> {
  currentpage=1;
  searchResult.innerHTML = "";
  

  });

}
