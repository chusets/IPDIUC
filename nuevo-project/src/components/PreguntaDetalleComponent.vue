<template>
  <div>
    

    
    <div class="col " id="example-1">
      
        <v-card class="mx-auto"  outlined>
          
          
          <v-card-text>
            <div class="text-body-1 font-weight-black" style="color: #1565C0;">
              {{  pregunta.TituloP }}
              
              <v-btn
                v-if="esElUsuarioQueHizoLaPregunta(pregunta.ID_User_Preg)"
                color="indigo lighten-2"
                text
                @click="editarPregunta(pregunta)"
              >
                Editar
              </v-btn>

              
            </div>
              <v-spacer></v-spacer>
              <div class="my-2 text-body-1 ">
                {{  pregunta.Pregunt }}
              </div>
        </v-card-text>


        <v-card-actions>

          <v-dialog
                :retain-focus="false"
                v-model="dialog"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                      <v-btn
                      color="indigo  lighten-2"
                      text
                      v-bind="attrs"
                      v-on="on"
                      @click="(preguntp = pregunta.Pregunt, idpregunta = pregunta.Num_Pregunta,tituloPreg = pregunta.TituloP)"
                    >
                      Responder
                    </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <div class="my-2 text-body-1">
                      <b>Titulo {{ tituloPreg }}</b><br>
                
                      {{ preguntp }}
                    </div> 

                    

              
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        
                        
                        <v-col cols="12">
                          <v-textarea
                            v-model="respuestap"                           
                          >
                          </v-textarea>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogFuncion"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogFuncion(),responderPregunta()"
                    >
                      Responder
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              
              <v-dialog
              :retain-focus="false"
              v-model="dialogComentario"
              persistent
              max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }"></template>
                <v-card>
                  <v-card-title>
                    <div class="my-2 text-body-1" >
                      <b>Agregar Comentario</b>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-textarea v-model="nuevoComentario" />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogComentario = false">
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="agregarComentarioARespuesta()">
                      Agregar Comentario
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogEditar" 
                persistent 
                max-width="600px">
              <v-card>
              <v-card-title>
                <div class="my-2 text-body-1">
                  Editar Pregunta
                </div>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="nuevoTituloPregunta"
                        clearable
                        label="Editar Título de Pregunta / Inquietud"
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="nuevaPregunta"
                        clearable
                        label="Editar Redacción de Pregunta / Inquietud"
                        filled
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogEditar = false">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="guardarEdicionPregunta">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

            <v-spacer></v-spacer>
            <div class="my-2 text-body-1 ">
            Pregunta  #{{ pregunta.Num_Pregunta }}    -  Fecha:    {{ pregunta.Fecha_Pregunta }}
            </div> 
          </v-card-actions>


       
        </v-card>
        <br>
        
        <div v-for="(respuesta, index) in respuestas" :key="respuesta.Num_Respuesta">
          <v-card class="mx-auto"  outlined>
            <v-card-text>
              <div class="text-body-1 font-weight-black" style="color: black; display: flex; align-items: center;">
                Respuesta de Usuario: {{ respuesta.nombreUsuario }}  #{{ respuesta.ID_User_Resp }}<v-spacer></v-spacer>
                <v-rating
                  v-model="ratings[respuesta.Num_Respuesta]"
                  :max="5"
                  color="#1565c0"
                  dense
                  background-color="grey lighten-3"
                  @input="onRatingChange(respuesta, ratings[respuesta.Num_Respuesta])"
                  v-show="userID  !== respuesta.ID_User_Resp"
                ></v-rating>
                  <div v-show="userID  !== respuesta.ID_User_Resp">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on" color="#C8C7C7">mdi-help-circle-outline</v-icon>
                      </template>
                      <span>1 Estrella - Totalmente en Desacuerdo</span><br>
                      <span>2 Estrellas - Un Poco en Desacuerdo</span><br>
                      <span>3 Estrellas - Ni de Desacuerdo ni en Desacuerdo</span><br>
                      <span>4 Estrellas - Un Poco Deacuerdo</span><br>
                      <span>5 Estrellas -  Totalmente Deacuerdo</span><br>

                    </v-tooltip>
                  </div>
              </div>
              <div class="my-2 text-body-1">
                {{ respuesta.Respuesta }}
              </div>
            </v-card-text>
          <v-card-actions>
            <!-- ... (otros botones y elementos) ... -->
            <v-btn
              color="indigo lighten-2"
              text
              @click="agregarComentario(index)"
            >
              Agregar Comentario
            </v-btn>
              <v-spacer></v-spacer>
              <div class="my-2 text-body-1 ">
                  Respuesta #{{ index+1 }} - Porcentaje de Aprobacion: {{ respuesta.puntuacionPromedio !== undefined ? respuesta.puntuacionPromedio : 'N/A' }}%   -  Fecha:    {{ respuesta.Fecha_Respuesta }}
              </div> 
          </v-card-actions>
          
          
          </v-card>
          <ul>
          <div  v-for="(comentario, index2) in respuesta.comentarios" :key="comentario.Num_Comentario">
            <v-card class="mx-auto"  outlined>
            <v-card-text>
              <div class="text-body-1 font-weight-black" style="color: black; display: flex; align-items: center;">
                Comentario de: {{ comentario.Nombre_User}}   #{{ comentario.ID_User_Comentario }}<v-spacer></v-spacer>
                <v-rating
                    v-model="ratingsComentarios[comentario.Num_Comentario]"
                    :max="5"
                    color="#1565c0"
                    dense
                    background-color="grey lighten-3"
                    @input="onComentarioRatingChange(comentario, ratingsComentarios[comentario.Num_Comentario])"
                    v-show="userID  !== comentario.ID_User_Comentario"
                  ></v-rating>
                <div v-show="userID  !== comentario.ID_User_Comentario">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on" color="#C8C7C7">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>1 Estrella - Totalmente en Desacuerdo</span><br>
                    <span>2 Estrellas - Un Poco en Desacuerdo</span><br>
                    <span>3 Estrellas - Ni de Desacuerdo ni en Desacuerdo</span><br>
                    <span>4 Estrellas - Un Poco Deacuerdo</span><br>
                    <span>5 Estrellas -  Totalmente Deacuerdo</span><br>

                  </v-tooltip>
                </div>
              </div>
                <div class="my-2 text-body-1 ">


                  {{ comentario.comentario }}
                  
                </div>    
            </v-card-text>
            <v-card-actions>
            
                <v-spacer></v-spacer>
                <div class="my-2 text-body-1 ">
                Comentario  #{{ index2+1 }} a la Respuesta #{{comentario.Num_Respuesta }} - Porcentaje de Aprobacion: {{ comentario.puntuacionPromedio !== undefined ? comentario.puntuacionPromedio: 'N/A' }}%    -  Fecha:    {{ comentario.Fecha_Comentario }}
                </div> 
            </v-card-actions>
            </v-card>
          </div>
          </ul>
          <br>
      </div>
    </div>

    

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userID: null,
      ratingsComentarios: {},// Estados de las estrellas de los comentarios
      ratings: {}, // Objeto para almacenar los estados de las estrellas
      selectedRating: 0,
      dialogEditar: false,
      nuevaPregunta: '', // Agrega esta propiedad para almacenar la pregunta editada
      nuevoTituloPregunta: '', // Agrega esta propiedad para almacenar el título de la pregunta editada
      dialogComentario: false,
      nuevoComentario: null,
      n: null,
      i: 0,
      dialog: false,
      respuesta: null,
      indiceP: null,
      preguntp: null,
      idpregunta: null,
      ResponderPArray: null,
      respuestap: null,
      ID_User_resp: null,
      tituloPreg: null,
      Fecha_Resp: null,
      fecha_aux: [],
      fecha: null,
      fecha_a: '',
      fecha_m: '',
      fecha_d: '',
      fecha_bd: '',
      pregunta: [],
      respuestas: [],
      comentarios: []
    };
  },
  
  methods: {
obtenerPromedioComentario(comentario) {
  const datos = {
    comentarioId: comentario.Num_Comentario
  };

  axios.post('http://localhost/PC/nuevo-project/backend/calcularpromediocomentario.php', JSON.stringify(datos))
    .then(response => {
      console.log(response.data)
      if (response.data.success) {
        // Crear una copia del comentario actual y actualizar la propiedad puntuacionPromedio
        const nuevoComentario = Object.assign({}, comentario, { puntuacionPromedio: response.data.csat });

        // Encontrar el índice del comentario dentro de su respuesta padre
        const respuestaIndex = this.respuestas.findIndex(respuesta => respuesta.Num_Respuesta === comentario.Num_Respuesta);

        if (respuestaIndex !== -1) {
          // Encontrar el índice del comentario dentro de la lista de comentarios de la respuesta
          const comentarioIndex = this.respuestas[respuestaIndex].comentarios.findIndex(c => c.Num_Comentario === comentario.Num_Comentario);

          if (comentarioIndex !== -1) {
            // Actualizar el comentario en la lista de comentarios de la respuesta
            this.respuestas[respuestaIndex].comentarios[comentarioIndex] = nuevoComentario;

            // Actualizar la respuesta en el arreglo respuestas usando Vue.set() o this.$set()
            this.$set(this.respuestas, respuestaIndex, this.respuestas[respuestaIndex]);
          }
        }
      }
    })
    .catch(error => {
      console.error(error);
    });
},

    
onComentarioRatingChange(comentario, puntuacion) {
  const userId = sessionStorage.getItem('ID');
  // Verificar si el usuario está intentando puntuar su propio comentario
  if (comentario.ID_User_Comentario === parseInt(userId, 10)) {
    alert('No puedes puntuar tu propio comentario.');
    return; // Salir de la función
  }else{

  const data = {
    comentarioId: comentario.Num_Comentario,
    puntuacion: puntuacion,
    userId: userId
  };

  axios
    .post('http://localhost/PC/nuevo-project/backend/guardarpuntuacioncomentario.php', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.data.success) {
        // Llama a obtenerPromedioComentario después de actualizar la puntuación
        this.obtenerPromedioComentario(comentario);
      } else {
        console.error('Error al guardar la puntuación del comentario:', response.data.message);
      }
      // Actualiza la puntuación en el objeto ratingsComentarios
      this.$set(this.ratingsComentarios, comentario.Num_Comentario, puntuacion);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }
},




    
  obtenerPuntuacionPromedio(respuestaId, index) {
    const datos = {
      respuestaId: respuestaId
    };

    axios.post('http://localhost/PC/nuevo-project/backend/calcularpromedio.php', JSON.stringify(datos))
      .then(response => {
        if (response.data.success) {
          // Crear una copia de la respuesta actual y actualizar la propiedad puntuacionPromedio
          const nuevaRespuesta = Object.assign({}, this.respuestas[index], { puntuacionPromedio: response.data.csat });

          // Actualizar la respuesta en el arreglo respuestas usando Vue.set() o this.$set()
          this.$set(this.respuestas, index, nuevaRespuesta);
        }
      })
      .catch(error => {
        console.error(error);
      });
  },


  onRatingChange(respuesta, puntuacion) {
    const respuestaId = respuesta.Num_Respuesta;
    const userId = sessionStorage.getItem('ID');
    // Verificar si el usuario está intentando puntuar su propio comentario
    if (respuesta.ID_User_Resp === parseInt(userId, 10)) {
      alert('No puedes puntuar tu propia respuesta.');
      return; // Salir de la función
    }else{
      axios.post('http://localhost/PC/nuevo-project/backend/guardarpuntuacion.php', {
        respuestaId: respuestaId,
        puntuacion: puntuacion,
        userId: sessionStorage.getItem('ID')
      })
      .then(response => {
        if (response.data.success) {
          // Llama a obtenerPuntuacionPromedio después de actualizar la puntuación
          this.obtenerPuntuacionPromedio(respuestaId, this.respuestas.findIndex(respuesta => respuesta.Num_Respuesta === respuestaId));
        } else {
          console.error('Error al guardar la puntuación:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
    }
  },

  esElUsuarioQueHizoLaPregunta(userId) {
      // Comprueba si userId no es undefined y si es un valor válido antes de llamar a toString()
      return userId !== undefined && userId !== null && userId.toString() === sessionStorage.getItem('ID');
  },

  editarPregunta(pregunta) {
      this.dialogEditar = true; // Mostrar el cuadro de diálogo de editar
      this.nuevaPregunta = pregunta.Pregunt; // Prellenar el campo de edición con el texto actual
      this.nuevoTituloPregunta = pregunta.TituloP; // Prellenar el campo de edición con el título actual
  },

  guardarEdicionPregunta() {
      // Realizar una solicitud al backend para guardar la edición de la pregunta
      const preguntaId = this.pregunta.Num_Pregunta;
      const userId = sessionStorage.getItem('ID');
      axios
        .post('http://localhost/PC/nuevo-project/backend/editarpregunta.php', {
          datosedicion: JSON.stringify({ Num_Pregunta: preguntaId, ID_u_Preg: userId, Pregunt: this.nuevaPregunta,  TituloP: this.nuevoTituloPregunta,  }),
        })
        .then((response) => {
          if (response.data.success) {
            // La edición se guardó exitosamente
            this.dialogEditar = false; // Cerrar el cuadro de diálogo de editar
            // Puedes actualizar los datos mostrados en la página si es necesario
            axios.get(`http://localhost/PC/nuevo-project/backend/detallesPregunta.php?id=${preguntaId}`)
            .then(response => {
              // Actualizar los datos del componente con los nuevos datos obtenidos
              this.pregunta = response.data.pregunta;
              this.respuestas = response.data.respuestas;
            })
            .catch(error => {
              console.error(error);
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
  },
    
  dialogFuncion() {
      this.dialog = false;
  },
    
  agregarComentarioARespuesta() {
    const comentario = this.nuevoComentario.trim();

    if (!comentario) {
      return; // Si el comentario está vacío, no se agrega nada
    }

    const respuestaId = this.respuestaSeleccionada.Num_Respuesta;
    const userId = sessionStorage.getItem('ID');

    axios
    .post('http://localhost/PC/nuevo-project/backend/agregarcomentario.php', {
      datoscomentario: JSON.stringify({
        Num_Respuesta: respuestaId,
        ID_User_Comentario: userId,
        comentario: comentario,
      }),
    })
    .then((response) => {
      if (response.data.success) {
        // Comentario agregado exitosamente, actualizar lista de comentarios
        const nuevoComentario = {
          Num_Respuesta: response.data.comentario.Num_Respuesta,
          ID_User_Comentario: response.data.comentario.ID_User_Comentario,
          comentario: response.data.comentario.comentario,
          Fecha_Comentario: response.data.comentario.Fecha_Comentario, // Utilizar la fecha del PHP
          Nombre_User: response.data.comentario.Nombre_User, // Utilizar el nombre de usuario del PHP
        };

        this.respuestaSeleccionada.comentarios.push(nuevoComentario);

        // Actualizar el objeto "comentario"
        this.comentario = nuevoComentario;

        // Actualizar la puntuación promedio
        this.comentario.puntuacionPromedio = 0.00;

        // Limpiar el campo de texto del comentario
        this.nuevoComentario = '';

        // Cerrar el cuadro de diálogo
        this.dialogComentario = false;
      }
    })
    .catch((error) => {
      console.error(error);
    });
},





    agregarComentario(indexRespuesta) {
    // Guardar la respuesta seleccionada para agregar el comentario
    this.respuestaSeleccionada = this.respuestas[indexRespuesta];

    // Mostrar el cuadro de diálogo de agregar comentario
    this.dialogComentario = true;
     },
    
     responderPregunta() {
  this.Fecha_Resp = this.printDate();
  axios.post("http://localhost/PC/nuevo-project/backend/responderpregunta.php", {
    datosresponder: JSON.stringify({
      ID_p: this.idpregunta,
      respuesta_p: this.respuestap,
      Fecha_R: this.Fecha_Resp,
      ID_u_Resp: sessionStorage.getItem('ID')
    })
  })
  .then(response => {
    if (response.data.success) {
      // Crear un objeto para la nueva respuesta
      const nuevaRespuesta = {
        Num_Respuesta: parseInt(response.data.respuestaAgregada.Num_Respuesta, 10),
        ID_User_Resp:parseInt(sessionStorage.getItem('ID'), 10) ,
        Respuesta: this.respuestap,
        Fecha_Respuesta: response.data.respuestaAgregada.Fecha_Formateada,
        nombreUsuario: response.data.respuestaAgregada.Nombre_User, // Utilizar el nombre de usuario del PHP
        puntuacionPromedio:0,
        Num_Pregunta:response.data.respuestaAgregada.Num_Pregunta,
        comentarios:[] // Agregar otras propiedades según sea necesario
      };

      // Crear una nueva copia de this.respuestas con la nueva respuesta agregada
      this.respuestas = [...this.respuestas, nuevaRespuesta];
      // Reiniciar las propiedades relacionadas con la respuesta actual
      this.respuestap = null;
      this.tituloPreg = null;

      // Cerrar el cuadro de diálogo de respuesta
      this.dialog = false;
    }
  });
},








    printDate: function () {
                    this.fecha = new Date().toLocaleDateString();
                    if(this.fecha[2] == '/' && this.fecha[4] == '/')
                    {
                      
                        this.fecha_a=this.fecha.slice(5)
                        this.fecha_m=this.fecha.slice(3,-5);
                        this.fecha_d=this.fecha.slice(0,-7);
                        this.fecha_bd=this.fecha_a+ '/' +this.fecha_m+ '/' +this.fecha_d;
                        return  this.fecha_bd;
                    }else{
                     
                     if(this.fecha[1] == '/' && this.fecha[4] == '/' )
                      {
                        
                        this.fecha_a=this.fecha.slice(5)
                        this.fecha_m=this.fecha.slice(2,-5);
                        this.fecha_d=this.fecha.slice(0,-8);
                        this.fecha_bd=this.fecha_a+ '/' +this.fecha_m+ '/' +this.fecha_d;
                        return  this.fecha_bd;
                      }else{
                        if(this.fecha[1] == '/' && this.fecha[3] == '/' )
                        {
                          this.fecha_a=this.fecha.slice(4);
                          this.fecha_m=this.fecha.slice(2,-5);
                          this.fecha_d=this.fecha.slice(0,-7);
                          this.fecha_bd=this.fecha_a+ '/' +this.fecha_m+ '/' +this.fecha_d;  
                          return  this.fecha_bd;


                        }else{}
                          
                          this.fecha_a=this.fecha.slice(6)
                          this.fecha_m=this.fecha.slice(3,-5);
                          this.fecha_d=this.fecha.slice(0,-8);
                          this.fecha_bd=this.fecha_a+ '/' +this.fecha_m+ '/' +this.fecha_d;
                          return  this.fecha_bd;
                      }      
                    }
                    
                    
                   
                    
                    
            },
  },
  beforeCreate() {
    if (sessionStorage.getItem('Nombre') == null) {
      sessionStorage.setItem('validadorlogin', true);
      this.$router.push('/login');
    }
  },

  mounted() {
  this.userID = parseInt(sessionStorage.getItem('ID'), 10);
  const preguntaId = this.$route.params.id;
  axios.get(`http://localhost/PC/nuevo-project/backend/detallesPregunta.php?id=${preguntaId}`)
    .then(response => {
      this.pregunta = response.data.pregunta;
      this.respuestas = response.data.respuestas;

      // Inicializar el estado de las estrellas para cada respuesta
      this.respuestas.forEach(respuesta => {
        this.$set(this.ratings, respuesta.Num_Respuesta, 0); // Inicializar en 0 estrellas
      });

      // Calcular el promedio de puntuaciones para todas las respuestas
      this.respuestas.forEach((respuesta, index) => {
        this.obtenerPuntuacionPromedio(respuesta.Num_Respuesta, index);
      });

      // Calcular el promedio de puntuaciones para todos los comentarios
      this.respuestas.forEach(respuesta => {
        respuesta.comentarios.forEach(comentario => {
          this.obtenerPromedioComentario(comentario);
        });
      });

    })
    .catch(error => {
      console.error(error);
    });
},




};


</script>