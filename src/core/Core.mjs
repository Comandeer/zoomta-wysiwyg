class Core {
	constructor( target, Sandbox, loader ) {
		this.target = target;
		this.Sandbox = Sandbox;
		this.sandboxFactory = Sandbox.createFactory( this );
		this.loader = loader;
		this.listeners = new Map();
		this.modulesMetadata = new Map();
		this.extensions = new Set();
		this.extensionsApplied = false;
		this.isStarted = false;

		this.setupPubSub();
	}

	addModule( name, path ) {
		this.modulesMetadata.set( name, path );
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
		if ( this.extensionsApplied ) {
			return;
		}

		const promises = [ ...this.extensions ].map( ( path ) => {
			return this.loader.loadSingle( path );
		} );

		const extensions = await Promise.all( promises );

		extensions.forEach( ( { default: extension } ) => {
			extension( this, this.Sandbox );
		} );

		this.extensionsApplied = true;
	}

	loadModules() {
		[ ...this.modulesMetadata ].forEach( ( [ name, path ] ) => {
			this.loader.add( name, path );
		} );

		return this.loader.load();
	}

	setupPubSub() {
		this.target.addEventListener( 'message', ( { data } ) => {
			if ( !data || typeof data !== 'object' ) {
				return;
			}

			if ( data.event === 'start' ) {
				return this.start();
			} else if ( data.event === 'stop' ) {
				return this.stop();
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

	async start() {
		if ( this.isStarted ) {
			return;
		}

		await this.applyExtensions();

		if ( !this.modules ) {
			const loaded = await this.loadModules();
			const modules = loaded.map( ( [ name, module ] ) => {
				const transformedModule = this._moduleCallback( name, module );

				return [ name, transformedModule ];
			} );

			this.modules = new Map( modules );
		}

		[ ...this.modules.values() ].forEach( ( module ) => {
			if ( typeof module.start === 'function' ) {
				module.start();
			}
		} );

		this.fire( 'start' );

		this.isStarted = true;
	}

	stop() {
		if ( !this.isStarted ) {
			return;
		}

		[ ...this.modules.values() ].forEach( ( module ) => {
			if ( typeof module.stop === 'function' ) {
				module.stop();
			}
		} );

		this.fire( 'stop' );

		this.listeners = new Map();
		this.isStarted = false;
	}
}

export default Core;
