class Editable extends HTMLElement {
	constructor() {
		super();

		this.attachInternals();

	}

	attachInternals() {
		const shadow = this.attachShadow( { mode: 'closed' } );
		const iniitialContent = this.innerHTML;

		shadow.innerHTML = `<link rel="stylesheet" href="/css/ui/Editable.css">
		<div class="editable" contenteditable="true">
			${ iniitialContent }
		</div>`;

		this.shadow = shadow;
	}
}

export default Editable;
