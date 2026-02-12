# HU01 - Publicar oferta de tutoría

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 13 SP |
| **Historia de Usuario** | Como tutor, quiero publicar que domino una materia, para atraer estudiantes interesados. |


---

# HU01 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Publicación Exitosa de Oferta** | **Dado** que el tutor se encuentra en la interfaz 'Nueva Oferta de Tutoría'<br>**cuando** ingresa en el campo 'Título de la Oferta': 'Cálculo Vectorial', ingresa en el campo 'Precio por Hora ($)': '10', selecciona en el campo 'Modalidad': 'Presencial', selecciona en el campo 'Categorías': 'Matemáticas', ingresa en el campo 'Descripción de la Oferta': 'Se enseñará cálculo vectorial, incluyendo integrales de línea y superficie.' y hace clic en el botón 'Publicar Oferta'<br>**entonces** el sistema publica la oferta, la modal 'Nueva Oferta de Tutoría' se cierra y se visualiza el perfil del tutor en el Dashboard con un mensaje de 'Oferta creada'. |
| **Bloqueo por Título Vacío** | **Dado** que el tutor se encuentra en la interfaz 'Nueva Oferta de Tutoría'<br>**cuando** deja el campo 'Título de la Oferta' vacío, ingresa en el campo 'Precio por Hora ($)': '10', selecciona en el campo 'Modalidad': 'Presencial', selecciona en el campo 'Categorías': 'Matemáticas', ingresa en el campo 'Descripción de la Oferta': 'Clases de matemáticas avanzadas para universitarios.' y hace clic en el botón 'Publicar Oferta'<br>**entonces** la modal 'Nueva Oferta de Tutoría' permanece abierta, el campo 'Título de la Oferta' muestra un borde rojo y el mensaje de error 'Escribe el título de la materia' aparece debajo. |
| **Bloqueo por Precio Inválido** | **Dado** que el tutor se encuentra en la interfaz 'Nueva Oferta de Tutoría'<br>**cuando** ingresa en el campo 'Título de la Oferta': 'Física I', ingresa en el campo 'Precio por Hora ($)': '3' (o lo deja vacío), selecciona en el campo 'Modalidad': 'Presencial', selecciona en el campo 'Categorías': 'Ciencias Exactas', ingresa en el campo 'Descripción de la Oferta': 'Tutorías personalizadas de Física I para estudiantes universitarios.' y hace clic en el botón 'Publicar Oferta'<br>**entonces** la modal 'Nueva Oferta de Tutoría' permanece abierta, el campo 'Precio por Hora ($)' muestra un borde rojo y el mensaje de error 'Ingresa un precio' aparece debajo. |
| **Bloqueo por Categorías Vacías** | **Dado** que el tutor se encuentra en la interfaz 'Nueva Oferta de Tutoría'<br>**cuando** ingresa en el campo 'Título de la Oferta': 'Programación en Python', ingresa en el campo 'Precio por Hora ($)': '15', selecciona en el campo 'Modalidad': 'Presencial', deja el campo 'Categorías' vacío, ingresa en el campo 'Descripción de la Oferta': 'Clases de Python desde cero hasta nivel intermedio.' y hace clic en el botón 'Publicar Oferta'<br>**entonces** la modal 'Nueva Oferta de Tutoría' permanece abierta, el campo 'Categorías' muestra un borde rojo y el mensaje de error 'Selecciona al menos una categoría' aparece debajo. |
| **Bloqueo por Descripción Vacía** | **Dado** que el tutor se encuentra en la interfaz 'Nueva Oferta de Tutoría'<br>**cuando** ingresa en el campo 'Título de la Oferta': 'Álgebra Lineal', ingresa en el campo 'Precio por Hora ($)': '12', selecciona en el campo 'Modalidad': 'Presencial', selecciona en el campo 'Categorías': 'Matemáticas', deja el campo 'Descripción de la Oferta' vacío y hace clic en el botón 'Publicar Oferta'<br>**entonces** la modal 'Nueva Oferta de Tutoría' permanece abierta, el campo 'Descripción de la Oferta' muestra un borde rojo y el mensaje de error 'Agrega una descripción' aparece debajo. |
| **Cancelar con Botón 'Cancelar'** | **Dado** que el tutor se encuentra en la interfaz 'Nueva Oferta de Tutoría' y ha ingresado datos en algunos campos<br>**cuando** hace clic en el botón 'Cancelar'<br>**entonces** la modal 'Nueva Oferta de Tutoría' se cierra y el sistema redirige al perfil del tutor en el Dashboard, mostrando el botón '+ Nueva Oferta'. |
| **Cancelar con Botón 'X'** | **Dado** que el tutor se encuentra en la interfaz 'Nueva Oferta de Tutoría' y ha ingresado datos en algunos campos<br>**cuando** hace clic en el botón 'X' para cerrar la modal<br>**entonces** la modal 'Nueva Oferta de Tutoría' se cierra y el sistema redirige al perfil del tutor en el Dashboard, mostrando el botón '+ Nueva Oferta'. |
| **Bloqueo por Límite de Título (80 caracteres)** | **Dado** que el tutor edita el campo 'Título de la Oferta'<br>**cuando** intenta ingresar el texto: 'Curso completo de Cálculo Vectorial y Ecuaciones Diferenciales para Ingeniería de Software' (90 caracteres)<br>**entonces** el sistema **trunca el texto** permitiendo solo los primeros 80 caracteres, impide escribir más y el contador visual muestra **"80/80"**. |
| **Bloqueo por Límite de Categorías (Máx. 5)** | **Dado** que el tutor ya ha seleccionado 5 categorías: 'Matemática', 'Física', 'Química', 'Álgebra' y 'Cálculo'<br>**cuando** intenta seleccionar una sexta categoría como 'Estadística'<br>**entonces** el sistema **no añade la sexta categoría**, mantiene la selección anterior y el contador visual permanece en **"5/5"**. |
| **Bloqueo por Límite de Descripción (250 caracteres)** | **Dado** que el tutor edita el campo 'Descripción de la Oferta'<br>**cuando** intenta pegar el texto: 'En este curso intensivo aprenderás a dominar las integrales dobles y triples, así como el análisis vectorial completo. Incluye resolución de exámenes pasados, talleres prácticos semanales y acceso a grabaciones de las clases para repaso constante previo al examen.' (263 caracteres)<br>**entonces** el sistema **trunca el texto** en el carácter 250 (terminando en "...repaso constan"), impide escribir más y el contador visual muestra **"250/250"**. |
| **Bloqueo por Título muy corto (menor a 3)** | **Dado** que el tutor se encuentra en la interfaz 'Nueva Oferta de Tutoría'<br>**cuando** ingresa en el campo 'Título de la Oferta': **'Fe'** (2 caracteres), ingresa en el campo 'Precio por Hora ($)': '10', selecciona en el campo 'Modalidad': 'Presencial', selecciona en el campo 'Categorías': 'Matemáticas', ingresa en el campo 'Descripción de la Oferta': 'Se enseñará cálculo vectorial, incluyendo integrales.' y hace clic en el botón 'Publicar Oferta'<br>**entonces** la modal permanece abierta, el campo 'Título de la Oferta' muestra un borde rojo, el contador indica **'2/80'** y aparece debajo el mensaje de error 'Mínimo 3 caracteres'. |
| **Bloqueo por Descripción muy corta (menor a 20)** | **Dado** que el tutor se encuentra en la interfaz 'Nueva Oferta de Tutoría'<br>**cuando** ingresa en el campo 'Título de la Oferta': 'Cálculo Vectorial', ingresa en el campo 'Precio por Hora ($)': '15', selecciona en el campo 'Modalidad': 'Virtual', selecciona en el campo 'Categorías': 'Matemáticas', ingresa en el campo 'Descripción de la Oferta': 'Clases rápidas.' (15 caracteres) y hace clic en el botón 'Publicar Oferta'<br>**entonces** la modal permanece abierta, el campo 'Descripción de la Oferta' muestra un borde rojo, el contador indica '15/250' y aparece debajo el mensaje de error 'Mínimo 20 caracteres'. |


## Frames del Prototipo

### T. Crear Oferta de Tutoría

**Frame ID**: [1prdnrcrqRHgFFCCUJl4sfP6ABhR9f3fa](https://drive.google.com/file/d/1prdnrcrqRHgFFCCUJl4sfP6ABhR9f3fa/view?usp=drivesdk)

### T. Crear Oferta de Tutoría (Errores)

**Frame ID**: [1NqT8B2GpBe8fKdV_melx61EmJYcaftRS](https://drive.google.com/file/d/1NqT8B2GpBe8fKdV_melx61EmJYcaftRS/view?usp=drivesdk)

### T. Crear Oferta de Tutoría (Categorías Seleccionadas)

**Frame ID**: [1prdnrcrqRHgFFCCUJl4sfP6ABhR9f3fa](https://drive.google.com/file/d/1prdnrcrqRHgFFCCUJl4sfP6ABhR9f3fa/view?usp=drivesdk)


## Observaciones

Ninguna observación para el frame "T. Crear Oferta de Tutoría".
