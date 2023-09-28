<template>
 
  
            
  


                     


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
        
        items_nivel: ['1', '2', '3'],
        items_departamento: ['A', 'B', 'C'],
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
              
                      
                  axios.post("http://localhost/PC/nuevo-project/backend/login.php", 
                  {
                     datoslogin:JSON.stringify({Nomb_u:this.Nomb_User, Pass_u:this.Pass_User,}) 
                  })
                  .then(response =>{ 
                             
                  this.arreglo=response.data;
                           
                  if(this.arreglo.length>0)
                  {
                    sessionStorage.setItem('Nombre', this.Nomb_User );
                    sessionStorage.setItem('ID', this.arreglo[0].ID_User);
                    sessionStorage.setItem('Nivel', this.arreglo[0].Nivel_User);
                    this.$router.push('/PerfilNivel1');

                  }else{
                    console.log('No es correcto.')
                  }
                              
                  });  

                            
                            


                         
                          
                         

            }
        
        }
    }
  
  


</script>
<style>

.Titulologin
{
  font-size: xx-large;
  text-align: center;
}
</style>
