;(function(  ) { // eslint-disable-line no-extra-semi

	const imageClass = 'rendered-image';
	const isScaledClass = 'is-scaled';
	const canScaleClass = 'can-scale';
	const imageSelector = `.${imageClass}`;

	const renderImage = src => {
		const img = document.createElement( 'img' );
		img.src = src;
		img.classList.add( imageClass, isScaledClass );
		document.body.prepend( img );
	};

	const canScale = _ => {
		const img = document.querySelector( imageSelector );
		const w = document.documentElement.clientWidth < img.naturalWidth;
		const h = document.documentElement.clientHeight < img.naturalHeight;

		return w || h;
	};

	const setCanScale = _ => {
		const img = document.querySelector( imageSelector );

		if ( canScale() ) {
			img.classList.add( canScaleClass );
		} else {
			img.classList.remove( canScaleClass );
		}
	};

	const toggleScaled = _ => {
		document.querySelector( imageSelector ).classList.toggle( isScaledClass );
	};

	const data = window.location.hash.substr( 1 );

	if ( data.length > 0 ) {
		renderImage( data );
		setCanScale();

		window.addEventListener( 'resize', e => {
			setCanScale();
		});

		document.body.addEventListener( 'click', e => {
			if ( e.target.matches( imageSelector ) && canScale() ) {
				toggleScaled();
			}
		});
	}

}(  ));
