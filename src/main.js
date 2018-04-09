import Marker from './marker';
import Config from './config';
import * as api from './api';
import './style.css';

import * as _ from 'lodash';
import dat from 'dat.gui';
import C2S from 'canvas2svg';

const W = window.innerWidth;
const H = window.innerHeight;

let ctx = null;

let params = new Config(ctx);

let markers = [];

const fetchLocation = (location) => {
	api.getGeoloc(location).then( res => {
		if(res.status === 'OK'){
			markers.push( new Marker(W, H, res.results[0].geometry.location, params.marker.size, params.marker.growth, params.marker.color) );
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

const draw = () => {
    markers.forEach((m, i) => {
		let tmp = _.find(markers, n => { return m.distance(n) < (params.marker.precision*100 + 0.1) });
		tmp.growSize();
		tmp.draw(ctx);
		if(!(tmp.d > 10)){
			m.draw(ctx);
		}
	});
};

const init = () => {
	if(ctx){
		document.querySelector('.svg').removeChild(document.querySelector('svg'));
	}
	ctx =  new C2S(W, H);
	ctx.translate(W/2, H/2);
	ctx.fillStyle="rgba(0, 0, 200, 0)";
	ctx.fillRect(-W, -H, W, H);
	
	api.getRepoStars(params.repository.owner, params.repository.name, params.marker.quantity).then( stars => {
		markers = [];
		stars.forEach( star => {
			fetchUser(star);
		});
		setTimeout(draw, 3000);
		document.querySelector('.svg').appendChild(ctx.getSvg());
	});
};
init();

const gui = new dat.GUI();
const repo = gui.addFolder('repository');
repo.add(params.repository, 'owner').onFinishChange(newValue => {
	init();
});
repo.add(params.repository, 'name').onFinishChange(newValue => {
	init();
});
const marker = gui.addFolder('marker');
marker.add(params.marker, 'quantity', 1, 500, 10).onFinishChange(newValue => {
	init();
});
marker.add(params.marker, 'size', 0, 30, 1).onFinishChange(newValue => {
	init();
});
marker.add(params.marker, 'precision', 0, 1, 0.1).onFinishChange(newValue => {
	init();
});
marker.add(params.marker, 'growth', 0, 50, 1).onFinishChange(newValue => {
	init();
});
marker.addColor(params.marker, 'color').onFinishChange(newValue => {
	init();
});
gui.add(params, 'filename');
gui.add(params, 'export');
gui.close();
