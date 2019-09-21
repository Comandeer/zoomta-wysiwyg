function createUIComponent( sandboxFactory ) {
	return class UIComponent extends HTMLElement {
		constructor() {
			super();

			this.sandbox = sandboxFactory( this );
		}

		connectedCallback() {
			if ( this.shadow ) {
				return;
			}

			this.attachInternals();

			if ( typeof this.attachListeners === 'function' ) {
				this.attachListeners();
			}
		}

		attachInternals() {
			const shadow = this.attachShadow( { mode: 'closed' } );

			shadow.innerHTML = typeof this.template === 'function' ? this.template() : '';

			this.shadow = shadow;
		}

		fire( event, data ) {
			this.sandbox.fire( event, data );
		}

		on( event, callback ) {
			this.sandbox.on( event, callback );
		}
	};
}

export default createUIComponent;
