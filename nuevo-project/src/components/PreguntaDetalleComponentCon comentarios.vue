


<template>
  <div>
    
    <h3>Pregunta</h3>


    <h3>Respuestas</h3>
    <ul>
      <li v-for="respuesta in respuestas" :key="respuesta.id">
        {{ respuesta.Respuesta }}
      </li>
    </ul>

    <h3>Comentarios</h3>
    <ul>
      <li v-for="comentario in comentarios" :key="comentario.id">
        {{ comentario.texto }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      pregunta: null,
      respuestas: [],
      comentarios: []
    };
  },
  mounted() {
    const preguntaId = this.$route.params.id; // Obtener el ID de la pregunta de la ruta
    
    // Realizar una solicitud al backend para obtener los detalles de la pregunta
    // y sus respuestas y comentarios relacionados utilizando el ID de la pregunta
    
    // Ejemplo de solicitud utilizando axios
    axios.get(`http://localhost/PC/nuevo-project/backend/detallesPregunta.php?id=${preguntaId}`)
      .then(response => {
        console.log(response.data);
        this.pregunta = response.data.pregunta;
        this.respuestas = response.data.respuestas;
        this.comentarios = response.data.comentarios;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>