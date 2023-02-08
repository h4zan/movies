import axios from "axios";
import { createHTML } from "../main";
import { IMovie } from "../models/IMovie";
import { IMovieExtended } from "../models/IMovieExtended";
import { IOmdbResponse } from "../models/IOmdbResponse";

export async function searchMovies(
  searchText: string,
  page: number
): Promise<IMovie[]> {
  let response = await axios.get<IOmdbResponse>(
    `http://omdbapi.com?apikey=${process.env.APIKEY}&s=${searchText}&page=
    ` + page
  );
  let movies = response.data.Search;
  createHTML(movies);
  console.log(response.data);

 
  return movies;
}
