import Sandbox from '../core/Sandbox.mjs';

class WorkerSandbox extends Sandbox {
	checkPermissions() {
		return true;
	}
}

export default WorkerSandbox;
