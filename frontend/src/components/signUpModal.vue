<template>
 <transition name="modal-fade">
    <div class="modal-backdrop slide-in-fwd-center">
      <div class="modal">
        <button class="close-button" @click="close">x</button>
        <h1>Sign-up!</h1>
          <form>
    <label for="username">Username<input v-model="username" type="text"></label>
    <label for="email"> Email<input v-model="email" type="text"></label>
    <label for="Password">Password<input v-model="password" type="password"></label>
    <label for="confirmPassword">Confirm Password<input v-model="confirmPassword" type="password"></label>
    <input type="button" value="Sign Up" @click.prevent="onSubmit">
    <a href="#">I already have an account</a>
  </form>
      </div>
    </div>
  </transition>
</template>
 
<script>
import userService from '../services/user-service.js'
export default {
  name: "sign-up",
  data() {
      return{
          username:null,
          password:null,
          confirmPassword:null,
          email:null,
      }
  },
  methods:{
    close(){
      this.$emit('close');
    },
      onSubmit(){
         if((this.username)&&(this.password)&&(this.email))
         {
             if(this.password===this.confirmPassword)
             {
                 userService.add({username:this.username,password:this.password,email:this.email})
                 .then(()=>
                 {
                   console.log("success!! return is signup")
                     this.$emit('close');
                   })
                 .catch(err=>console.log('badd sign up ',err))
             }
             else{
                 console.log('bad pass')
             }
         }
         else console.log('faild')
      }
  }

       
    
    
};
</script>

<style scoped>
.close-button {
  width: 21px;
  text-align: center;
  border-radius: 50%;
  background-color: lightblue;
}
.bottom-section {
  margin-top: 30px;
}
h1 {
  font-size: 2rem;
  text-align: center;
  padding-bottom: 40px;
  padding-top: 17px;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999999999;
}

.modal {
  margin-top: 90vh;
  position:fixed;
  margin-top:25vh;
  background: #ffffff;
  box-shadow: 2px 2px 10px 1px;
  display: flex;
  flex-direction: column;
  z-index: 999999999999;
  width: 400px;
  height: 450px;
  color:#383838;
}
span {
  display: inline-block;
  padding: 10px 0;
  font-size: 25px;
}
form {
  padding: 0 35px;
}
input[type="text"],
input[type="password"] {
  font-family: "Hammersmith One", sans-serif;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 20px;
  border: none;
  font-size: 14px;
  border-bottom: 2px solid #9fb1bc;
}
input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #3d348b;
}
form label {
  display: block;
  text-align: left;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 2px;
  color: #9fb1bc;
}

input[type="button"] {
  width: 100%;
  font-family: "Hammersmith One", sans-serif;
  text-transform: uppercase;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid #3d348b;
  border-radius: 5px;
  background: #3d348b;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.5s;
}
input[type="button"]:hover {
  opacity: 0.8;
}
form a {
  display: block;
  margin-top: 10px;
  text-align: right;
  color: #9fb1bc;
  font-size: 12px;
}
form a:hover {
  color: #000;
}
.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>