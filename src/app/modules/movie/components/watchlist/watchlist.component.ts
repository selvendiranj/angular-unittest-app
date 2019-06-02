import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie'
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'movie-watchlist',
  template: `<movie-container [movies]="movies" [isWatchlist]="isWatchlist"></movie-container>`,
  styles: []
})
export class WatchlistComponent implements OnInit {

  movies: Array<Movie>;
  isWatchlist: boolean;

  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar
  ) {
    this.movies = [];
    this.isWatchlist = true;
  }

  ngOnInit() {
    this.getMovieWatchlist();
  }

  getMovieWatchlist() {
    let message = `No movies found in Watchlist`;
    this.movieService.getWatchlistedMovies().subscribe((movies) => {
      if(movies.length == 0) {
        this.snackBar.open(message, '', {
          duration: 1000,
          panelClass: ['green-snackbar']
        });
      }
      this.movies.push(...movies);
    });
  }
}
