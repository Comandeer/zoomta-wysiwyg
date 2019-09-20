class WYSIWYG extends HTMLElement {
	constructor() {
		super();

		this.attachInternals();

	}

	attachInternals() {
		const shadow = this.attachShadow( { mode: 'closed' } );
		const initialContent = this.innerHTML;

		shadow.innerHTML = `<link rel="stylesheet" href="/css/ui/WYSIWYG.css">
		<div class="wysiwyg">
			<toolbar->
				<button->Bold</button->
				<button->Code</button->
			</toolbar->
			<editable->
				${ initialContent }
			</editable->
		</div>`;

		this.shadow = shadow;
	}
}

export default WYSIWYG;
