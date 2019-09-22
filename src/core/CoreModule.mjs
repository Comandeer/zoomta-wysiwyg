class CoreModule {
	constructor( sandboxFactory ) {
		this.sandbox = sandboxFactory( this );
	}

	start() {
		if ( typeof this.attachListeners === 'function' ) {
			this.attachListeners();
		}
	}

	stop() {
		this.sandbox.offAll();
	}

	fire( ...args ) {
		return this.sandbox.fire( ...args );
	}

	on( ...args ) {
		return this.sandbox.on( ...args );
	}
}

export default CoreModule;
