function createUIComponent( sandboxFactory ) {
	return class UIComponent extends HTMLElement {
		constructor() {
			super();

			this.sandbox = sandboxFactory( this );
			this.listeners = [];
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

		disconnectedCallback() {
			this.sandbox.offAll();
			this.dettachDOMListeners();
		}

		attachInternals() {
			const shadow = this.attachShadow( { mode: 'closed' } );

			shadow.innerHTML = typeof this.template === 'function' ? this.template() : '';

			this.shadow = shadow;
		}

		attachDOMListener( element, event, listener ) {
			this.listeners.push( {
				element,
				event,
				listener
			} );

			element.addEventListener( event, listener );
		}

		dettachDOMListener( element, event, listener ) {
			const index = this.listeners.findIndex( ( listenerData ) => {
				return listenerData.element === element && listenerData.event === event && listenerData.listener === listener;
			} );

			if ( index === -1 ) {
				return;
			}

			this.listeners.splice( index, 1 );
			element.removeEventListener( event, listener );
		}

		dettachDOMListeners() {
			this.listeners.forEach( ( listenerData ) => {
				this.dettachDOMListener( listenerData.element, listenerData.event, listenerData.listener )
			} );
		}

		fire( event, data ) {
			this.sandbox.fire( event, data );
		}

		on( event, callback ) {
			this.sandbox.on( event, callback );
		}

		destroy() {
			this.remove();
		}
	};
}

export default createUIComponent;
