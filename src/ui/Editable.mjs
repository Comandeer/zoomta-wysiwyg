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
			const editor = this.editor;
			const shadow = this.shadow;
			const editable = shadow.querySelector( '.editable' );

			shadow.ownerDocument.addEventListener( 'selectionchange', () => {
				const selection = shadow.getSelection();

				this.fire( 'ui:selectionchange', {
					editor,
					selection: getSelectionInfo( selection, editable )
				} );
			} );

			this.on( 'ui:viewupdate', ( { editor: updatedEditor, updateOperations } ) => {
				if ( updatedEditor !== editor || !Array.isArray( updateOperations ) ) {
					return;
				}

				const selection = this.shadow.getSelection();

				updateOperations.forEach( ( operation ) => {
					switch ( operation.type ) {
						case 'addStyle':
							addStyleToSelection( selection, operation.style );
						break;

						case 'removeStyle':
							removeStyleFromSelection( selection, operation.style );
						break;
					}
				} );

				this.fire( 'ui:change', {
					editor,
					selection: getSelectionInfo( selection, editable ),
					content: editable.innerHTML
				} );
			} );
		}
	};
}

function getSelectionInfo( selection, editable ) {
	return {
		type: selection.type,
		selectionContent: getSelectionContent( selection ),
		path: getPath( selection, editable )
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

function addStyleToSelection( selection, style ) {
	if ( selection.type === 'None' ) {
		return;
	}

	const range = selection.getRangeAt( 0 );
	const elementName = convertStyleToElementName( style );
	const element = document.createElement( elementName );

	range.surroundContents( element );
	selection.removeAllRanges();
	selection.addRange( range );
}

function removeStyleFromSelection( selection, style ) {
	if ( selection.type === 'None' ) {
		return;
	}

	const range = selection.getRangeAt( 0 );
	const elementName = convertStyleToElementName( style );
	const closest = range.startContainer.closest ? range.startContainer.closest( elementName ) :
		range.startContainer.parentNode.closest( elementName );

	replaceWithChildren( closest );
}

function convertStyleToElementName( style ) {
	const mappings = new Map( [
		[ 'bold', 'b' ],
		[ 'code', 'code' ],
		[ 'h1', 'h1' ]
	] );

	return mappings.get( style );
}

function replaceWithChildren( element ) {
	let child = element.firstChild;

	while ( child ) {
		element.before( child );

		child = element.firstChild;
	}
}

export default createEditableComponent;
