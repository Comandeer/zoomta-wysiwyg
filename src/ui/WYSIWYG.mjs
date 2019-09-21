function createWYSIWYGComponent( UIComponent ) {
	return class WYSIWYG extends UIComponent {
		template() {
			const initialContent = this.innerHTML;

			return `<link rel="stylesheet" href="/css/ui/WYSIWYG.css">
			<div class="wysiwyg">
				<toolbar->
					<button->Bold</button->
					<button->Code</button->
				</toolbar->
				<editable->
					${ initialContent }
				</editable->
			</div>`;
		}
	};
}

export default createWYSIWYGComponent;
