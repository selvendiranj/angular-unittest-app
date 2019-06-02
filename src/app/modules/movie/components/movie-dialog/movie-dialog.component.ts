import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'movie-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: [ './movie-dialog.component.css' ]
})
export class MovieDialogComponent implements OnInit {

  movie: Movie;
  comments: string;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<MovieDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: any, private movieService: MovieService, private snackBar: MatSnackBar) { 
      this.movie = data.movie;
      this.comments = data.movie.overview;
  }

  ngOnInit() {
  }

  updateMovie() {
    this.movie.overview = this.comments;
    this.dialogRef.close(this.movie);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
