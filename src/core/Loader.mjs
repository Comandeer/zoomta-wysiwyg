class Loader {
	constructor() {
		this.modules = new Map();
	}

	add( name, module ) {
		this.modules.set( name, module );
	}

	load() {
		this._generateImports();
	}

	_generateImports() {
		const promises = [ ...this.modules ].map( ( [ moduleName, modulePath ] ) => {
			return import( `/src/${ modulePath }.mjs` ).then( ( module ) => {
				return this._handleImport( moduleName, module );
			} );
		} );

		return Promise.all( promises );
	}
}


export default Loader;
