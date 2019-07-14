<template>
  <div class="folioWrapper">
    <h3>Folio</h3>
      
        <span class="btnDiv">
            <v-menu 
              v-for="salesItem in salesItems" :key="salesItem.id" 
              offset-y >
              <template v-slot:activator="{ on }">
                <v-btn
                  class="tButton"
                  color="primary"
                  dark
                  v-on="on"
                >
                  {{ salesItem.title}}
                </v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-for="item in salesItem.groups"
                  :key="item.id"
                >
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
        </span>
        <h3>Sales:</h3>
        <div>folio id: {{ folioData.id }}</div>
        <div>folioTrigger:  {{ folioData.folioTrigger }} </div>
        <table class="salesTable">
          <thead>
            <tr>
              <th>Date</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in folioData.sales" v-bind:key="sale.id">
              <td>{{ sale.sale_date }}</td>
            </tr>
          </tbody>
        </table>
  </div>

</template>

<script>
  import api from './../api/api.js'
  export default{
    computed: {

    },
    created: function(){
      let self = this;
        api.getSalesItems().then(function( response ){
          self.salesItems = response.data.items_by_group;
        });
    },
    data: function(){
      return {
        folioData: {
          folioTrigger: 0,
          id: '0',
          sales: [],
          payments: [],
          customer: '0',
          reservation: '0'
        },
        folioTrigger: 1,
        salesItems: {}
      }
    },
    methods: {
      loadFolio: function(){
        let self = this;
        api.getFolio(this.user, this.reservation.folio).then(function(response){
          self.folioData = response.data.folio;
          self.folioTrigger += 1;
          console.log("folioData after set", self.folioData);
        });
      },
    },
    name: 'Folio',
    props: {
      reservation: Object,
      user: Object
    },
    watch: {
      'reservation.id': function(val, oldVal){
        console.log("reservation changed. val: ", val, " oldVal:", oldVal);
        this.loadFolio();
      }
    }
  }
</script>

<style>
.folioWrapper{
  border: 2px solid green;
  border-radius: 5px;
  padding: 4px;
  margin-bottom: 5px;
}
.tButton{
  margin-left: 1px;
  margin-right: 1px;
}
.btnDiv{
  display: -webkit-flex; /* Safari */
  -webkit-flex-wrap: wrap; /* Safari 6.1+ */
  display: flex;   
  flex-wrap: wrap;

}

</style>