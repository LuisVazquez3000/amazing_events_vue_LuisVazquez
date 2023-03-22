const {createApp}=Vue;
const url =' https://mindhub-xj03.onrender.com/api/amazing';

createApp({
	data(){
		return{
			titulo:'',
			eventosUpcming:[],
			categoriesUpcoming:[],
			eventosUpcomingFilter:[],
			checkedUp:[],
			searchInput:''
		}
	}
	,created(){
		fetch(url)
			.then(resp=>resp.json())
			.then(data=>{	
				if (document.title.includes('details')) {
					let search = location.search;
					let params = new URLSearchParams(search);
					let id = params.get('id');
					console.log(id);
				}
				
				this.eventosUpcming = data.events.filter(obj => obj.estimate)
				this.eventosUpcomingFilter = this.eventosUpcming;
				this.categoriesUpcoming =[...new Set(this.eventosUpcming.map(e=>e.category))];
				this.titulo=document.title;
			}
			)
	},
	methods:{
		filtrar(e){
			this.eventosUpcomingFilter = this.eventosUpcming.filter(ev => {
				return (this.checkedUp.includes(ev.category) || this.checkedUp.length === 0) && ev.name.toLowerCase().trim().includes(this.searchInput.toLowerCase().trim())
			})
			console.log(e.target.value);
		}
	}
}).mount("#app")
