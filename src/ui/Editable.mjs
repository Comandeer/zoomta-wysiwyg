function createEditableComponent( UIComponent ) {
	return class Editable extends UIComponent {
		template() {
			const iniitialContent = this.innerHTML;

			return `<link rel="stylesheet" href="/css/ui/Editable.css">
			<div class="editable" contenteditable="true">
				${ iniitialContent }
			</div>`;
		}
	};
}

export default createEditableComponent;
