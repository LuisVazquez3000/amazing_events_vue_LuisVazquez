const {createApp}=Vue;
const url =' https://mindhub-xj03.onrender.com/api/amazing';

createApp({
	data(){
		return{
			titulo:'',
			eventosPast:[],
			categoriesPast:[],
			eventosPastFilter:[],
			checkedPast:[],
			searchInput:'',
			titulo:""
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
				
				this.eventosPast = data.events.filter(obj => obj.assistance)
				this.categoriesPast =[...new Set(this.eventosPast.map(e=>e.category))];
				this.eventosPastFilter = this.eventosPast;
				this.titulo=document.title;
			}
			)
	},
	methods:{
		filtrar(e){
			this.eventosPastFilter = this.eventosPast.filter(ev => {
				return (this.checkedPast.includes(ev.category) || this.checkedPast.length === 0) && ev.name.toLowerCase().trim().includes(this.searchInput.toLowerCase().trim())
			})
			console.log(e.target.value);
		}
	}
}).mount("#app-past")
