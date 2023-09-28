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
             Preguntas Respondidas
          </th>

          <th class="text-body-1">
            Posicion
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td class="text-body-1">{{ item.name }}</td>
          <td class="text-body-1"> {{ item.posicion }}</td>
          <td class="text-body-1"> {{ item.preguntasr }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  </v-card-text>

<v-card-text>

  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-body-1 ">
            Usuario
          </th>
          <th class="text-body-1">
             Preguntas Respondidas
          </th>

          <th class="text-body-1">
            Posicion
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td class="text-body-1">{{ item.name }}</td>
          <td class="text-body-1"> {{ item.posicion }}</td>
          <td class="text-body-1"> {{ item.preguntasr }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  </v-card-text>
  
</template>


<script>
  export default {
    data () {
      
      return {
        RankingAport:[],
          desserts: [
          {
            name: 'Pedro Ramirez',
            posicion: 100,
            preguntasr: 1,
          },
          {
            name: 'Carlos Perez',
            posicion: 98,
            preguntasr: 2,
          },
          {
            name: 'Maria Torres',
            posicion: 75,
            preguntasr: 3,
          },
          {
            name: 'Carla Lopez',
            posicion: 70,
            preguntasr: 4,
          },
          {
            name: 'Manuel Romero',
            posicion: 68,
            preguntasr: 5,
          },
          {
            name: 'Marian Contreras',
            posicion: 50,
            preguntasr: 6,
          },
          {
            name: 'Mirta Alvarez',
            posicion: 42,
            preguntasr: 7
          },
          {
            name: 'Jesus Leon',
            posicion: 39,
            preguntasr: 8,
          },
          {
            name: 'Estefania Roldan',
            posicion: 10,
            preguntasr: 9,
          },
        ],
      }
    },

     beforeCreate() {
      if(sessionStorage.getItem('Nombre') == null  ){

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
