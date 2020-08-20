# Open Image In New Tab [![Build Status](https://travis-ci.org/MethodGrab/firefox-open-image-in-new-tab.svg?branch=master)](https://travis-ci.org/MethodGrab/firefox-open-image-in-new-tab)

[![Version](https://img.shields.io/amo/v/open-image-in-new-tab-new)][amo]
[![Rating](https://img.shields.io/amo/rating/open-image-in-new-tab-new)][amo]
[![Users](https://img.shields.io/amo/users/open-image-in-new-tab-new)][amo]
[![Downloads](https://img.shields.io/amo/dw/open-image-in-new-tab-new)][amo]

> A Firefox extension that adds a context menu item to open images in a new tab.


## Options

- Hold down <kbd>shift</kbd> when selecting 'Open image in new tab' from the context menu to load the image in the background rather than the foreground.


## Restrictions

- Only works with `http://`, `https://` & `data:` URLs (not `file://`, `ftp://`, etc.)


## Development

Testing unsigned extensions only works with [non-release builds](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext#Testing_unsigned_extensions) of Firefox, to develop the extension:
1. Install a [non-release build](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext#Testing_unsigned_extensions) (e.g. Firefox Developer Edition)
1. `npm install`
1. `npm run start` to load Firefox Developer Edition with the extension installed. Making changes to the code will automatically reload the extension.

**Note: `npm run start` assumes you're on Windows with Firefox Developer Edition installed in the default directory. If not, modify the `start` script path in `package.json` as needed.**


## Release Process

To publish a new version:

1. `npm run test`
1. Bump the `version` in `src/manifest.json`
1. Commit with the version number as the commit message (e.g. `:bookmark: 1.0.0`) and tag the commit with the version number (e.g. `v1.0.0`)
1. `npm run package` to bundle the extension as a `zip` file
1. Upload the generated `zip` to https://addons.mozilla.org/en-US/developers/addons


## Credits
- Icon by Font Awesome ([Creative Commons Attribution 4.0 International license](https://fontawesome.com/license)).


[amo]: https://addons.mozilla.org/en-GB/firefox/addon/open-image-in-new-tab-new
