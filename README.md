# Open Image In New Tab

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/MethodGrab/firefox-open-image-in-new-tab/CI?style=flat-square)](https://github.com/MethodGrab/firefox-open-image-in-new-tab/actions/workflows/CI.yaml)
[![Version](https://img.shields.io/amo/v/open-image-in-new-tab-new?style=flat-square)][amo]
[![Rating](https://img.shields.io/amo/rating/open-image-in-new-tab-new?style=flat-square)][amo]
[![Users](https://img.shields.io/amo/users/open-image-in-new-tab-new?style=flat-square)][amo]
[![Downloads](https://img.shields.io/amo/dw/open-image-in-new-tab-new?style=flat-square)][amo]

> A Firefox extension that adds a context menu item to open images in a new tab.


## Options

- Hold down <kbd>shift</kbd> when selecting "_Open image in new tab_" from the context menu to invert the default tab active behaviour.  
  i.e. if "_Switch to image tab immediately_" is set to "_Yes_" then holding <kbd>shift</kbd> will load the image tab in the background rather than the foreground.


## Restrictions

- Only works with `http://`, `https://` & `data:` URLs (not `file://`, `ftp://`, etc.)


## Development

Testing unsigned extensions only works with [non-release builds](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext#Testing_unsigned_extensions) of Firefox, to develop the extension:
1. Install a [non-release build](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext#Testing_unsigned_extensions) (e.g. Firefox Developer Edition)
1. `npm install`
1. `npm run start` to load Firefox Developer Edition with the extension installed. Making changes to the code will automatically reload the extension.


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
