import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { ArchivedComponent } from './components/archived/archived.component';

const routes: Routes = [  
  { path: '', component: NewsComponent},
  { path: 'news', component: NewsComponent},
  { path: 'archived', component: ArchivedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
