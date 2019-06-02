import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from '../../components/movie-dialog/movie-dialog.component';

@Component({
  selector: 'movie-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @Input()
  movies: Array<Movie>;
  @Input()
  isWatchlist: boolean;

  constructor(private movieService: MovieService, private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  addMovieToWatchlist(movie: Movie) {
    let message = `${movie.title} added to Watchlist`;
    this.movieService.addMovieToWatchlist(movie).subscribe((movie) => {
      this.snackBar.open(message, '', {
        duration: 1000,
        panelClass: ['green-snackbar']
      });
    },
    (errorMsg) => {
      this.snackBar.open(errorMsg, '', {
        duration: 1000,
        panelClass: ['red-snackbar']
      });
    });
  }

  updateMovieFromWatchlist(movie: Movie) {
    let dialogRef = this.dialog.open(MovieDialogComponent, {
      width: '500px',
      data: {movie: movie}
    });
    dialogRef.afterClosed().subscribe((formMovie) => {
      if(formMovie != null) {
        let message = `${formMovie.title} updated successfully`;
        this.movieService.updateMovieFromWatchlist(formMovie).subscribe((resMovie) => {
          this.snackBar.open(message, '', {
            duration: 1000,
            panelClass: ['green-snackbar']
          });
        },
        (errorMsg) => {
          this.snackBar.open(errorMsg, '', {
            duration: 1000,
            panelClass: ['red-snackbar']
          });
        });
      }
    });
  }

  deleteMovieFromWatchlist(movie: Movie) {
    let message = `${movie.title} deleted from Watchlist`;
    this.movieService.deleteMovieFromWatchlist(movie).subscribe((successMsg) => {
      this.snackBar.open(message, '', {
        duration: 1000,
        panelClass: ['green-snackbar']
      });
      this.movies = this.movies.filter(function( obj ) {
        return obj.id !== movie.id;
      });
    },
    (errorMsg) => {
      this.snackBar.open(errorMsg, '', {
        duration: 1000,
        panelClass: ['red-snackbar']
      });
    });
  }

}
