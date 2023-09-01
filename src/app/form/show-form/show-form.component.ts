import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, first } from 'rxjs';
import { PostService } from '../service/post.service';
import { ActionForm } from '../interfaces/actionForm.enum';

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.scss']
})
export class ShowFormComponent implements OnInit {

  public idPostNumber: string = '';
  public messageNotification: string = '';

  // creo formulario con los campos correspondientes y validaciones segun sea necesario
  public postForm: FormGroup = this.fb.group({
    id: [
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],
    userId: [
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],
    title: ['', [ Validators.required ]],
    body: ['', [ Validators.required ]],
  });

  // realizo las importaciones necesarias
  constructor(
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private postService: PostService
  ) {
  }

  public ngOnInit(): void {
    // obtengo solo la primera ruta de la url y me desuscribo
    this.activedRoute.params
      .pipe(
        first()
      ).subscribe(params =>
        this.idPostNumber = params['id']
      );

    this.loadPost();
  }

  // valido si el campo del fomulario posee algun error
  public isValid(field: string): boolean | null {
    if (!this.postForm.controls[field]) return false;
    return this.postForm.controls[field].errors && this.postForm.controls[field].touched;
  }

  // valido si el campo del fomulario posee algun mensaje
  public messageError(field: string) {
    if (!this.postForm.controls[field]) return '';

    const errors = this.postForm.controls[field].errors;

    if (errors) {
      for (const error of Object.keys(errors)) {
        switch(error) {
          case 'min':
            console.log(errors['min']);
            return `El valor minimo es ${errors['min'].min}`;
          case 'required':
            return 'Este campo es requerido';
          default:
            return '';
        }
      }
    }

    return '';
  }

  // cargo el id del post que viene en la url
  private loadPost(): void {
    this.postService.getPostById(this.idPostNumber)
      .subscribe(post => this.postForm.reset(post));
  }

  //  manejo todos los botones
  public async onSubmit(action: ActionForm) {
    this.messageNotification = '';

    if (this.postForm.invalid) return;

    let result: Promise<string>;

    switch (action) {
      case ActionForm.POST:
        result = this.onPost();
        break;
      case ActionForm.DELETE:
        result = this.onDelete();
        break;
      case ActionForm.PATCH:
        result = this.onPatch();
        break;
      case ActionForm.PUT:
        result = this.onPut();
        break;
    }

    result?.then(message => this.messageNotification = message);

    // elimino el mensaje de la interfaz
    setTimeout(() => {
      this.messageNotification = "";
    }, 1000);
  }

  private async onPost() {
    const { id, ...newPost } = this.postForm.value;
    const result = await this.postService.createNewPost(newPost).toPromise();

    return result ?
      'Se ha creado el post':
      'No se ha podido crear el post';
  }

  private async onPut(): Promise<string> {
    const result = await this.postService.updatePostById(this.postForm.get('id')?.value).toPromise();
    
    return result ?
      'Se ha modificado el post':
      'No se ha podido modificar el post';
  }
  
  private async onPatch() {
    const { id, ...optionalPost } = this.postForm.value;
    const result = await this.postService.patchPostById(id, optionalPost).toPromise();

    return result ?
      'Se ha actualizado el post':
      'No se ha podido actualizadar el post';
  }
  
  private async onDelete(): Promise<string> {
    const result = await this.postService.deletePostById(this.postForm.get('id')?.value).toPromise();

    this.postForm.reset({ id: 1, userId: 1 });

    return result ?
      'Se ha eliminado el post':
      'No se ha podido eliminar el post';
  }

}
