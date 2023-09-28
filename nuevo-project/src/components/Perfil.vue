<template>
 
 
    <v-container >
     <v-row v-show="Nivel_User == 2">
      <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Nivel</p>  </v-card-text>
      </v-col>
      <v-col cols="1">
        <v-text-field inset
            :value="Nivel_User"
            solo-inverted
            disabled
          ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
       <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Nombre de Usuario</p>  </v-card-text>
      </v-col>
      <v-col cols="4">
        <v-text-field inset
            :value="Nombre_User"
            solo-inverted
            disabled
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Departamento</p>  </v-card-text>
      </v-col>
      <v-col cols="4">
        <v-text-field inset
            :value="Nombre_Depar"
            solo-inverted
            disabled
          ></v-text-field>
      </v-col>
    </v-row>

  <v-row>
      <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Respuestas y Comentarios con Aceptacion</p>  </v-card-text>
      </v-col>
      <v-col cols="1">
        <v-text-field inset
            :value="Preg_Res_UserMas50"
            solo-inverted
            disabled
          ></v-text-field>
      </v-col>
    </v-row>


    <v-row>
       <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Correo</p>  </v-card-text>
      </v-col>
      <v-col cols="4">
        <v-text-field 
            :rules="[rules.required]"
            inset
            clearable
            solo-inverted
            v-model:Correo_User = "CUser1"
          ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
       <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Password</p>  </v-card-text>
      </v-col>
      <v-col cols="4">
       <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
                counter
            @click:append="show1 = !show1"
            solo-inverted
          ></v-text-field>

        

      </v-col>
    </v-row>
    <div class="text-center" >
        <loading :active.sync="isLoading" 
        color="Indigo"
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
               
        
        <v-btn
        color="indigo"
         @click.prevent="eventoClick"> <span class="white--text">Guardar</span>
        </v-btn>
   
    </div>


                     
  </v-container>

</template>

<script>
  export default {
    name: "PerfilNivel1"
    
  }
</script>


<script>
    import axios from 'axios'
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    data () {
      return {
        Preg_Res_UserMas50: null, // Nueva propiedad para almacenar la cantidad de respuestas y comentarios con más del 50% de aceptación{
        show1: false,
        password: '',
        CUser1:'',
        isLoading: false,
        fullPage: true,
        Nombre_User: null, ID_User:null, Correo_User:null, ID_Depar:null, Nombre_Depar:null, Nivel_User:null, Pass_User:null, Preg_Res_User:null,
         rules: {
          required: value => !!value || 'Requerido',
          min: v => v.length >= 8 || 'Minimo 8 caracteres',
          counter: value => value.length <= 30 || 'Maximo 20 caracteres',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email Invalido.'
          }
         },
      }
    }, 
    
     
    beforeCreate() {
      if(sessionStorage.getItem('Nombre') == null  ){

        this.$router.push('/login');
      }
    },
    mounted() {
      this.Nombre_User = sessionStorage.getItem('Nombre');
      this.ID_User = sessionStorage.getItem('ID');
      

      axios.post("http://localhost/PC/nuevo-project/backend/getdatosuser.php", 
      {
          datosuser:JSON.stringify({ID_u:this.ID_User}) 
      })
      .then(response =>{           
            this.arreglo=response.data;
            this.CUser1=this.arreglo[0].Correo_User;                
            this.ID_Depar=this.arreglo[0].ID_Depar_User;
            this.Nivel_User= this.arreglo[0].Nivel_User; 
            this.Preg_Res_User= this.arreglo[0].Num_Resp;
            axios.post("http://localhost/PC/nuevo-project/backend/getDepar.php", 
            {
                datosdepar:JSON.stringify({ID_d:this.ID_Depar}) 
            })
            .then(response =>{           
              this.arreglo=response.data;
              this.Nombre_Depar= this.arreglo[0].Nombre_Departamento;      
               // Después de obtener los datos del usuario, realiza una solicitud para obtener la cantidad de respuestas y comentarios con más del 50% de aceptación
               axios.post("http://localhost/PC/nuevo-project/backend/CSATmayor50.php", {
                  UserID: this.ID_User // Puedes enviar el ID del usuario u otro dato necesario
               }).then(response => {
                  this.Preg_Res_UserMas50 = response.data.totalPuntuaciones; // Actualiza la propiedad con la cantidad de respuestas y comentarios
              });              
      
                              
      });


      })  
      
      





    },
    beforeCreate() {
      if(sessionStorage.getItem('Nombre') == null  ){
        sessionStorage.setItem('validadorlogin', true);
        this.$router.push('/login');
      }
    },

    components: {
            Loading
        },
        methods: {
            doAjax() {
                this.isLoading = true;
                // simulate AJAX
                setTimeout(() => {
                  this.isLoading = false
                },5000)
            },
            onCancel() {
              console.log('User cancelled the loader.')
            },
            eventoClick() {
              
                  this.Pass_User=this.password;    
                  this.CorreoUser1=this.CUser1;
                  axios.post("http://localhost/PC/nuevo-project/backend/updateuser.php", 
                  {
                     datosupdate:JSON.stringify({ID_u:this.ID_User, Correo_u:this.CorreoUser1, Pass_u:this.Pass_User,}) 
                  })
                  .then(response =>{           
                  this.arreglo=response.data;
                  });  

                            
                            


                         
                          
                         

            }
        
        }
    }
  
</script>



