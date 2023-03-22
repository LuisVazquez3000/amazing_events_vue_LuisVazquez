const { createApp  }= Vue;
const url =' https://mindhub-xj03.onrender.com/api/amazing';



createApp({
	data(){
		return{
		}
	},
	created(){
		fetch(url)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error))
	}
	
	}).mount("#app")