<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      mobile-break-point="600"
      fixed
      app
      width="200"
    >
      <v-list dense>
        <v-list-tile to="home">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-ripple to="about" >
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-ripple to="login" >
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-ripple to="/reservations" >
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Reservations</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


      </v-list>
      <v-btn >
        <router-link to="/reservations">reservations</router-link>
      </v-btn>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Lazy Lizard Hostel</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout column>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import api from './api/api.js'
  export default {
    created: function(){
      //load initial space information
      var self = this;
      api.getSpaces().then( function(response){
        console.log("spaces:",response);
        self.$store.commit('setSpaces', response.data.spaces);
      });
      api.getSpaceTypes().then( function(response){
        console.log("spaceTypes:",response);
        self.$store.commit('setSpaceTypes', response.data.space_types);
      });
      api.getSelectGroups().then( function(response){
        console.log("selectGroups:",response);
        self.$store.commit('setSelectGroups', response.data.selectGroups);
      });
    },
    data: () => ({
      drawer: null
      
    }),
    props: {
      source: String
    }
  }
</script>

<style>

</style>
