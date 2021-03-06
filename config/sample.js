// sample config file for TUOJ judge client
var path = require('path');
var fs = require('fs-extra');
var path = require('path');

var pathName = path.resolve(__dirname, '../../samples');
if (process.argv[2]) {
	pathName += process.argv[2];
}

console.log('working on ' + pathName);

module.exports = {
	judgerType: 'traditional',
	wwwServer: {
		verify: {
			username: 'sampleUsername',
			password: 'samplePassword',
            token: 'sampleToken'
		},
		fetchUrl: 'http://localhost:3333/api/judge/get_task/acm',
		uploadUrl: 'http://localhost:3333/api/judge/update_results/acm',
		reqInterval: 1000
	},
	local: {
        gitter: {
            path: path.resolve(pathName, 'test-data/probs/')
        },
        tus: {
            path: path.resolve(pathName, 'test-data/runs/'),
			maxLines: 256,
            clean: true
        },
		sandbox: {
            path: path.resolve(pathName, 'test-data/sandbox/'),
            image: 'tuoj-sandbox-image:3.4',
            refreshInterval: 999999999 * 86400000
		}
	}
};

fs.ensureDirSync(path.resolve(pathName, 'test-data'));
fs.ensureDirSync(module.exports.local.gitter.path);
fs.ensureDirSync(module.exports.local.tus.path);
fs.ensureDirSync(module.exports.local.sandbox.path);

