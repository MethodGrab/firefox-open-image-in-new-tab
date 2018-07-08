;(function(  ) { // eslint-disable-line no-extra-semi
	const imageClass = 'rendered-image';
	const scaledClass = 'is-scaled';
	const canScaleClass = 'can-scale';

	const renderImage = src => {
		const img = document.createElement( 'img' );
		img.src = src;
		img.classList.add( imageClass, scaledClass );
		document.body.prepend( img );
	};

	const canScale = _ => {
		const img = document.querySelector(`.${imageClass}`);
		const w = document.documentElement.clientWidth < img.naturalWidth;
		const h = document.documentElement.clientHeight < img.naturalHeight;

		return w || h;
	};

	const setCanScale = _ => {
		const img = document.querySelector(`.${imageClass}`);

		if ( canScale() ) {
			img.classList.add(canScaleClass);
		} else {
			img.classList.remove(canScaleClass);
		}
	};

	const data = window.location.hash.substr( 1 );

	if ( data.length > 0 ) {
		renderImage( data );
		setCanScale();
	}

	window.addEventListener( 'resize', e => {
		setCanScale();
	});

	document.body.addEventListener( 'click', e => {
		const img = `.${imageClass}`;

		if ( e.target.matches( img ) && canScale() ) {
			document.querySelector( img ).classList.toggle( scaledClass );
		}
	});
}(  ));
