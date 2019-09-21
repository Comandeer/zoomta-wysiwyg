import Core from './Core.mjs';

class WorkerCore extends Core {
	async start() {
		const modules = await this.loadModules();

		modules.forEach( ( [ , { default: Module } ] ) => {
			new Module( this.sandboxFactory );
		} );
	}
}

export default WorkerCore;
