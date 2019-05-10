<template>
  <div>
    <v-layout row wrap class="indigo lighten-4">
      <v-flex xs6 sm4>
        <v-menu
          ref="ciMenu"
          v-model="checkinMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="reservation.checkin"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="reservation.checkin"
              label="Checkin"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="reservation.checkin" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="checkinMenu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.ciMenu.save(reservation.checkin)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      
      <v-flex xs6 sm4>
        <v-menu
          ref="coMenu"
          v-model="checkoutMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="reservation.checkout"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="reservation.checkout"
              label="Checkout"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="reservation.checkout" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="checkoutMenu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.coMenu.save(reservation.checkout)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs6 sm4>
        <v-text-field
          label="Space"
          required
          v-model="spaceName"
          @click="spaceModal"
        ></v-text-field>
        <v-dialog
          v-model="spaceDialog"
          max-width="290"
        >
          <v-card>
            <v-card-text>
              <ul class="spaceList">
                <li v-for="item in selectGroups"
                  v-bind:key="item.title"
                >
                  {{ item.title }}
                  <v-select
                    :items="item.groups"
                    label="Space"
                    @change="spaceSelect"
                  >
                  </v-select>
                </li>
              
              </ul>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="spaceDialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>        
        
      </v-flex>
 
      
      <v-flex xs6 sm4>
        <v-select
          :items="peopleOptions"
          v-model="peopleSelect"
          label="People"

          item-text="text"
          item-value="value"
  
        ></v-select>        
      </v-flex>        
        
        
 
      <v-flex xs6 sm4>
        <v-btn color="primary" @click="revert">Revert</v-btn>  
      </v-flex>
      
    </v-layout>
    <Customer/>
    <v-layout row>
      <div>oReservation checkin: {{this.originalReservation.checkin}}</div>    
      <div>Reservation checkin: {{this.reservation.checkin}}</div>

      
    </v-layout>
    

  </div>
</template>

<script>
import _ from 'lodash'
export default{
  components: {
    Customer: () => import('./../components/customer.vue')
  },
  computed:{
     peopleSelect: {
      get: function(){
        return {
          text: this.reservation.people,
          value: this.reservation.people
          }
      },
      set: function(val){
        console.log("val",val);
        this.reservation.people = val;
      }
    }, 
    spaceName: function(){
      return this.$store.getters.getSpaces[this.reservation.space_id].description;
    },
    selectGroups: function(){
      return this.$store.getters.getSelectGroups;
    },
    spacesByType: function(){
      let self = this;
      let obj = {};
      let arr = [];
      _.each(this.spaceTypes, function(type){
          console.log("type @ it",type);
          arr[type.id] = _.filter(self.spaces, function(space){
            return space.space_type == type.id;
          });
      });
      return arr;
    }
  },
  data: function(){
    return{
      peopleOptions: [
        {
          text: "1",
          value: '1'
        },
        {
          text: "2",
          value: '2'
        },
        {
          text: "3",
          value: '3'
        },
        {
          text: "4",
          value: '4'
        }      
      ],
      checkinMenu: false,
      checkoutMenu: false,
      //clone for local data so we don't mutate the store value
      reservation: JSON.parse ( JSON.stringify ( this.$store.getters.getSelectedReservation) ),
      originalReservation: this.$store.getters.getSelectedOriginalReservation,
      pSelect: [1,2,3,4,5,6,7,8,9,10,11,12],
      spaceDialog: false,
      spaces: this.$store.getters.getSpaces,
      spaceTypes: this.$store.getters.getSpaceTypes,
    }
  },
  methods: {
    changeRoute: function(){
      console.log("changeRoute()");
    },
    revert: function(){
      //let oRes = this.$store.getters.getSelectedReservation;
      console.log(this.$store.getters.getSelectedReservation.checkin);
      this.reservation = JSON.parse(JSON.stringify(this.$store.getters.getSelectedReservation));
    },
    spaceModal: function(){
      console.log("modal");
      console.log(this.$store.getters.getSpaces.length);
      //check to see if spaces are loaded
    

      this.spaceDialog = true;
    },
    spaceSelect: function(evt){
      //evt is the value from the the select
      //which is the space_id
      //set the data
      this.reservation.space_id = evt;
    }
  },

  props: {
    reservationid: String
  }
}
</script>

<style>
.spaceList ul{
  list-style: none;
}
.spaceList li{
  display: inline;
}


</style>