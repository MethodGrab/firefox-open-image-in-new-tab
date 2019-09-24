const optionFields = _ => {
	return [ ...document.querySelectorAll( '[data-option]' ) ];
};

const saveOptions = e => {
	e.preventDefault();

	const options = optionFields().reduce(( acc, option ) => {
		const inputType = option.getAttribute( 'type' );
		let value = option.value;

		if ( inputType === 'checkbox' ) {
			value = option.checked;
		}

		acc[option.id] = value;
		return acc;
	}, {} );

	return browser.storage.sync.set( options );
};


const restoreOptions = _ => {
	const optionIds = optionFields().map(option => {
		return option.id;
	});

	browser.storage.sync.get( optionIds )
		.then(storedOptions => {
			return optionFields().forEach(option => {
				const optionName = option.id;
				const inputType = option.getAttribute( 'type' );

				if ( inputType === 'checkbox' ) {
					option.checked = storedOptions[optionName];
				} else {
					option.value = storedOptions[optionName];
				}
			});
		});
};

document.addEventListener( 'DOMContentLoaded', restoreOptions );
document.querySelector( 'form' ).addEventListener( 'submit', saveOptions );
