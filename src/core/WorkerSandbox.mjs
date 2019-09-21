import Sandbox from '/src/core/Sandbox.mjs';

class WorkerSandbox extends Sandbox {
	checkPermissions() {
		return true;
	}
}

export default WorkerSandbox;
