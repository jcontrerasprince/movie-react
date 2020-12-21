# Movie App front end

Este proyecto se presenta cómo resultados de prueba de selección

## Pasos a seguir

Descargar o clonar el proyecto y ejecutar los comandos para instalación

```
npm install
```

Una vez descargado, esto es sólo el front de un proyecto en conjunto, por lo que debe ser ejecutado al mismo tiempo que con `movie-back`

## Este proyecto contienne

- Página para Signup del usuario
- Página para login de usuarios existentes en la base de datos
- El token y los datos del usuario son manejados en la sesión
- Inicion con imagen y título de películas en base de datos
- Sección de películas donde se ven detalles
    - Al hacer click en el botón de `Reserve`, se presenta un modal para confirmación, el cuál guarda la info en database.
    - Si no se está logueado en sistenma, el Modal no ofrece la opción de confirmación, enviando un mensaje de que el usuario debe loguearse
- Existe una sección para guardar imágenes, el cuál convierte el formulario y envía la imagen cómo BLOB a la base de datos.
- En `utils` existe un archivo `Test Diagram.png` el cual es para resolver la pregunta del documento en word de qué hacer con las fechas en una base de datos.
- El trigger solicitado no se realizó en proyecto, se presenta a continuación en el quote siguiente
- 

```
CREATE TRIGGER dbo.tgBackupMovies
   ON  dbo.tbMovies
   AFTER DELETE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
	INSERT INTO dbo.tbBackup (ident, title, picture, [desc], duration, genre, time, createdAt, updatedAt)
	SELECT ident, title, picture, [desc], duration, genre, time, createdAt, updatedAt FROM deleted

END
GO
```