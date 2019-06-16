const isShiftKey = xs => xs.map( x => x.toLowerCase() ).includes( 'shift' );
const isDataUri = uri => uri.startsWith( 'data:' );


const insertAtEnd = ( url, active ) => {
	return browser.tabs.create({ url, active });
};


const insertAfterActiveTab = ( url, active ) => {
	return browser.tabs.query({
		active: true,
		currentWindow: true,
	}).then(tabs => {
		if ( tabs[0] ) {
			const index = tabs[0].index + 1;
			return browser.tabs.create({ url, active, index });
		}

		return insertAtEnd( url, active );
	}).catch(error => {
		return insertAtEnd( url, active );
	});
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
				return insertAfterActiveTab( url, active );
			}

			return insertAtEnd( url, active );
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
