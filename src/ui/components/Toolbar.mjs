function createToolbarComponent( UIComponent ){
	return class Toolbar extends UIComponent {
		template() {
			return `<link rel="stylesheet" href="/css/ui/Toolbar.css">
			<div class="toolbar">
				<slot></slot>
			</div>`;
		}
	};
}

export default createToolbarComponent;
