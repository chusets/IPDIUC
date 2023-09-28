<template>
 
 
    <v-container >
     <v-row>
      <v-col cols="5" inset>
          
         <v-card-text><p class="text-lg-right"> Nivel</p>  </v-card-text>
      </v-col>
      <v-col cols="5"  inset>
         <v-flex xs12 sm6 d-flex>
        <v-select
            solo
          :items="items_nivel"
          label="Seleccionar Nivel"
          :required="isRequiredField"
           v-model="Nivel_User"
        ></v-select>

      </v-flex>
       
      </v-col>


    </v-row>

    <v-row>
       <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Nombre de Usuario</p>  </v-card-text>
      </v-col>
      <v-col cols="4">
        <v-text-field inset
            label="Nombre de Usuario"
            solo
            :required="isRequiredField"
            v-model="Nomb_User"
          ></v-text-field>

      </v-col>
    </v-row>

    <v-row>
      <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Departamento</p>  </v-card-text>
      </v-col>
      <v-col cols="7">
        <v-flex xs12 sm6 d-flex>
        <v-select 
          solo
          :items="items_departamento"
          :required="isRequiredField"
          label="Seleccione un Departamento"
          v-model="Depar_User"
        ></v-select>

         </v-flex>
      </v-col>
    </v-row>

    <v-row>
       <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Correo</p>  </v-card-text>
      </v-col>
      <v-col cols="4">
        <v-text-field 
            :required="isRequiredField"
            inset
            label="Correo"
            clearable
            solo
             v-model="Correo_User"
          ></v-text-field>
     
      </v-col>
    </v-row>

    <v-row>
       <v-col cols="5" inset>
         <v-card-text><p class="text-lg-right"> Password</p>  </v-card-text>
      </v-col>
      <v-col cols="4">
       <v-text-field
            label="Password"
            
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            counter
            @click:append="show1 = !show1"
            solo
            :required="isRequiredField"
             v-model="Pass_User"
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
         @click.prevent="erClick"> <span class="white--text">Guardar</span>
        </v-btn>
        <br>
            <div v-if="showSuccessMessage">Registro Exitoso</div>
   
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
  var url = "http://localhost/PC/nuevo-project/backend/crud2.php";
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    data () {
      return {
        isRequiredField: true,
        showSuccessMessage: false,
        items_nivel: ['1', '2'],
        items_departamento: [],
        show1: false,
        Nivel_User: null, Depar_User: null, Correo_User: null, Pass_User: null, Nomb_User: null, prueba:null,
        isLoading: false,
        selected: '',
        fullPage: true,
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
        sessionStorage.setItem('validadorlogin', true);
        this.$router.push('/login');
      }
    },
    mounted() {
      axios.post('http://localhost/PC/nuevo-project/backend/getTodosDepar.php', {
         datosdepar: JSON.stringify({})
      })
      .then((response) => {
        this.TodosDepar = response.data;
        this.items_departamento = this.TodosDepar.data.map((departamento) => departamento.Nombre_Departamento);
      })
      .catch((error) => {
        console.error(error);
      });
    }, components: {
            Loading
        },
        methods: {

          //MÉTODOS PARA EL CRUD
            mostrar:function(){
              axios.post(url,{opcion:1})
              .then(response =>{
                this.articulos = response.data;                   
              })
            },
            crear:function(){                
                axios.post(url, {opcion:2, descripcion:this.articulo.descripcion, precio:this.articulo.precio, stock:this.articulo.stock })
                .then(response =>{
                  this.mostrar();
                });   
                this.articulo.descripcion="";
                this.articulo.precio="";
                this.articulo.stock="";
            },  
            editar:function(id, descripcion, precio, stock){
              axios.post(url, {opcion:3, id:this.articulo.id, descripcion:this.articulo.descripcion, precio:this.articulo.precio, stock:this.articulo.stock})
                  .then(response =>{
                    this.mostrar();
              }); 
            },             
            borrar:function(id){
             Swal.fire({
                title: '¿Confirma eliminar el registro?',   
                confirmButtonText: `Confirmar`,                  
                showCancelButton: true,                          
              }).then((result) => {                
                if (result.isConfirmed) {      
                      axios.post(url, {opcion:4, id:id}).then(response =>{           
                          this.mostrar();
                       });      
                  Swal.fire('¡Eliminado!', '', 'success')
                } else if (result.isDenied) {                  
                }
              });              
            },

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
            


            async erClick() {

              if ( this.Nivel_User == null || this.Nomb_User == null  || this.Depar_User == null || this.Correo_User == null || this.Pass_User == null) {
                   alert('Todos los Campos son requeridos'); // Puedes mostrar un mensaje de error al usuario
                 return;
              }    



            try {
              const response = await axios.post("http://localhost/PC/nuevo-project/backend/registro.php", 
                        {datos:JSON.stringify({Nivel_u:this.Nivel_User, Nomb_u:this.Nomb_User, Depar_u:this.Depar_User, Correo_u:this.Correo_User, Pass_u:this.Pass_User,}) 
                        }
                      )
                      .then(response =>{           
                        if (response.data.success) {
                          this.showSuccessMessage = true;
                          this.Nivel_User= null;
                          this.Nomb_User= null;
                          this.Depar_User= null;
                          this.Correo_User= null;
                          this.Pass_User= null;
                          alert('Registro Existoso');
                        }
                       });  
    
            } catch (error) {
              console.error(error);
              // Aquí puedes manejar errores si ocurre algún problema durante la solicitud
            }
          },
           
        
        }
    }
  
</script>



