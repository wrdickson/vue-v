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
        <div>folio id: {{ folio.id }}</div>
        <table class="salesTable">
          <thead>
            <tr>
              <th>Date</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in folio.sales" v-bind:key="sale.id">
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
      

        // Code that will run only after the
        // entire view has been rendered
      
        api.getSalesItems().then(function( response ){
          console.log("self", self);
          console.log("response",response);
          self.salesItems = response.data.items_by_group;

        });

        //don't throw an error when this renders before the reservation is loaded
        //in a parent component
        if(this.reservation.hasOwnProperty('id')){
          //load the folio

        }
        
      
    },
    data: function(){
      return {

        salesItems: {}
      }
    },
    name: 'Folio',
    props: {
      reservation: Object,
      user: Object,
      folio: Object
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