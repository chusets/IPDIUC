<template>
  
  <v-card-text>

  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-body-1 ">
            Usuario
          </th>
          <th class="text-body-1">
             Respuestas y Comentarios Aprobados
          </th>

          <th class="text-body-1">
            Posicion
          </th>
        </tr>
      </thead>
      <tbody>
        
        <tr
          v-for="(RankingApor, index) in RankingAport"
        >
          <td class="text-body-1">{{ RankingApor.Nombre_User }}</td>
          <td class="text-body-1"> {{ RankingApor.Num_Resp }}</td>
          <td class="text-body-1"> {{ index+1 }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  </v-card-text>


  
</template>


<script>
  import axios from 'axios';
  export default {
    data () {
      
      return {
        RankingAport:[],
          
      }
    },

    beforeCreate() {
      if(sessionStorage.getItem('Nombre') == null  ){
        sessionStorage.setItem('validadorlogin', true);
        this.$router.push('/login');
      }
    },mounted(){
        axios.post("http://localhost/PC/nuevo-project/backend/getRanking.php", 
        {
            
        })
        .then(response =>{           
              this.RankingAport=response.data;
        })  
    },
    methods: {
     
    },


  }
</script>

<style>

.Titulologin
{
  font-size: xx-large;
  text-align: center;
}
</style>
