class Button extends HTMLElement {
	constructor() {
		super();

		this.attachInternals();

	}

	attachInternals() {
		const shadow = this.attachShadow( { mode: 'closed' } );

		shadow.innerHTML = `<link rel="stylesheet" href="/css/ui/Button.css">
		<button class="button">
			<slot></slot>
		</button>`;

		this.shadow = shadow;
	}
}

export default Button;
