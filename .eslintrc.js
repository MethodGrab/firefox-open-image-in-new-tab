module.exports = {
	extends: [
		'@methodgrab/standard',
		'@methodgrab/standard/browser',
		'@methodgrab/standard/esnext',
	],

	env: {},

	globals: {
		browser: true,
	},

	rules: {
		'no-param-reassign': 'off',
		'no-shadow': [ 'error', {
			allow: [ '_' ],
		}],
		'no-unused-expressions': [ 'warn', {
			allowShortCircuit: true,
			allowTernary: true,
		}],
	},
};
