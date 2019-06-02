import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TmdbContainerComponent } from './components/tmdb-container/tmdb-container.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuardService } from './services/auth-guard.service';

const movieRoutes: Routes = [
    {
        path: 'movies',
        children: [
            {
                path: '',
                redirectTo: '/movies/popular',
                pathMatch: 'full',
                canActivate: [AuthGuardService]
            },
            {
                path: 'popular',
                component: TmdbContainerComponent,
                data: {
                    movieType: 'popular'
                },
                canActivate: [AuthGuardService]
            },
            {
                path: 'top_rated',
                component: TmdbContainerComponent,
                data: {
                    movieType: 'top_rated'
                },
                canActivate: [AuthGuardService]
            },
            {
                path: 'watchlist',
                component: WatchlistComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'search',
                component: SearchComponent,
                canActivate: [AuthGuardService]
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(movieRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MovieRouterModule { }
