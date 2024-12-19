import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("./App"));
const Home = lazy(() => import("./Pages/Home/Home"));
const Movies = lazy(() => import("./Pages/Movies/Movies"));
const Favorites = lazy(() => import("./Pages/Favorites/Favorites"));
const Library = lazy(() => import("./Pages/Library/Library"));
const SingleMovie = lazy(() => import("./Pages/SingleMovie/SingleMovie"));
const TVShows = lazy(() => import("./Pages/TVShows/TVShows"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage/ErrorPage"));
const WatchPage = lazy(() => import("./Pages/WatchPage/WatchPage"));

import {
  AiringToday,
  MovieCredits,
  MovieDetails,
  MovieImages,
  NowPlaying,
  Popular,
  SimilarMovies,
  TopRated,
  Trending,
  Upcoming,
  WatchTrailer,
  fetchBookmarks,
  fetchFavorites,
  fetchGenres,
  fetchSingleGenreMovies,
} from "./Data/Data";
import GenreMovies from "./Pages/GenreMovies/GenreMovies";
import Loading from "./components/Loading/Loading";

async function DataLoader() {
  try {
    const [
      popularMovies,
      topRatedMovies,
      nowPlaying,
      trending,
      upcoming,
      popularShows,
      topRatedShows,
      airingToday,
    ] = await Promise.all([
      Popular("movie"),
      TopRated("movie"),
      NowPlaying(),
      Trending(),
      Upcoming(),
      Popular("tv"),
      TopRated("tv"),
      AiringToday(),
    ]);

    return {
      popularMovies,
      topRatedMovies,
      nowPlaying,
      trending,
      upcoming,
      popularShows,
      topRatedShows,
      airingToday,
    };
  } catch {
    return null;
  }
}

async function SingleMovieLoader({ params }) {
  try {
    const [movieDetails, movieImages, similarMovies, cast] = await Promise.all([
      MovieDetails(params.mediaType, params.id),
      MovieImages(params.mediaType, params.id),
      SimilarMovies(params.mediaType, params.id),
      MovieCredits(params.mediaType, params.id),
    ]);

    return {
      movieDetails,
      movieImages,
      similarMovies,
      cast,
    };
  } catch {
    return null;
  }
}

async function SingleGenreMoviesLoader({ params }) {
  try {
    let genres = await fetchGenres(params.mediaType);

    let genre = genres.find(
      (genre) => genre.name.toLowerCase() == params.genre.toLowerCase()
    );

    const genreId = genre.id;

    return await fetchSingleGenreMovies(genreId, params.mediaType);
  } catch {
    return null;
  }
}

async function WatchPageLoader({ params }) {
  try {
    return WatchTrailer(params.mediaType, params.id);
  } catch (error) {
    return error;
  }
}

async function favoritesLoader() {
  const data = await fetchFavorites();

  if (data.length > 0) {
    return data;
  }
  return null;
}

async function LibLoader() {
  const favData = await fetchFavorites();
  const bookmarkData = await fetchBookmarks();

  const data = { favData, bookmarkData };

  return data;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
    loader: DataLoader,
    errorElement: (
      <Suspense fallback={<Loading />}>
        <ErrorPage />
      </Suspense>
    ),
    id: "root",

    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "movies",
        element: (
          <Suspense fallback={<Loading />}>
            <Movies />
          </Suspense>
        ),
      },
      {
        path: "tv",
        element: (
          <Suspense fallback={<Loading />}>
            <TVShows />
          </Suspense>
        ),
      },
      {
        path: "favorites",
        element: (
          <Suspense fallback={<Loading />}>
            <Favorites />
          </Suspense>
        ),
        loader: favoritesLoader,
      },
      {
        path: "library",
        element: (
          <Suspense fallback={<Loading />}>
            <Library />
          </Suspense>
        ),
        loader: LibLoader,
      },
      {
        path: "/:mediaType/:id",
        loader: SingleMovieLoader,
        element: (
          <Suspense fallback={<Loading />}>
            <SingleMovie />
          </Suspense>
        ),
      },
      {
        path: "/:mediaType/all/:genre",
        element: (
          <Suspense fallback={<Loading />}>
            <GenreMovies />
          </Suspense>
        ),
        loader: SingleGenreMoviesLoader,
      },
      {
        path: "/watch/:mediaType/:title/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <WatchPage />
          </Suspense>
        ),
        loader: WatchPageLoader,
      },
    ],
  },
]);
