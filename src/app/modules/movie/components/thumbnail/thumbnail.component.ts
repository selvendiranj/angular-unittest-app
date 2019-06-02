import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie';


@Component({
  selector: 'movie-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {

  @Input()
  movie: Movie;
  @Input()
  isWatchlist: boolean;

  @Output()
  addMovie = new EventEmitter<Movie>();

  @Output()
  deleteMovie = new EventEmitter<Movie>();

  @Output()
  updateMovie = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit() {
  }

  addMovieToWatchlist() {
    this.addMovie.emit(this.movie);
  }

  updateMovieFromWatchlist() {
    this.updateMovie.emit(this.movie);
    
  }

  deleteMovieFromWatchlist() {
    this.deleteMovie.emit(this.movie);
  }

}
