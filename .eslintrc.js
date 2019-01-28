module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module',
	},
	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#bulb-rules
		'plugin:vue/recommended',
		// https://github.com/standard/standard/blob/master/docs/RULES-en.md
		'standard',
		// https://github.com/prettier/eslint-config-prettier
		'prettier',
		'prettier/standard',
		'prettier/vue',
	],
	rules: {
		// Only allow debugger in development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// Only allow `console.log` in development
		'no-console':
			process.env.NODE_ENV === 'production'
				? [
						'error',
						{
							allow: ['warn', 'error'],
						},
				  ]
				: 'off',
		/*'vue/component-name-in-template-casing': [
			'error',
			'PascalCase',
			{
				ignores: [
					'component',
					'template',
					'transition',
					'transition-group',
					'keep-alive',
					'slot',
				],
			},
		],*/
		'vue/script-indent': ['error', 'tab'],
	},
	overrides: [
		{
			files: ['src/**/*', 'tests/unit/**/*', 'tests/e2e/**/*'],
			excludedFiles: 'app.config.js',
			parserOptions: {
				parser: 'babel-eslint',
				sourceType: 'module',
			},
			env: {
				browser: true,
			},
		},
		{
			files: ['**/*.unit.js'],
			parserOptions: {
				parser: 'babel-eslint',
				sourceType: 'module',
			},
			env: {
				jest: true,
			},
			globals: {
				mount: false,
				shallowMount: false,
				shallowMountView: false,
				createComponentMocks: false,
				createModuleStore: false,
			},
		},
	],
};
