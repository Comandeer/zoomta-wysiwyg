class Toolbar extends HTMLElement {
	constructor() {
		super();

		this.attachInternals();

	}

	attachInternals() {
		const shadow = this.attachShadow( { mode: 'closed' } );

		shadow.innerHTML = `<link rel="stylesheet" href="/css/ui/Toolbar.css">
		<div class="toolbar">
			<slot></slot>
		</div>`;

		this.shadow = shadow;
	}
}

export default Toolbar;
