import Lagos from './lagos.js';		//MUST include path
import Nigeria from './nigeria.js';
import Africa from './africa.js';
import World from './world.js';

let main = document.getElementById('main');
let lagos = document.getElementById('lagos');
let nigeria = document.getElementById('nigeria');
let africa = document.getElementById('africa');
let world = document.getElementById('world');


const pageRoutes = [
	{
		path: '/lagos',
		file: Lagos,
	},
	{
		path: '/sspa/nigeria',
		file: Nigeria,
	},
	{
		path: '/sspa/africa',
		file: Africa,
	},
	{
		path: '/sspa/world',
		file: World,
	},
];

class SpaRouter {
	
	constructor(routes) {
		this.routes = routes;
		this.pageOrigin = window.location.origin;

		this.defaultPath = '/lagos';
		let pathName = window.location.pathname;
		if (this.pageOrigin === 'null'){
			this.pageOrigin = '';
		}

		let pathUrl = this.splitPath(pathName);

		this.checkRoute(pathUrl, main);
	}

	checkRoute(pagePath, container) {
		let route = this.selectRoute(pagePath);
		container.innerHTML = route.file.page();
		window.history.pushState({}, '', pagePath);
	}

	selectRoute(pagePath) {	
		let shortPath;	
		if (pagePath.indexOf('index.html') !== -1){
			shortPath = this.defaultPath;
		}
		else{
			shortPath = pagePath;
		}	
		let route = this.routes.find(function(elem){
			return elem.path == shortPath;
		});
		
		return route;
	}

	splitPath(pagePath){
		let paths = pagePath.split(this.pageOrigin);	//[]
		paths = paths[paths.length - 1];	//get actual path

		if (paths.indexOf('index.html') !== -1 || paths === '/'){
			paths = this.defaultPath;
			return paths;
		}
		else{
			return paths;
		}	
		
	}

}

let sspa = new SpaRouter(pageRoutes);

document.addEventListener('click', function(e){
	e.preventDefault();  //prevents navigation to actual url

	if (e.target == lagos && e.target.origin == sspa.pageOrigin){
		sspa.checkRoute('/lagos', main);
	}
	else if (e.target == nigeria && e.target.origin == sspa.pageOrigin){
		sspa.checkRoute('/sspa/nigeria', main);
	}
	else if (e.target == africa && e.target.origin == sspa.pageOrigin){
		sspa.checkRoute('/sspa/africa', main);
	}
	else if (e.target == world && e.target.origin == sspa.pageOrigin){
		sspa.checkRoute('/sspa/world', main);
	}
});