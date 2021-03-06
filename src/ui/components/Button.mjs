function createButtonComponent( UIComponent ) {
	return class Button extends UIComponent {
		connectedCallback() {
			this.editor = this.getAttribute( 'editor' );
			this.action = this.getAttribute( 'action' );

			super.connectedCallback();
		}

		template() {
			return `<link rel="stylesheet" href="/css/ui/Button.css">
			<button class="button">
				<slot></slot>
			</button>`;
		}

		attachListeners() {
			const editor = this.editor;
			const action = this.action;
			const button = this.shadow.querySelector( 'button' );

			this.on( 'ui:viewupdate', ( { editor: updatedEditor, activeStyles } ) => {
				if ( !action.startsWith( 'style:' ) || updatedEditor !== editor || !activeStyles ) {
					return;
				}

				const buttonStyle = action.replace( 'style:', '' );
				const isPressed = activeStyles.includes( buttonStyle );

				button.setAttribute( 'aria-pressed', isPressed );
			} );

			this.addEventListener( 'click', () => {
				this.fire( 'ui:buttonactivation', {
					editor,
					action,
					isPressed: ariaToBoolean( button.getAttribute( 'aria-pressed' ) )
				} );
			} );
		}
	};
}

function ariaToBoolean( attribute ) {
	return attribute === 'true' ? true : false;
}

export default createButtonComponent;
