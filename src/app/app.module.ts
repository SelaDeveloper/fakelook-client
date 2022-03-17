import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AddPostComponent } from './components/add-post/add-post.component';
import { FormsModule } from '@angular/forms';
import { FakelookComponent } from './components/fakelook/fakelook.component';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [AppComponent, AddPostComponent, FakelookComponent, PostComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
