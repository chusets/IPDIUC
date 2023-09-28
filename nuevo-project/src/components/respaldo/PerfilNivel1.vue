<template>
 
 
    <v-container >
     <v-row>
      <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Nivel</p>  </v-card-text>
      </v-col>
      <v-col cols="2">
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
         <v-card-text><p class="text-lg-right"> Correo</p>  </v-card-text>
      </v-col>
      <v-col cols="4">
        <v-text-field 
            :rules="[rules.required]"
            inset
            :value="Correo_User"
            clearable
            solo-inverted
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
        show1: false,
        password: '',
        isLoading: false,
        fullPage: true,
        Nombre_User: null, ID_User:null, Correo_User:null, ID_Depar:null, Nombre_Depar:null, Nivel_User:null, Pass_User:null,
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
            this.Correo_User= this.arreglo[0].Correo_User;                     
            this.ID_Depar=this.arreglo[0].ID_Depar_User;
            this.Nivel_User= this.arreglo[0].Nivel_User; 
      
            axios.post("http://localhost/PC/nuevo-project/backend/getDepar.php", 
            {
                datosdepar:JSON.stringify({ID_d:this.ID_Depar}) 
            })
            .then(response =>{           
              this.arreglo=response.data;
              this.Nombre_Depar= this.arreglo[0].Nombre_Departamento;      
                            
      
                              
      });


      })  
      
      





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
                  axios.post("http://localhost/PC/nuevo-project/backend/updateuser.php", 
                  {
                     datosupdate:JSON.stringify({ID_u:this.ID_User, Correo_u:this.Correo_User, Pass_u:this.Pass_User,}) 
                  })
                  .then(response =>{           
                  this.arreglo=response.data;
                         
                              
                  });  

                            
                            


                         
                          
                         

            }
        
        }
    }
  
</script>



