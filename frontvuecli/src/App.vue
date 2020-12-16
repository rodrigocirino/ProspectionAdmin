<template>
  <div class="container-fluid" id="app">
    <div id="nav">
      <router-link to="/home" class="ml-2 mr-2">Home</router-link> |
      <router-link to="/prospectos" class="ml-2 mr-2">Prospectos</router-link> |
      <router-link to="/cliente" class="ml-2 mr-2">Cliente</router-link> |
      <router-link to="/vendedor" class="ml-2 mr-2">Vendedor</router-link>

      <router-link v-if="this.$store.state.logged!==true" to="/login" class="ml-5 mr-5"> Login </router-link>
      <router-link v-if="this.$store.state.logged===true" to="/login" v-on:click.native="logout()" class="ml-5 mr-5 text-danger"> Logout </router-link>
      <b-badge v-if="this.$store.state.emailLoggedIn" variant="info" size="lg"> {{ this.$store.state.emailLoggedIn }} </b-badge>

    </div>

    <div class="col-1 icon-logo position-absolute">
      <b-iconstack font-scale="5">
        <b-icon stacked icon="circle-fill" variant="primary"></b-icon>
        <b-icon stacked icon="cart4" scale="0.5" variant="white"></b-icon>
        <b-icon stacked icon="circle" variant="secondary"></b-icon>
      </b-iconstack>
    </div>

    <div class="row logo justify-content-center">


      <div class="col-6"><h4 class="text-center"> Sistema interno de prospecção e vendas. </h4></div>
    </div>

    <br />

    <!-- MAGIC HAPPENS HERE -->
    <!--SPA SINGLE PAGE APPLICATION LOADS ALL SUB-CONTENTS HERE, WHEN YOU CLICK IN A ROUTER LINK ABOVE. !-->
    <router-view/>

    <hr/>

    <footer class="my-5 text-muted text-center text-small">
      <p class="mb-1">© 2020 - 2021 Vendas On-line</p>
      <ul class="list-inline">
        <li class="list-inline-item"><a href="#">Github</a></li>
        <li class="list-inline-item"><a href="#">Linkedin</a></li>
        <li class="list-inline-item"><a href="#">Bootstrap</a></li>
      </ul>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mockAccount: {
        username: "nraboy",
        password: "password"
      }
    }
  },
  watch: {
    mockAccount: function(val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    }
  },
  created: function() {

  },
  mounted() {
    if(this.$store.state.logged !== true) {
      if (this.$router.history.current.path !== '/login') {
        this.$router.push('/login')
      }
    }
  },
  methods: {
      logout(){
        this.$store.commit('loggedOut');
      }
  }
}
</script>


<style lang="scss">
body{
  background-color: #f5f5f5 !important;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
pre{
  text-align: initial;
  margin: 1em;
}
.logo{
  background-color: #42b983;
}
.icon-logo{
  margin-left: 10%;
  margin-top: -25px;
}
</style>
