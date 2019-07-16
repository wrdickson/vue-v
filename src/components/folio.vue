<template>
  <div class="folioWrapper">
    <h3>Folio</h3>
        <!--
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
        -->
        <div>reservation.id: {{reservation.id}}</div>
        <div>folio id: {{ folio.id }}</div>
        <v-btn @click="testSales">testSales</v-btn>

        
        <table class="salesTable">
          <thead>
            <tr>
              <th>Date</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in computedFolio.sales" v-bind:key="sale.id">
              <td>{{ sale.sale_date }}</td>
            </tr>
          </tbody>
        </table>
       
        
  </div>

</template>

<script>
  import api from './../api/api.js'
  import axios from 'axios'
  export default{
    computed: {
      computedwFolio(){
        return this.$store.getters.getSelectedFolio
      }
    },
    created: function(){
    //  let self = this;
    //    api.getSalesItems().then(function( response ){
    //      self.salesItems = response.data.items_by_group;
    //    });
    },
    data: function(){
      return {
        folio: this.$store.state.selectedFolio,
   
        salesItems: {}
      }
    },
    methods: {
      testSales: function(){
        axios.get('/api/sales/2').then( function (response){
          console.log("sales response:", response);
        });

      }

    },
    name: 'Folio',
    props: {
      reservation: Object
    },
    watch: {
      reservation: function( val ){
        console.log("reservation changed @ folio", val.folio);
        this.$store.dispatch('loadFolio', val.folio);
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