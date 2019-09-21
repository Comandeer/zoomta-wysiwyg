class Core {
	constructor( target, Sandbox, loader ) {
		this.target = target;
		this.Sandbox = Sandbox;
		this.sandboxFactory = Sandbox.createFactory( this );
		this.loader = loader;
		this.modules = new Map();
		this.extensions = new Set();
	}

	addModule( name, path ) {
		this.modules.set( name, path );
	}

	addModules( modules ) {
		modules.forEach( ( [ name, path ] ) => {
			this.addModule( name, path );
		} );
	}

	addExtension( path ) {
		this.extensions.add( path );
	}

	addExtensions( extensions ) {
		extensions.forEach( ( path ) => {
			this.addExtension( path );
		} );
	}

	async applyExtensions() {
		const promises = [ ...this.extensions ].map( ( path ) => {
			return this.loader.loadSingle( path );
		} );

		const extensions = await Promise.all( promises );

		extensions.forEach( ( { default: extension } ) => {
			extension( this, this.Sandbox );
		} );
	}

	loadModules() {
		[ ...this.modules ].forEach( ( [ name, path ] ) => {
			this.loader.add( name, path );
		} );

		return this.loader.load();
	}

	fire( event, data ) {
		this.target.postMessage( {
			event,
			data
		} );
	}

	on( event, callback ) {
		this.target.addEventListener( 'message', ( { data } ) => {
			if ( !data || typeof data !== 'object' || data.event !== event ) {
				return;
			}

			callback( data.data );
		} );
	}
}

export default Core;
