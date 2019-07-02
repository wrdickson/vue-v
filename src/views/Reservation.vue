<template>
  <div>
    <v-layout>
      <v-btn outline large color="green">Check In</v-btn>
      <v-btn outline large disabled color="red">Check Out</v-btn>
      <v-btn outline large color="blue">Folio</v-btn>
    </v-layout>
    <v-form class="compactForm">
      <v-layout row wrap >
        <v-flex xs6 sm4 md3>
        
          <!-- Checkin datepicker -->
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
                v-model="checkinFormatted"
                label="Checkin"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
              v-model="reservation.checkin" 
              @input="ciInput"
            />
          </v-menu>
        </v-flex>
        
        <!-- Checkout datepicker -->
        <v-flex xs6 sm4 md3>
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
                v-model="checkoutFormatted"
                label="Checkout"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
              v-model="reservation.checkout" 
              @input="coInput"
              />
          </v-menu>
        </v-flex>
        
        <!-- Space picker dialog -->
        <v-flex xs6 sm4 md3>
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
                    <v-select
                      :items="item.groups"
                      :label="item.title"
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
        
        <!-- People select -->  
        <v-flex xs3 sm3 md1>
          <v-select
            :items="peopleOptions"
            v-model="peopleSelect"
            label="People"
            item-text="text"
            item-value="value"
          ></v-select>        
        </v-flex> 

        <!-- Beds select -->  
        <v-flex xs3 sm3 md1>
          <v-select
            :items="bedOptions"
            v-model="bedsSelect"
            label="Beds"
            item-text="text"
            item-value="value"
          ></v-select>        
        </v-flex>     
   
        <v-flex xs2 sm2>
          <v-btn color="primary" @click="revert">
            <v-icon left>restore</v-icon>
              Revert
          </v-btn>  
        </v-flex>
        
      </v-layout>
    </v-form>
    <Customer/>

    

  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
export default{
  components: {
    Customer: () => import('./../components/customer.vue')
  },
  computed:{
    bedsSelect: {
      get: function(){
        return this.reservation.beds;
      },
      set: function(val){
        this.reservation.beds = val;
      }
    },
    checkinFormatted: {
      get: function(){
        return moment(this.reservation.checkin).format('MMM DD YYYY');
      }
    },
    checkoutFormatted: {
      get: function(){
        return moment(this.reservation.checkout).format('MMM DD YYYY');
      }
    },
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
      //note that value is a string . . . problems until I figured
      //this out
      bedOptions: [
        { text: "1", value: '1' },
        { text: "2", value: '2' },
        { text: "3", value: '3' },
        { text: "4", value: '4' },
        { text: "5", value: '5' },
        { text: "6", value: '6' },
        { text: "7", value: '7' },
        { text: "8", value: '8' },
        { text: "9", value: '9' },
        { text: "10", value: '10' },
        { text: "11", value: '11' },
        { text: "12", value: '12' }       
      ],
      //note that value is a string . . . problems until I figured
      //this out
      peopleOptions: [
        { text: "1", value: '1' },
        { text: "2", value: '2' },
        { text: "3", value: '3' },
        { text: "4", value: '4' },
        { text: "5", value: '5' },
        { text: "6", value: '6' },
        { text: "7", value: '7' },
        { text: "8", value: '8' },
        { text: "9", value: '9' },
        { text: "10", value: '10' },
        { text: "11", value: '11' },
        { text: "12", value: '12' }       
      ],
      //these control the visibility of the datepickers
      checkinMenu: false,
      checkoutMenu: false,
      //clone for local data so we don't mutate the store value
      reservation: JSON.parse ( JSON.stringify ( this.$store.getters.getSelectedReservation) ),
      originalReservation: this.$store.getters.getSelectedOriginalReservation,
      spaceDialog: false,
      spaces: this.$store.getters.getSpaces,
      spaceTypes: this.$store.getters.getSpaceTypes
    }
  },
  methods: {
    ciInput: function(){
      this.checkinMenu = false;
      this.$refs.ciMenu.save(this.reservation.checkin);
    },
    coInput: function(){
      this.checkoutMenu = false;
      this.$refs.coMenu.save(this.reservation.checkout);
    },
    changeRoute: function(){
      console.log("changeRoute()");
    },
    revert: function(){
      //let oRes = this.$store.getters.getSelectedReservation;
      console.log(this.$store.getters.getSelectedReservation.checkin);
      this.reservation = JSON.parse(JSON.stringify(this.$store.getters.getSelectedReservation));
    },
    spaceModal: function(){
      this.spaceDialog = true;
    },
    spaceSelect: function(evt){
      //evt is the value from the the select
      //which is the space_id
      //set space_id
      this.reservation.space_id = evt;
      //set space_code
      this.reservation.space_code = this.$store.getters.getSpaces[evt].space_code;
      //close the modal
      this.spaceDialog = false;
    }
  },
  props: {
    reservationid: String
  },
  watch: {
    reservation: function(val, oldVal){
      console.log("res changed");
    }
  }
}
</script>

<style scoped>
.compactForm{

}
.spaceList ul{
  list-style: none;
}
.spaceList li{
  display: inline;
}


</style>