import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { MovieRouterModule } from './movie-router.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { ContainerComponent } from './components/container/container.component';
import { TmdbContainerComponent } from './components/tmdb-container/tmdb-container.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MovieDialogComponent } from './components/movie-dialog/movie-dialog.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MovieRouterModule
  ],
  declarations: [
    ThumbnailComponent, 
    ContainerComponent, 
    TmdbContainerComponent, 
    WatchlistComponent, 
    MovieDialogComponent, 
    SearchComponent
  ],
  entryComponents: [
    MovieDialogComponent
  ],
  exports: [
    MovieRouterModule
  ],
  providers: [
    MovieService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthGuardService
  ]
})
export class MovieModule { }
