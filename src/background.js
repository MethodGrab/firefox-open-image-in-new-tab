const isShiftKey = xs => xs.map( x => x.toLowerCase() ).includes( 'shift' );
const isDataUri = uri => uri.startsWith( 'data:' );

// :: Bool -> Bool -> Bool
const isActive = ( switchToTabImmediatelyOption, modifierKeySelected ) => {
	return (switchToTabImmediatelyOption && !modifierKeySelected) || (!switchToTabImmediatelyOption && modifierKeySelected);
};

const insertAfterActiveTab = async ( url, active, openerTabId ) => {
	try {
		const tabs = await browser.tabs.query({ currentWindow: true, active: true });
		let index = 1;

		if ( tabs[0] ) {
			index = tabs[0].index + 1;
		}

		return browser.tabs.create({ url, active, openerTabId, index });
	} catch ( err ) {
		console.error( err ); // eslint-disable-line no-console
		// Do **not** provide the openerTabId as that may affect the tab position.
		return browser.tabs.create({ url, active });
	}
};


const insertAtEnd = async ( url, active, openerTabId ) => {
	try {
		const tabs = await browser.tabs.query({ currentWindow: true });
		const index = tabs.length;
		return browser.tabs.create({ url, active, openerTabId, index });
	} catch ( err ) {
		console.error( err ); // eslint-disable-line no-console
		// Do **not** provide the openerTabId as that may affect the tab position.
		return browser.tabs.create({ url, active });
	}
};


const openImage = async ( info, tab ) => {
	let url = info.srcUrl;

	// Using a custom renderer for data URIs as `browser.tabs.create` doesnt allow these for security reasons
	// (https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/create).
	if ( isDataUri( info.srcUrl ) ) {
		url = `/image.html#${info.srcUrl}`;
	}

	const opts = await browser.storage.sync.get([ 'openAfterCurrentTab', 'switchToTabImmediately' ]);
	const switchToTabImmediately = opts.switchToTabImmediately === 'YES';
	const active = isActive( switchToTabImmediately, isShiftKey( info.modifiers ) );

	if ( opts.openAfterCurrentTab ) {
		return insertAfterActiveTab( url, active, tab.id );
	}

	return insertAtEnd( url, active, tab.id );
};


browser.contextMenus.create({
	id: 'oiint-open-image',
	title: browser.i18n.getMessage( 'openImageInNewTabContextMenuLabel' ),
	contexts: [ 'image' ],
	onclick: openImage,
	icons: {
		16: 'img/logo.svg',
		32: 'img/logo.svg',
	},
	targetUrlPatterns: [
		'http://*/*',
		'https://*/*',
		'data:*',
	],
});
