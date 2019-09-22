import Core from './Core.mjs';

class WorkerCore extends Core {
	_moduleCallback( name, { default: Module } ) {
		return new Module( this.sandboxFactory );
	}
}

export default WorkerCore;
