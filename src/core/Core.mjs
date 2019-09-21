class Core {
	constructor( target, Sandbox, loader ) {
		this.target = target;
		this.Sandbox = Sandbox;
		this.sandboxFactory = Sandbox.createFactory( this );
		this.loader = loader;
		this.modules = new Map();
	}

	addModule( name, path ) {
		this.modules.set( name, path );
	}

	addModules( modules ) {
		modules.forEach( ( [ name, path ] ) => {
			this.addModule( name, path );
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
