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

		this.sandbox.on( 'ui:selectionchange', ( { editor, selection } ) => {
			this._updateSelectionView( editor, selection );
		} );

		this.sandbox.on( 'ui:change', ( { editor, selection, content } ) => {
			this.editables.set( editor, content );

			this._updateSelectionView( editor, selection );
		} );

		this.sandbox.on( 'ui:buttonactivation', ( { editor, action, isPressed } ) => {
			if ( action.startsWith( 'style:' ) ) {
				const style = action.replace( 'style:', '' );

				return this._handleStyleUpdate( editor, style, isPressed );
			}
		} );
	}

	_handleStyleUpdate( editor, style, isActive ) {
		const operation = constructStyleOperation( style, isActive );

		this.sandbox.fire( 'ui:viewupdate', {
			editor,
			updateOperations: [
				operation
			]
		} );
	}

	_updateSelectionView( editor, { type, path } ) {
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
	}
}

function constructStyleOperation( style, isActive ) {
	return {
		type: isActive ? 'removeStyle' : 'addStyle',
		style
	};
}

export default EditableController;
