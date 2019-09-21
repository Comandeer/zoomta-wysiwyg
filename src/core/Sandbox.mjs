import SecurityError from './errors/SecurityError.mjs';

class Sandbox {
	constructor( target, source, module ) {
		this.target = target;
		this.source = source;
		this.module = module;
	}

	static createFactory( target, source ) {
		return ( module, ...args ) => {
			return new this( target, source, module, ...args );
		};
	}

	fire( event, data ) {
		if ( !this.checkPermissions( event, 'publish' ) ) {
			throw new SecurityError( `No sufficient permissions to publish ${ event } event` );
		}

		this.target.postMessage( {
			event,
			data
		} );
	}

	on( event, callback ) {
		if ( !this.checkPermissions( event, 'subscribe' ) ) {
			throw new SecurityError( `No sufficient permissions to subscribe ${ event } event` );
		}

		this.target.addEventListener( 'message', ( { data } ) => {
			if ( !data || typeof data !== 'object' || data.event !== event ) {
				return;
			}

			callback( data.data );
		} );
	}
}

export default Sandbox;
