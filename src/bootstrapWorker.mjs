import WorkerSandbox from './worker/WorkerSandbox.mjs';
import Loader from './core/Loader.mjs';
import Core from './core/Core.mjs';

const loader = new Loader();
const core = new Core( self, WorkerSandbox, loader );

core.addExtensions( [
	'core/extensions/request'
] );
core.addModules( [
	[ 'EditableController', 'worker/modules/EditableController' ],
	[ 'SaveController', 'worker/modules/SaveController' ]
] );

core.start();
