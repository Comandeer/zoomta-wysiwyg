function createWYSIWYGComponent( UIComponent ) {
	return class WYSIWYG extends UIComponent {
		connectedCallback() {
			this.name = this.getAttribute( 'name' );

			super.connectedCallback();
		}

		template() {
			const initialContent = this.innerHTML;
			const name = this.name;

			return `<link rel="stylesheet" href="/css/ui/WYSIWYG.css">
			<div class="wysiwyg">
				<toolbar->
					<button- editor="${ name }" action="save">Save</button->
					<button- editor="${ name }" action="style:bold">Bold</button->
					<button- editor="${ name }" action="style:code">Code</button->
				</toolbar->
				<editable- editor="${ name }">
					${ initialContent }
				</editable->
			</div>`;
		}

		attachListeners() {
			const name = this.name;

			this.on( 'ui:notification', ( { editor, content } ) => {
				if ( editor !== name ) {
					return;
				}

				alert( content );
			} );
		}
	};
}

export default createWYSIWYGComponent;
