class Loader {
	constructor() {
		this.modules = new Map();
	}

	add( name, module ) {
		this.modules.set( name, module );
	}

	load() {
		const promises = [ ...this.modules ].map( ( [ moduleName, modulePath ] ) => {
			return this.loadSingle( modulePath ).then( ( module ) => {
				return [ moduleName, module ];
			} );
		} );

		return Promise.all( promises );
	}

	loadSingle( path ) {
		return import( `/src/${ path }.mjs` );
	}
}


export default Loader;
