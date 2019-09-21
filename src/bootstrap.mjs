import UILoader from './core/UILoader.mjs';
import UISandbox from './core/UISandbox.mjs';
import createUIComponent from './ui/UIComponent.mjs';

const worker = new Worker( '/src/bootstrapWorker.mjs', {
	type: 'module'
}  );
const sandboxConstructor = UISandbox.createFactory( worker, window );
const UIComponent = createUIComponent( sandboxConstructor );
const loader = new UILoader( UIComponent );

loader.add( 'button-', 'ui/Button' );
loader.add( 'toolbar-', 'ui/Toolbar' );
loader.add( 'editable-', 'ui/Editable' );
loader.add( 'wysiwyg-', 'ui/WYSIWYG' );

loader.load();
