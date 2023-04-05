const path = require('path');
const jsconfig = require('./jsconfig.json');

module.exports = {
	presets: ['@babel/preset-env'],
	plugins: [
		[
			'module-resolver',
			{
				root: [path.resolve(jsconfig.compilerOptions.baseUrl)],
			},
		],
	],
};
