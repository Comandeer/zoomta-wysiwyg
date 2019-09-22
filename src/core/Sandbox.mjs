import SecurityError from './errors/SecurityError.mjs';

class Sandbox {
	constructor( core, module ) {
		this.core = core;
		this.module = module;
		this.listeners = new Map();
	}

	static createFactory( core ) {
		return ( module, ...args ) => {
			return new this( core, module, ...args );
		};
	}

	fire( event, data ) {
		if ( !this.checkPermissions( event, 'publish' ) ) {
			throw new SecurityError( `No sufficient permissions to publish ${ event } event` );
		}

		this.core.fire( event, data );
	}

	on( event, callback ) {
		if ( !this.checkPermissions( event, 'subscribe' ) ) {
			throw new SecurityError( `No sufficient permissions to subscribe ${ event } event` );
		}

		this.core.on( event, callback );
		this.core.on.call( this, event, callback );
		console.log( this.module, this.listeners );
	}

	once( event, callback ) {
		if ( !this.checkPermissions( event, 'subscribe' ) ) {
			throw new SecurityError( `No sufficient permissions to subscribe ${ event } event` );
		}

		const wrappedCallback = ( data ) => {
			callback( data );

			this.off( event, wrappedCallback );
		};

		this.on( event, wrappedCallback );
	}

	off( event, callback ) {
		this.core.off( event, callback );
		this.core.off.call( this, event, callback );
		console.log( this.module, this.listeners );
	}
}

export default Sandbox;
