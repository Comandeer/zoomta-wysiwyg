import Sandbox from '/src/core/Sandbox.mjs';

class UISandbox extends Sandbox {
	checkPermissions( event ) {
		return event.startsWith( 'ui:' );
	}
}

export default UISandbox;
