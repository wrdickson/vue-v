<template>
  <div>
    hello
  </div>

</template>

<script>
  

  export default{
    name: 'EResView',
    created: function(){
      //console.log('Vue', Vue)
    },
    data: function(){
      return{
        tableData: [
            {"name":"asdf","tel":"asdf"}
        ],
        columns: [
            {field: 'name', title:'First Column', width: 100, titleAlign: 'center',columnAlign:'center'},
            {field: 'tel', title: 'Second Colunmn', width: 260, titleAlign: 'center',columnAlign:'center'}          
        ]
      }
    },
    methods: {
      clicka: function(e){
        console.log("e",e)
      },
      rowClick: function(e){
        console.log("c", e)
      }
    }    
  }
</script>

<style scoped>

</style>