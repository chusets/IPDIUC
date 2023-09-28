<template>
 
<v-col cols="12">
    <v-container>
        <v-text-field inset
            label="Titulo de Pregunta / Inquietud"
            filled
            :rules="[rules.required]"
            v-model="tituloP"
          ></v-text-field>
        <v-textarea
        label="Redacta Tu Pregunta / Inquietud"
        filled
        :rules="[rules.required]"
        v-model="Rpregunta">
        </v-textarea>
      
        <v-select 
          filled
          :items="items_departamento"
          :rules="[rules.required]"
          label="Seleccione un Departamento"
          v-model="Depar_UserP"
        ></v-select>
        <div class="text-center" >
        <v-btn
            color="indigo"
            @click.prevent="realizarPClick"> <span class="white--text">Guardar</span>
            </v-btn>
            <div v-if="showSuccessMessage">Registro exitoso</div>
        </div>
         
    </v-container>
</v-col>
            
  


                     


</template>




<script>
import axios from 'axios'
  
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    data () {
      return {
        showSuccessMessage: false,
        PreguntaArray:null,
        items_nivel: ['1', '2', '3'],
        items_departamento: ['A', 'B', 'C'],
        Rpregunta: null, Fecha_Preg: null, Depar_UserP: null, tituloP: null,
        arreglo:[],
        show1: false,
        Pass_User: null, Nomb_User: null, ID_User:null,
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
    
    mounted(){
      this.Fecha_Preg = this.printDate();
    
      
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
            realizarPClick() {
              
              
              

                axios.post("http://localhost/PC/nuevo-project/backend/realizarpregunta.php", 
                {
                    
                    datospregunta:JSON.stringify({ Preg:this.Rpregunta, Fecha_P:this.Fecha_Preg, Depar_UserPreg:this.Depar_UserP, tituloPreg:this.tituloP, ID_u_Preg:sessionStorage.getItem('ID')}) 
                })
                .then(response =>{ 
                this.PreguntaArray=response.data;
                console.log(this.PreguntaArray);
                }); 
                

             },
             
             printDate: function () {
              this.fecha = new Date().toLocaleDateString();
              if(this.fecha[2] == '/' && this.fecha[4] == '/')
              {
                  this.fecha_a=this.fecha.slice(5)
                  this.fecha_m=this.fecha.slice(3,-5);
                  this.fecha_d=this.fecha.slice(0,-7);
                  
              }else{
               
               if(this.fecha[1] == '/' && this.fecha[4] == '/' )
                {
                  
                  this.fecha_a=this.fecha.slice(5)
                  this.fecha_m=this.fecha.slice(2,-5);
                  this.fecha_d=this.fecha.slice(0,-8);
                  
                }else{
                  if(this.fecha[1] == '/' && this.fecha[3] == '/' )
                  {
                    
                    this.fecha_a=this.fecha.slice(4)
                    this.fecha_m=this.fecha.slice(2,-5);
                    this.fecha_d=this.fecha.slice(0,-7);
                  }else{}
                    
                    this.fecha_a=this.fecha.slice(6)
                    this.fecha_m=this.fecha.slice(3,-5);
                    this.fecha_d=this.fecha.slice(0,-8);
                }      
              }
              this.fecha_bd=this.fecha_a+ '/' +this.fecha_m+ '/' +this.fecha_d;
             
              return  this.fecha_bd;
      },
        
        }
    }
  
  


</script>
