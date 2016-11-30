var Step = require('step');
var path = require('path');
var request = require('request');
var fs = require('fs-extra');
var Compile = require('./compile');
var Exec = require('./exec');
var Judge = require('./judge');
var Score = require('./score');

const cmdMap = {
	'compile': Compile,
	'exec': Exec,
	'judge': Judge,
	'score': Score,
	'end': -1
};

module.exports = function(dataPath, cfg) {
    var self = this;
	self.loadCfg = function(cfg) {
		self.cfg = cfg;
		self.dataPath = dataPath;
	};
	self.loadCfg(cfg);
	self.judgeStep = 0;
    self.interpret = function(err) {
        if (err) {
            return self.callback(err);
        }
        var curCmd = self.tus[self.tusStep];
        var curMod = cmdMap[curCmd.cmd];
        if (!curMod) {
            var errInfo = 'Unknow tus command ' + curCmd.cmd + ' at step ' + self.tusStep;
            self.respond({ tusStep: self.tusStep, message: errInfo, isEnd: true });
            return self.callback(errInfo);
        } else if (curMod == -1) {
            self.respond({ tusStep: self.tusStep, message: 'normally end', isEnd: true });
            return self.callback(false);
        }
        var runner = new curMod(curCmd, self);
        return runner.run(function(data, next) {
            if (!data.tusStep) {
                data.tusStep = self.tusStep;
            }
			if (!data.cmd) {
                if (self.tus[self.tusStep]) {
                    data.cmd = self.tus[self.tusStep].cmd;
                } else {
                    data.cmd = 'unknown';
                }
            }
            self.respond(data, next);
        }, function(error) {
			console.log('Step ' + self.tusStep + ': ' + curCmd.cmd + ' done');
			if (error) {
				console.error('With error');
				console.error(error);
			}
            ++ self.tusStep;
            self.interpret(error);
        });
    };
    self.run = function(req, respond, callback) {
        self.path = path.resolve(self.cfg.path, String(req.runId));
        self.respond = respond;
        self.callback = function(error) {
			if (self.cfg.clean) {
				fs.removeSync(self.path);
			}
			callback(error);
		};
		self.res = {};
        self.scores = [];
		self.sources = [];
        self.updateSource = function(id, zipPath, callback) {
			if (typeof(zipPath) === 'function') {
				callback = zipPath;
				zipPath = null;
			}
            if (!self.sources[id]) {
                if (typeof(req.source_url) == 'string') {
                    req.source_url = [ req.source_url ];
                }
                if (typeof(req.source_url) == 'object' && req.source_url[id] && zipPath !== null) {
					request(req.source_url[id]).pipe(fs.createWriteStream(zipPath))
						.on('error', function(err) {
							callback(err);
						}).on('close', function() {
							callback(false);
						});
				} else if (typeof(req.source_url) == 'object' && req.source_url[id]) {
                    request.get({
                        url: req.source_url[id]
                    }, function(err, httpRespond, bodyStr) {
                        if (err) {
                            callback(err);
                        } else {
                            self.sources[id] = bodyStr;
                            callback(false);
                        }
                    });
                } else {
                    callback('No Source');
                }
            }
        };
        try {
            self.tus = JSON.parse(fs.readFileSync(path.resolve(self.dataPath, 'tus.json')));
			while (true) {
				try {
					fs.readdirSync(self.path);
				} catch (error) {
                    break;
				}
				self.path += 'r';
            }
            fs.mkdirSync(self.path);
            self.lang = req.lang;
            if (typeof(self.tus) != 'object' || self.tus.length > self.cfg.maxLines) {
                throw 'illegal judge script';
            } else {
                self.tus.push({ cmd: "end" });
            }
        } catch (error) {
            self.respond({ tusStep: 0, message: error, isEnd: true });
            return self.callback(error);
        }
        self.tusStep = 0;
        return self.interpret();
    };
}

