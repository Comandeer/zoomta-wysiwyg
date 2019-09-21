import SecurityError from './errors/SecurityError.mjs';

class Sandbox {
	constructor( core, module ) {
		this.core = core;
		this.module = module;
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
	}
}

export default Sandbox;
