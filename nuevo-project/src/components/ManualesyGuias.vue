<template>
  <div class="about">
    <h1>Departamento A</h1>
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