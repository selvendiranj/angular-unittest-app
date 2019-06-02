import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie'
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movie-tmdb-container',
  template: `<movie-container [movies]="movies" [isWatchlist]="isWatchlist"></movie-container>`,
  styles: []
})
export class TmdbContainerComponent implements OnInit {

  movies: Array<Movie>;
  movieType: string;
  isWatchlist: boolean;

  constructor(private movieService: MovieService, private route: ActivatedRoute) {
    this.movies = [];
    this.route.data.subscribe((data) => {
      this.movieType = data.movieType;
    });
    this.isWatchlist = false;
  }

  ngOnInit() {
    this.movieService.getMovies(this.movieType).subscribe((movies) => {
      this.movies.push(...movies);
    });
  }

}
