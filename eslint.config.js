// @ts-check

import { fixupPluginRules } from '@eslint/compat'
import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	// register plugins first
	{
		plugins: {
			['@typescript-eslint']: tseslint.plugin,
			['import']: fixupPluginRules(importPlugin),
			['jest']: jestPlugin,
		},
	},

	// .eslintignore replacement
	{
		ignores: [
			'coverage/',
			'fixtures/',
			'lib/',
			'node_modules/',
		],
	},

	// extends
	eslint.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,

	// base config
	{
		extends: [eslintConfigPrettier],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: [
					'tsconfig.eslint.json',
				],
			},
		},
		rules: {
			'@typescript-eslint/no-unsafe-argument': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'error',
			'@typescript-eslint/no-unsafe-call': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/no-unsafe-return': 'error',
			//
      // eslint-plugin-import
      //
      // enforces consistent type specifier style for named imports
      'import/consistent-type-specifier-style': 'error',
      // disallow non-import statements appearing before import statements
      'import/first': 'error',
      // Require a newline after the last import/require in a group
      'import/newline-after-import': 'error',
      // Forbid import of modules using absolute paths
      'import/no-absolute-path': 'error',
      // disallow AMD require/define
      'import/no-amd': 'error',
      // forbid default exports - we want to standardize on named exports so that imported names are consistent
      'import/no-default-export': 'error',
      // disallow imports from duplicate paths
      'import/no-duplicates': 'error',
      // Forbid the use of extraneous packages
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          peerDependencies: true,
          optionalDependencies: false,
        },
      ],
      // Forbid mutable exports
      'import/no-mutable-exports': 'error',
      // Prevent importing the default as if it were named
      'import/no-named-default': 'error',
      // Prohibit named exports
      'import/no-named-export': 'off', // we want everything to be a named export
      // Forbid a module from importing itself
      'import/no-self-import': 'error',
      // Require modules with a single export to use a default export
      'import/prefer-default-export': 'off', // we want everything to be named
		},
	},
	{
		// enable jest rules on test files
		files: ['**/*test.ts'],
		extends: [jestPlugin.configs['flat/recommended']],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			// disallow non-import statements appearing before import statements
			'import/first': 'off',
			'import/no-extraneous-dependencies': 'off',
			'jest/no-deprecated-functions': 'off'
		},
	},
	{
		// disable type-aware linting on JS files
		files: ['**/*.js'],
		extends: [tseslint.configs.disableTypeChecked],
	},
)
