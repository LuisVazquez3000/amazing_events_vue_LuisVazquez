const { createApp } = Vue;

const url =' https://mindhub-xj03.onrender.com/api/amazing';

createApp({
	data(){
		return{
			eventos:[],
			categories:[],
			valorBusqueda:'',
			checked:[],
			eventosFiltrados:[],
			titulo:'',
			eventoFiltrado:undefined
		}
	},
	created(){
		fetch(url)
			.then(resp => resp.json())
			.then(data=>{
				if (document.title.includes('details')) {
					let searchId = location.search;
					let params = new URLSearchParams(searchId);
					let id = params.get('id');
					this.eventoFiltrado = data.events.find(obj =>obj._id == id)
					console.log(this.eventoFiltrado);
					this.titulo = this.eventoFiltrado.name;
				}
				this.eventos = data.events;
				this.eventosFiltrados = this.eventos;
				this.categories =[...new Set(this.eventos.map(e=>e.category))];
			})		
			.catch(err=>console.log(err))
		console.log("se creo la app");	
	},
	methods:{
		filtrar(e){
			this.eventosFiltrados =this.eventos.filter(evento=>{
				return (this.checked.includes(evento.category) || this.checked.length === 0) && evento.name.toLowerCase().trim().includes(this.valorBusqueda.toLowerCase().trim())
			})
			console.log(e.target.value);
		}
	},
	computed:{
		
	}
}).mount('#app')

