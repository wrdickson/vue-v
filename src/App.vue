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
      <div v-if="user.userId > 0">
        <v-btn
          v-if="shift.id == 0"
          @click="openShift" 
          color="success">
        Open Shift
        </v-btn>
        <v-btn
          v-if="shift.id > 1" 
          @click="closeShift" 
          color="success">
        Close Shift
        </v-btn>
      </div>
      <v-list dense>
        <!--
          Note the "/" before each route.
          If these are absent, it will route correctly when clicking on these links
          but after a programatically executed route change (ie /reservations/13),
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
        
        <v-list-tile  v-if="!userIsLoggedIn" v-ripple to="/login" >
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile  v-if="userIsLoggedIn" @click="logoff" >
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Logoff</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- from here down, only visible to logged in users -->
        <div v-if="user.userId > 0">
          <v-list-tile v-ripple to="/resTable">
            <v-list-tile-action>
              <v-icon>view_comfy</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title >ResTable</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <!-- from here down, only visible to logged userw permission > 7 --> 
        <div v-if="user.permission > 7">
          <v-list-tile v-ripple to="/adminPanel">
            <v-list-tile-action>
              <v-icon>view_comfy</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title >Admin Panel</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>


         </div>        

      </v-list>
      <div>
        ShiftId: {{ shift.id }} <br/>
        UserIsLoggedIn: {{ userIsLoggedIn }}
      </div>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed dense app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Lazy Lizard Reservations</v-toolbar-title>
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
  import moment from 'moment'
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
      api.getSaleTypes().then( function(response){
        console.log("sale types", response );
      });
      api.getTaxTypes().then( function( response ){
        self.$store.commit( 'setTaxTypes', response.data.tax_types );
      });
    },
    computed: {
      loaderShown: function(){
        return this.$store.getters.getLoaderShown
      },
      routeIsResTable: function(){
        if(this.$route.name == 'resTable'){
          return true;
        }else{
          return false;
        }
      },
      shift: function(){
        return this.$store.getters.getShift
      },
      user: function(){
        return this.$store.getters.getUser
      },
      userIsLoggedIn: function(){
        if(this.user.userId > 0){
          return true;
        } else {
          return false;
        }
      }
    },
    data: function(){
        return {
            drawer: null,
            
            resDatePicker: false,
            resStart: '2019-05-21'
         }
    },
    methods: {
      closeShift: function(){
        console.log("closeShift()");
      },
      logoff: function(){
        //logoff
        console.log("user before logoff", this.user);
        this.$store.commit('setUserToGuest');
        console.log("user after logoff", this.user);
        api.logoff(this.user.userId, this.user.key).then( (response ) => {
            console.log("logoff response:", response);
        });
        //regardless, nav home
        this.$router.push('home');
      },
      openShift: function(){
        let self = this;
        let startDate = moment();
        api.openShift(this.user, startDate).then( function(response){
          console.log("response");
          self.$store.commit('setShift', response.data.shift);
        });

      }
    },
    name: 'App',
    props: {
      source: String
    }
  }
</script>

<style>

</style>
