class SaveController {
	constructor( sandboxFactory ) {
		this.sandbox = sandboxFactory( this );

		this.attachListeners();
	}

	attachListeners() {

		this.sandbox.on( 'ui:buttonactivation', async ( { editor, action } ) => {
			if ( action !== 'save' ) {
				return;
			}

			const response = await this.sandbox.request( 'save.json' );

			if ( response.status === 'ok' ) {
				this.sandbox.fire( 'ui:notification', {
					editor,
					content: 'Content saved'
				} );
			}
		} );
	}
}

export default SaveController;
