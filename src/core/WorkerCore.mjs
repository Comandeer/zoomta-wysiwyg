import Core from './Core.mjs';

class WorkerCore extends Core {
	async start() {
		await this.applyExtensions();

		const modules = await this.loadModules();

		modules.forEach( ( [ , { default: Module } ] ) => {
			new Module( this.sandboxFactory );
		} );
	}
}

export default WorkerCore;
