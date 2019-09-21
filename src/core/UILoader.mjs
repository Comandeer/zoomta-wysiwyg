import Loader from './Loader.mjs';

class UILoader extends Loader {
	constructor( UIComponent ) {
		super();

		this.UIComponent = UIComponent;
	}

	_handleImport( moduleName, { default: createComponent } ) {
		const Component = createComponent( this.UIComponent );

		customElements.define( moduleName, Component );
	}
}

export default UILoader;
