import UISandbox from './core/UISandbox.mjs';
import Loader from './core/Loader.mjs';
import createUIComponent from './ui/UIComponent.mjs';
import UICore from './core/UICore.mjs';

const worker = new Worker( '/src/bootstrapWorker.mjs', {
	type: 'module'
}  );
const loader = new Loader();
const core = new UICore( worker, UISandbox, loader, createUIComponent );

core.addModules( [
	[ 'button-', 'ui/Button' ],
	[ 'toolbar-', 'ui/Toolbar' ],
	[ 'editable-', 'ui/Editable' ],
	[ 'wysiwyg-', 'ui/WYSIWYG' ]
] );
core.start();
