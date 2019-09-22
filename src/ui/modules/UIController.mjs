import CoreModule from '../../core/CoreModule.mjs';
import createUIComponent from '../components/UIComponent.mjs';
import createButtonComponent from '../components/Button.mjs';
import createEditableComponent from '../components/Editable.mjs';
import createToolbarComponent from '../components/Toolbar.mjs';
import createWYSIWYGComponent from '../components/WYSIWYG.mjs';

const sandboxFactories = new WeakMap();

class UIController extends CoreModule {
	constructor( sandboxFactory ) {
		super( sandboxFactory );

		sandboxFactories.set( this, sandboxFactory );
		this.components = [];
	}

	start() {
		super.start();

		this._prepareComponents();

		if ( !document.querySelector( 'wysiwyg-' ) ) {
			const wysiwyg = document.createElement( 'wysiwyg-' );

			wysiwyg.name = `editor${ Date.now() }`;
			wysiwyg.innerHTML = '<p>Lorem <b>ipsum</b> dolor <code>sit</code> amet.</p>'

			document.body.appendChild( wysiwyg );
		}
	}

	stop() {
		super.stop();

		this.components.forEach( ( component ) => {
			component.destroy();
		} );

		this.components = [];
	}

	addInstance( component ) {
		this.components.push( component );

		const sandboxFactory = sandboxFactories.get( this );

		return sandboxFactory( component );
	}

	_prepareComponents() {
		if ( customElements.get( 'wysiwyg-' ) ) {
			return;
		}

		const UIComponent = createUIComponent( this );
		const Button = createButtonComponent( UIComponent );
		const Editable = createEditableComponent( UIComponent );
		const Toolbar = createToolbarComponent( UIComponent );
		const WYSIWYG = createWYSIWYGComponent( UIComponent );

		customElements.define( 'button-', Button );
		customElements.define( 'editable-', Editable );
		customElements.define( 'toolbar-', Toolbar );
		customElements.define( 'wysiwyg-', WYSIWYG );
	}
}

export default UIController;
