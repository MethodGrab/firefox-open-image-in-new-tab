const isShiftKey = xs => xs.map( x => x.toLowerCase() ).includes( 'shift' );
const isDataUri = uri => uri.startsWith( 'data:' );


const insertAfterActiveTab = ( url, active, openerTabId ) => {
	// When openerTabId is specified, insertAfterActiveTab is the default behaviour.
	return browser.tabs.create({ url, active, openerTabId });
};


const insertAtEnd = async ( url, active, openerTabId ) => {
	try {
		const tabs = await browser.tabs.query({ currentWindow: true });
		const index = tabs.length;
		// Still provide the openerTabId so closing the tab from the end of the list returns focus to the opener tab.
		return browser.tabs.create({ url, active, openerTabId, index });
	} catch ( err ) {
		// Do **not** provide the openerTabId because without a specific index that would insert the tab after the current tab instead of at the end.
		return browser.tabs.create({ url, active });
	}
};


const openImage = ( info, tab ) => {
	let url = info.srcUrl;

	// Using a custom renderer for data URIs as `browser.tabs.create` doesnt allow these for security reasons
	// (https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/create).
	if ( isDataUri( info.srcUrl ) ) {
		url = `/image.html#${info.srcUrl}`;
	}

	const active = !isShiftKey( info.modifiers );

	return browser.storage.sync.get( 'openAfterCurrentTab' )
		.then(({ openAfterCurrentTab }) => {
			if ( openAfterCurrentTab ) {
				return insertAfterActiveTab( url, active, tab.id );
			}

			return insertAtEnd( url, active, tab.id );
		});
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
