class EditableController {
	constructor( sandboxFactory ) {
		this.sandbox = sandboxFactory( this );
		this.editables = new Map();

		this.attachListeners();
	}

	attachListeners() {
		this.sandbox.on( 'ui:editablecreation', ( { editor, initialContent } ) => {
			this.editables.set( editor, initialContent );
		} );

		this.sandbox.on( 'ui:selectionchange', ( { editor, type, path } ) => {
			if ( type === 'None' ) {
				return;
			}

			const activeStyles = path.reduce( ( styles, current ) => {
				if ( current === 'b' ) {
					return styles.concat( [ 'bold' ] );
				}

				if ( current === 'code' ) {
					return styles.concat( [ 'code' ] );
				}

				if ( current === 'h1' ) {
					return styles.concat( [ 'h1' ] );
				}

				return styles;
			}, [] );

			this.sandbox.fire( 'ui:viewupdate', {
				editor,
				activeStyles
			} );
		} );
	}
}

export default EditableController;
