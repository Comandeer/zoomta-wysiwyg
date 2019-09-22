class SaveController {
	constructor( sandboxFactory ) {
		this.sandbox = sandboxFactory( this );

		this.attachListeners();
	}

	attachListeners() {
		this.sandbox.on( 'ui:buttonactivation', ( { editor, action } ) => {
			if ( action !== 'save' ) {
				return;
			}

			this.sandbox.once( 'ui:data', async( { content } ) => {
				const response = await this.sandbox.request( 'save.json', content );

				if ( response.status === 'ok' ) {
					this.sandbox.fire( 'ui:notification', {
						editor,
						content: 'Content saved'
					} );
				}
			} );

			this.sandbox.fire( 'ui:datarequest', {
				editor
			} );
		} );
	}
}

export default SaveController;
