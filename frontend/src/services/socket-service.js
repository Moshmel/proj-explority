import io from 'socket.io-client';
import store from '../store'
const socket = io(':3003');
init();
function init(userId){
	socket.on('usernum',(online)=>{
	store.dispatch('userCount',{online});
	});
	socket.emit('take', {userId});
    socket.on('fromserver',({data})=>{console.log('from server',data)})
	socket.on('someonebooked',()=>{

		store.dispatch('bookedActivity');
	})
    
	
}


function emit(eventName, data){
	socket.emit(eventName, data)
}

function on(eventName, cb) {
	socket.on(eventName, cb)
}


export default {
emit,on
}