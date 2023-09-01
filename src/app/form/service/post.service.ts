import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Post } from '../interfaces/post.interface';
import { NewPost } from '../interfaces/newPost.interface';
import { OptionalPost } from '../interfaces/optionalPost.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url: string = `${environment.baseUrl}posts`;

  constructor(private http: HttpClient) { }

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url).pipe(
      catchError(err => {
        console.error({err});
        return of([]);
      })
    );
  }

  public getPostById(id: string): Observable<Post> {
    if (!id) return of();

    return this.http.get<Post>(`${this.url}/${id}`)
        .pipe(
          catchError(err => {
            console.error({err});
            return of();
          })
        );
  }

  public createNewPost(newPost: NewPost): Observable<boolean> {
    return this.http.post<Post>(`${this.url}`, newPost, { observe: 'response' })
      .pipe(
        tap(resp => console.log({resp})),
        map(responseHttp => (responseHttp.status === 201) ? true : false),
        catchError(err => {
          console.error({err});
          return of(false);
        })
      );
  }

  public updatePostById(post: Post): Observable<boolean>  {
    return this.http.put<Post>(`${this.url}/${post.id}`, post)
      .pipe(
        map(updatedPost =>
          (updatedPost.id) ? true : false
        ),
        catchError(err => {
          console.error({err});
          return of(false);
        })
      );
  }

  public patchPostById(id: string, post: OptionalPost): Observable<boolean> {
    return this.http.patch<Post>(`${this.url}/${id}`, post)
    .pipe(
      map(updatedPost =>
        (updatedPost.id) ? true : false
      ),
      catchError(err => {
        console.error({err});
        return of(false);
      })
    );
  }

  public deletePostById(idPost: string): Observable<boolean>  {
    return this.http.delete<undefined>(`${this.url}/${idPost}`)
      .pipe(
        map(() => true),
        catchError(err => {
          console.error({err});
          return of(false);
        })
      );
  }
}
