import Core from './Core.mjs';

class UICore extends Core {
	constructor( target, Sandbox, loader, createUIComponent ) {
		super( target, Sandbox, loader );

		this.UIComponent = createUIComponent( this.sandboxFactory );
	}

	_moduleCallback( name, { default: createComponent } ) {
		const Component = createComponent( this.UIComponent );

		if ( !customElements.get( name ) ) {
			customElements.define( name, Component );
		}

		return Component;
	}
}

export default UICore;
