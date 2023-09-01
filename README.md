# Solucion

Se utilizo el api de jsonplaceholder, se guardo la referencia en los environments

Se creo una unica ruta a la cual se le puede enviar un parametro el cual estara representado como id, este
identifica el id del post a traer, con esto se realiza la primera peticion GET.

Si el id no se logra obtener el formulario no cargara valor alguno, en caso contrario se seteara el valor en el formulario.

Se crearon los campos del formulario acorde a lo que recibe el endpoint que en este caso es:

{
    "id"
    "userId"
    "title"
    "body"
}

Se creo un servicio para centralizar las peticiones http hacia la ruta de posts, se crearon ademas los metodos
POST, UPDATE, DELETE, PATCH