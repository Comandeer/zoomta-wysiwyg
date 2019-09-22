import UISandbox from './ui/UISandbox.mjs';
import Loader from './core/Loader.mjs';
import Core from './core/Core.mjs';

const worker = new Worker( '/src/bootstrapWorker.mjs', {
	type: 'module'
}  );
const loader = new Loader();
const core = new Core( worker, UISandbox, loader );

core.addModules( [
	[ 'UIController', 'ui/modules/UIController' ]
] );

document.querySelector( '#toggler' ).addEventListener( 'click', () => {
	if ( !core.isStarted ) {
		return core.start();
	}

	return core.stop();
} );
