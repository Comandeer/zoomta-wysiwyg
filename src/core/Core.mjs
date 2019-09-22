class Core {
	constructor( target, Sandbox, loader ) {
		this.target = target;
		this.Sandbox = Sandbox;
		this.sandboxFactory = Sandbox.createFactory( this );
		this.loader = loader;
		this.listeners = new Map();
		this.modules = new Map();
		this.extensions = new Set();

		this.setupPubSub();
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

	setupPubSub() {
		this.target.addEventListener( 'message', ( { data } ) => {
			if ( !data || typeof data !== 'object' ) {
				return;
			}

			const callbacks = this.listeners.get( data.event ) || [];

			callbacks.forEach( ( callback ) => {
				callback( data.data );
			} );
		} );
	}

	fire( event, data ) {
		this.target.postMessage( {
			event,
			data
		} );
	}

	on( event, callback ) {
		const eventListeners = this.listeners.get( event ) || [];

		eventListeners.push( callback );

		this.listeners.set( event, eventListeners );
	}

	off( event, callback ) {
		const eventListeners = this.listeners.get( event ) || [];
		const callbackIndex = eventListeners.findIndex( ( savedCallback ) => {
			return savedCallback === callback;
		} );

		if ( callbackIndex === -1 ) {
			return;
		}

		eventListeners.splice( callbackIndex, 1 );

		this.listeners.set( event, eventListeners );
	}
}

export default Core;
