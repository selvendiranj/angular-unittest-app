import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'movie-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies: Array<Movie>;

  constructor(private movieService: MovieService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.movies = [];
  }

  searchMovies(searchValue: string) {
    this.movies = [];
    let message = 'No Movies found with search value.';
    this.movieService.searchMovies(searchValue).subscribe((movies) => {
      if(movies.length == 0) {
        this.snackBar.open(message, '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
      }
      this.movies.push(...movies);
    });
  }

}
