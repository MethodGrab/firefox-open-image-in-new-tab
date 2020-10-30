const optionFields = _ => {
	return [ ...document.querySelectorAll( '[data-option]' ) ];
};

const saveOptions = e => {
	e.preventDefault();

	const options = optionFields().reduce(( acc, input ) => {
		const optionId = input.getAttribute( 'name' );
		const inputType = input.getAttribute( 'type' );

		switch ( inputType ) {
			case 'checkbox':
				acc[optionId] = input.checked;
				break;

			case 'radio':
				if ( input.checked ) {
					acc[optionId] = input.value;
				}
				break;

			default:
				acc[optionId] = input.value;
		}

		return acc;
	}, {} );

	return browser.storage.sync.set( options );
};


const restoreOptions = async _ => {
	const optionIds = optionFields().map( input => input.getAttribute( 'name' ) );
	const storedOptions = await browser.storage.sync.get( optionIds );

	optionFields().forEach(input => {
		const optionId = input.getAttribute( 'name' );
		const inputType = input.getAttribute( 'type' );

		switch ( inputType ) {
			case 'checkbox':
				input.checked = storedOptions[optionId];
				break;

			case 'radio':
				if ( input.value === storedOptions[optionId] ) {
					input.checked = true;
				}
				break;

			default:
				input.value = storedOptions[optionId];
		}
	});
};

document.addEventListener( 'DOMContentLoaded', restoreOptions );
document.querySelector( 'form' ).addEventListener( 'submit', saveOptions );
