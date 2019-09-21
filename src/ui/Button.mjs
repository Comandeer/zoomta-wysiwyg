function createButtonComponent( UIComponent ) {
	return class Button extends UIComponent {
		template() {
			return `<link rel="stylesheet" href="/css/ui/Button.css">
			<button class="button">
				<slot></slot>
			</button>`;
		}
	};
}

export default createButtonComponent;
