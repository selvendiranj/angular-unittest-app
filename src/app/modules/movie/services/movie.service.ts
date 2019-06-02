import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Movie } from '../models/movie';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';

@Injectable()
export class MovieService {

    tmdbUri: string;
    tmdbSearchUri: string;
    apiKey: string;
    imgPrefix: string;
    movieBackendUri: string;

    constructor(private http: HttpClient) {
        this.tmdbUri = 'https://api.themoviedb.org/3/movie/';
        this.tmdbSearchUri = 'https://api.themoviedb.org/3/search/movie';
        this.apiKey = '96944a598f72b9ed0f97e80af4bf4187';
        this.imgPrefix = 'https://image.tmdb.org/t/p/w500';
        this.movieBackendUri = 'http://localhost:8084/api/v1/movies';
    }

    getMovies(movieType: string, page: number = 1): Observable<Array<Movie>> {
        const endpoint = `${this.tmdbUri}${movieType}?api_key=${this.apiKey}&page=${page}`;
        return this.http.get(endpoint).pipe(
            retry(3),
            map(this.getMovieResults),
            map(this.transformPosterPath.bind(this))
        );
    }

    searchMovies(searchValue: string, page: number = 1): Observable<Array<Movie>> {
        const endpoint = `${this.tmdbSearchUri}?api_key=${this.apiKey}&query=${searchValue}&page=${page}`;
        console.log(endpoint);
        return this.http.get(endpoint).pipe(
            retry(3),
            map(this.getMovieResults),
            map(this.transformPosterPath.bind(this))
        );
    }

    getMovieResults(response) {
        return response['results'];
    }

    transformPosterPath(movies): Array<Movie> {
        return movies.map((movie) => {
            movie.poster_path = `${this.imgPrefix}${movie.poster_path}`;
            return movie;
        })
    }

    getWatchlistedMovies(): Observable<Array<Movie>> {
        return this.http.get<Array<Movie>>(this.movieBackendUri);
    }

    addMovieToWatchlist(movie: Movie): Observable<Movie> {
        return this.http.post<Movie>(this.movieBackendUri, movie).pipe(catchError(this.handleError));
    }

    updateMovieFromWatchlist(movie: Movie): Observable<Movie> {
        const endpoint = `${this.movieBackendUri}/${movie.id}`;
        return this.http.put<Movie>(endpoint, movie).pipe(catchError(this.handleError));
    }

    deleteMovieFromWatchlist(movie: Movie): Observable<string> {
        const endpoint = `${this.movieBackendUri}/${movie.id}`;
        return this.http.delete(endpoint, { responseType: 'text' }).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error != null) {
            if (error.error.message == undefined) {
                error.error = JSON.parse(error.error)
                errorMessage = `${error.error.message}`;
            } else {
                errorMessage = `${error.error.message}`;
            }
        } else {
            errorMessage = `${error.message}`;
        }
        return Observable.throw(errorMessage);
    }

}
