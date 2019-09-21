import Loader from './Loader.mjs';

class WorkerLoader extends Loader {
	constructor( sandboxFactory ) {
		super();

		this.sandboxFactory = sandboxFactory;
	}

	_handleImport( moduleName, { default: Module } ) {
		new Module( this.sandboxFactory );
	}
}

export default WorkerLoader;
