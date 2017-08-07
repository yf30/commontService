import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './LoginComponent//login.component';
import {MainComponent} from './MainComponent/main.component'
import {MainModule} from './MainComponent/main.module'
// import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'app',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'app',
		loadChildren: './MainComponent/main.module#MainModule'
	},
	// { 	path: '**', 
	// 	component: ErrorComponent 
	// }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})

export class AppRoutesModule { }


