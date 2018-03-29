import Marker from './marker';
import * as api from './api';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let rightPressed = false;
let leftPressed = false;

let repo = 'angular';
let owner = 'angular';

const markers = [];

const fetchLocation = (location) => {
	api.getGeoloc(location).then( res => {
		if(res.status === 'OK'){
			markers.push( new Marker(canvas, res.results[0].geometry.location) );
		}
	});
}

const fetchUser = (star) => {
	api.getURL(star.url).then( user => {
		if(user.location){
			fetchLocation(user.location);
		}
	});
}

ctx.translate(canvas.width/2, canvas.height/2);

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	/*for(let i = 0; i<markers.length; i++){
		if(i != 0){
			if(markers[i].compare(markers[i-1]) >= 5){
				markers[i-1].remove();
				markers[i].growSize();
			}
		}
		markers[i].draw(ctx);
	}*/
	
    markers.forEach(m => {
		m.draw(ctx);
    });
	
    requestAnimationFrame(draw);
};

const init =() => {
	api.getRepoStars(owner, repo).then( stars => {
		stars.forEach( star => {
			fetchUser(star);
		});
	});
	draw();
};
init();
