<template>
  <v-app id="inspire" dark>
    <div v-if="loaderShown">
      <Spin/>
    </div>  
    <v-navigation-drawer
      v-model="drawer"
      mobile-break-point="600"
      fixed
      app
      width="200"
    >
      <v-list dense>
        <!--
          Note the "/" before each route.
          If these are absent, it will route correctly when clicking on these links
          but after a programatically executed route change (ie /Sreservations/13),
          these links will no longer work correctly.
          Confusing as hell, point being
          DO NOT OMIT THE PRECEDING FORWARD SLASH
        -->
        <v-list-tile to="/home">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-ripple to="/about" >
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile v-ripple to="/login" >
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile v-ripple to="/logoff" >
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Logoff</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile v-ripple to="/reservations" >
          <v-list-tile-action>
            <v-icon>view_comfy</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Reservations</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile v-ripple to="/resTable">
          <v-list-tile-action>
            <v-icon>view_comfy</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >ResTable</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> 

        <v-list-tile v-ripple to="/reservationView">
          <v-list-tile-action>
            <v-icon>view_comfy</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Reservation View</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> 

        <v-list-tile v-ripple to="/eResView">
          <v-list-tile-action>
            <v-icon>view_comfy</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >eResView</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>              

      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed dense app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>

    </v-toolbar>
    <v-content>
      <v-container fluid >
          <router-view></router-view>
      </v-container>
    </v-content>
    <!--
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
    -->
  </v-app>
</template>

<script>
  import api from './api/api.js'
  import Spin from './components/spin.vue' 
  export default {
    components: {
      Spin
    },
    created: function(){
      //load initial space information
      var self = this;
      api.getSpaces().then( function(response){
        self.$store.commit('setSpaces', response.data.spaces);
      });
      api.getSpaceTypes().then( function(response){
        self.$store.commit('setSpaceTypes', response.data.space_types);
      });
      api.getSelectGroups().then( function(response){
        self.$store.commit('setSelectGroups', response.data.selectGroups);
      });
      api.getReservations().then( function(response){
        self.$store.commit('setReservations', response.data);
      });
    },
    computed: {
      loaderShown(){
        return this.$store.getters.getLoaderShown
      },
      routeIsResTable(){
        if(this.$route.name == 'resTable'){
          return true;
        }else{
          return false;
        }
      }
    },
    data: function(){
        return {
            drawer: null,
            user: this.$store.getUser,
            resDatePicker: false,
            resStart: '2019-05-21'
         }
    },
    methods: {

    },
    props: {
      source: String
    }
  }
</script>

<style>


</style>
