class UILoader {
	constructor() {
		this.ui = new Map();
	}

	addComponent( name, module ) {
		this.ui.set( name, module );
	}

	load() {
		generateImports( this.ui );
	}
}

function generateImports( map ) {
	const promises = [ ...map ].map( ( [ name, module ] ) => {
		return import( `/src/ui/${ module }.mjs` ).then( ( { default: component } ) => {
			customElements.define( name, component );
		} );
	} );

	return Promise.all( promises );
}

export default UILoader;
