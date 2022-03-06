<template>
  <div id="app" :class="mode">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      
      <router-link to="/" class="navbar-brand">SUP</router-link>
      <div class="navbar-nav mr-auto">
        
        <li class="nav-item">
          <router-link to="/Items" class="nav-link">Shop</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
   <div class="switch">
     <Header :mode="mode" @toggle="toggle" />
     
  </div>
        
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: "app",
  components: {
    Header
  },
  
  data() {
    return {
      mode: 'light'
    }
  },

  created () {
    window.addEventListener('keyup', this.keyPress)
  },
  methods: {
    keyPress (e) {
      if (e.key === 't') {
        this.toggle()
      }
    },
    toggle () {
      if (this.mode === "dark") {
        this.mode = "light"
      } else {
        this.mode = "dark"
      }
    }
  }
};
</script>
<style>

.app {
  width: 100vw;
  min-height: 100vh;
  background: #F3F3F3;
  color: #15202B;
  transition: background 0.3s ease-in-out;
  
  background: white;
  color: #15202B;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
 
}
.dark {
height: 100%;
background: #192734 ;
color: #8d8d8d;
}
.navbar-brand{
  padding: 10px;

}
.switch{
  position: absolute;
  right: 10px;

}

</style>

