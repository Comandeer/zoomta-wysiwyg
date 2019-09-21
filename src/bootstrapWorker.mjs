import WorkerSandbox from './core/WorkerSandbox.mjs';
import Loader from './core/Loader.mjs';
import WorkerCore from './core/WorkerCore.mjs';

const loader = new Loader();
const core = new WorkerCore( self, WorkerSandbox, loader );

core.addExtensions( [
	'core/extensions/request'
] );
core.addModules( [
	[ 'EditableController', 'modules/EditableController' ],
	[ 'SaveController', 'modules/SaveController' ]
] );
core.start();
