function createWYSIWYGComponent( UIComponent ) {
	return class WYSIWYG extends UIComponent {
		template() {
			const initialContent = this.innerHTML;
			const name = this.getAttribute( 'name' );

			return `<link rel="stylesheet" href="/css/ui/WYSIWYG.css">
			<div class="wysiwyg">
				<toolbar->
					<button- editor="${ name }" action="style:bold">Bold</button->
					<button- editor="${ name }" action="style:code">Code</button->
				</toolbar->
				<editable- editor="${ name }">
					${ initialContent }
				</editable->
			</div>`;
		}
	};
}

export default createWYSIWYGComponent;
