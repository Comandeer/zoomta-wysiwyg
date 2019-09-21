import Core from './Core.mjs';

class UICore extends Core {
	constructor( target, Sandbox, loader, createUIComponent ) {
		super( target, Sandbox, loader );

		this.UIComponent = createUIComponent( this.sandboxFactory );
	}

	async start() {
		const modules = await this.loadModules();

		modules.forEach( ( [ name, { default: createComponent } ] ) => {
			const Component = createComponent( this.UIComponent );

			customElements.define( name, Component );
		} );
	}
}

export default UICore;
