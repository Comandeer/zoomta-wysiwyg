function createEditableComponent( UIComponent ) {
	return class Editable extends UIComponent {
		constructor( ...args ) {
			super( ...args );

			this.editor = this.getAttribute( 'editor' );

			setTimeout( () => {
				this.fire( 'ui:editablecreation', {
					editor: this.editor,
					initialContent: this.innerHTML
				} );
			}, 500 );
		}

		template() {
			const iniitialContent = this.innerHTML;

			return `<link rel="stylesheet" href="/css/ui/Editable.css">
			<div class="editable" contenteditable="true">
				${ iniitialContent }
			</div>`;
		}

		attachListeners() {
			const shadow = this.shadow;
			const editable = shadow.querySelector( '.editable' );

			shadow.ownerDocument.addEventListener( 'selectionchange', () => {
				const selection = shadow.getSelection();

				this.fire( 'ui:selectionchange', {
					editor: this.editor,
					type: selection.type,
					selectionContent: getSelectionContent( selection ),
					path: getPath( selection, editable )
				} );
			} );
		}
	};
}

function getSelectionContent( selection ) {
	if ( selection.type === 'None' ) {
		return '';
	}

	const range = selection.getRangeAt( 0 );
	const fragment = range.cloneContents();
	const body = document.createElement( 'body' );

	body.appendChild( fragment );

	return body.innerHTML;
}

function getPath( selection, root ) {
	if ( selection.type === 'None' ) {
		return [];
	}

	const range = selection.getRangeAt( 0 );
	const startContainer = range.startContainer;
	const path = getEnclosingNode( startContainer, root, [] );

	function getEnclosingNode( node, root, path ) {
		if ( node === root ) {
			return path;
		}

		path.push( node.nodeName.toLowerCase() );
		getEnclosingNode( node.parentNode, root, path );

		return path;
	}

	return path;
}

export default createEditableComponent;
