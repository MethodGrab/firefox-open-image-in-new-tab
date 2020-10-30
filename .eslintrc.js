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
		'no-console': 'warn',
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
