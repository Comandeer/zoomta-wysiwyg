import UILoader from '/src/core/UILoader.mjs';

const loader = new UILoader();

loader.addComponent( 'button-', 'Button' );
loader.addComponent( 'toolbar-', 'Toolbar' );
loader.addComponent( 'editable-', 'Editable' );
loader.addComponent( 'wysiwyg-', 'WYSIWYG' );

loader.load();
