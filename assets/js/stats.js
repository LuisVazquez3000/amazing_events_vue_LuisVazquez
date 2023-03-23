const {
	createApp
} = Vue;
const url = ' https://mindhub-xj03.onrender.com/api/amazing';



createApp({
	data() {
		return {
			dataEvents: [],
			upcomingEvents: [],
			pastEvents: [],
			arrayPastnew: [],
			arrayUpcomingnew: [],
			arrayCalculation:[]
		}
	},
	created() {
		fetch(url)
			.then(resp => resp.json())
			.then(data => {
					this.dataEvents = data.events;
					this.upcomingEvents = this.dataEvents.filter(ev => ev.estimate)
					this.pastEvents = this.dataEvents.filter(ev => ev.assistance)
					console.log(this.addTable(this.upcomingEvents, this.arrayUpcomingnew));
					console.log("--------------------");
					console.log(this.addTable(this.pastEvents, this.arrayPastnew));
					console.log(this.highCapacity(this.dataEvents));
					console.log(this.highAttendace(this.dataEvents));
					console.log(this.lowAttendace(this.dataEvents));
					
					this.arrayCalculation = [this.highAttendace(this.dataEvents),this.lowAttendace(this.dataEvents),this.highCapacity(this.dataEvents)]
					
					console.log(arrayCalculation);
				}


			)
			.catch(error => console.log(error))
	},
	methods: {
		calculo_porcentaje(array) {
			return (array.reduce((total, evento) => {
				evento.estimate == undefined ? total += (evento.assistance / evento.capacity) : total += (evento.estimate / evento.capacity)
				return total;
			}, 0) * 100 / array.length).toFixed(2)
		},
		profits(array) {
			return array.reduce((total, evento) => {
				evento.assistance == undefined ? total += (evento.estimate * evento.price) : total += (evento.assistance * evento.price)
				return total;
			}, 0)
		},
		addTable(arrayEvts, arrayNuevo) {
			let categories = [...new Set(arrayEvts.map(elm => elm.category))];
			categories.forEach(category => {
				let evento = {}
				evento.category = category;
				let eventByCategory = arrayEvts.filter(el => el.category == category)
				console.log(eventByCategory);
				evento.profits = this.profits(eventByCategory);
				evento.porcentaje = this.calculo_porcentaje(eventByCategory);
				arrayNuevo.push(evento);

			})
			return arrayNuevo;
		},

		highCapacity(array) {
		return array.reduce((ev1, ev2) => {
				if (ev1.capacity > ev2.capacity) {
					return ev1;
				} else {
					return ev2;
				}
			})
		},
		
		highAttendace(array){
			return	(array.filter(elm => elm.assistance).reduce((ev1, ev2)=>{
				if((ev1.assistance/ev1.capacity)>(ev2.assistance/ev2.capacity))
				{
					return ev1
				}else{
					return ev2;
				}
			}))
		},
		
		lowAttendace(array)
		{
			return array.filter(elm => elm.assistance).reduce((ev1, ev2) => {
				if ((ev1.assistance / ev1.capacity) < (ev2.assistance / ev2.capacity)) {
					return ev1;
				} else {
					return ev2;
				}
			})
		},
	}

}).mount("#app")