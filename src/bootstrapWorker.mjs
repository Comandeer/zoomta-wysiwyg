import WorkerSandbox from './core/WorkerSandbox.mjs';
import WorkerLoader from './core/WorkerLoader.mjs';

const workerSandboxFactory = WorkerSandbox.createFactory( self, self );
const loader = new WorkerLoader( workerSandboxFactory );

loader.add( 'EditableController', 'modules/EditableController' );
loader.load();
