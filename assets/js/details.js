const {createApp}=Vue;
const url =' https://mindhub-xj03.onrender.com/api/amazing';

createApp({
	data(){
		return{
		eventoFiltrado:[],
		titulo:""	
	}
	}
	,created(){
		fetch(url)
			.then(resp=>resp.json())
			.then(data=>{
					let searchId = location.search;
					let params = new URLSearchParams(searchId);
					let id = params.get('id');
					if (!id) {
						id=1
					}
					this.eventoFiltrado = data.events.find(obj =>obj._id == id)
					console.log(this.eventoFiltrado);
			}
			)
	},
	methods:{
	
	}
}).mount("#app")
