<template>
    <div  ref="addedBookPopUp" class="booked-popup  slide-in-fwd-center " v-if="active" >
       <p>somone booked a trip!</p>
    </div>
</template>

<script>
import {EventBus} from '@/eventBus'
export default {
data(){return{
    active:false
}}
,name:'popup',
mounted(){
        EventBus.$on('sendpupup',()=>{this.active=true;
                        
           setTimeout(()=>{


        this.active=false;
    },3000) 
        });
   

}
}
</script>

<style>
.booked-popup{
    width: 239px;
    margin-left: 40vw;
    height: 36px;
    text-align: center;
    font-size: 1.4em;
    border-radius: 6px;
    background-color: lightgreen;
    position:fixed;
}

</style>
