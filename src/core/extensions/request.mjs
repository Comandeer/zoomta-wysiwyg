import SecurityError from  '../errors/SecurityError.mjs';

function addRequestExtension( core, Sandbox ) {
	const corePrototype = Reflect.getPrototypeOf( core );

	corePrototype.request = function( endpoint, data ) {
		return fetch( `/backend/${ endpoint }`, {
			method: 'GET',
			body: data,
			mode: 'same-origin'
		} ).then( ( response ) => {
			return response.json();
		} );
	};

	Sandbox.prototype.request = function( endpoint ) {
		if ( !this.checkPermissions( 'request', 'extension' ) ) {
			throw new SecurityError( 'Unsufficient permissions to use request extension' );
		}
		return this.core.request( endpoint );
	};
}

export default addRequestExtension;
