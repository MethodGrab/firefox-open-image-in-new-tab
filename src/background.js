const isCtrlKey = xs => xs.map( x => x.toLowerCase() ).includes( 'ctrl' );
const isShiftKey = xs => xs.map( x => x.toLowerCase() ).includes( 'shift' );

const isDataUri = uri => uri.startsWith( 'data:' );

const openImage = ( info, tab ) => {
	let url = info.srcUrl;

	// Using a custom renderer for data URIs as `browser.tabs.create` doesnt allow these for security reasons
	// (https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/create).
	if ( isDataUri( info.srcUrl ) ) {
		url = `/image.html#${info.srcUrl}`;
	}

	const active = !isShiftKey( info.modifiers );
	browser.tabs.create({ url, active });
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
