<template>

    <div >
        <h3><center>Manuales del Departamento de Biología</center></h3>
        <br>
        <v-card-text >
        <h3>Manual 1 Departamento de Biología</h3>
         <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual 2 Departamento de Biología</h3>
        <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual 3 Departamento de Biología</h3>
        <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual 4 Departamento de Biología</h3>
        <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual 5 Departamento de Biología</h3>
        <a href="#">
            Descargar
        </a>
        <br><br> <h3>Manual 6 Departamento de Biología</h3>
        <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual 7 Departamento de Biología</h3>
        <a href="#">
            Descargar
        </a> 
        <br><br><h3>Manual 8 Departamento de Biología</h3>
        <a href="#">
            Descargar
        </a>
        <br><br><h3>Manual 9 Departamento de Biología</h3>
        <a href="#">
            Descargar
        </a>
        </v-card-text>
  </div>


</template>


<script>
  export default {
    data () {
      return {
      
      }
    },

    beforeCreate() {
      if(sessionStorage.getItem('Nombre') == null  ){
        sessionStorage.setItem('validadorlogin', true);
        this.$router.push('/login');
      }
    },
  }
</script>