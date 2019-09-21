function addRequestExtension( core, Sandbox ) {
	const corePrototype = Reflect.getPrototypeOf( core );

	corePrototype.request = function( endpoint, data ) {
		return fetch( `/${ endpoint }`, {
			method: 'GET',
			body: data,
			mode: 'same-origin'
		} ).then( ( response ) => {
			return response.json();
		} );
	};

	Sandbox.prototype.request = function( endpoint ) {
		return this.core.request( endpoint );
	};
}

export default addRequestExtension;
