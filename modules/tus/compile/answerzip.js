var fs = require('fs-extra');
var path = require('path');

module.exports = function(source, workPath, target, oargs) {
    if (typeof(args) == 'string') {
        args = args.split(' ');
    }
    fs.writeFileSync(path.resolve(workPath, 'source.zip'), source);
    var args = [];
    if (typeof(oargs) == 'string') {
        args = oargs.split(' ');
    } else {
        for (var i in oargs) {
            if (typeof(oargs[i]) == 'string') {
                args.push(oargs[i]);
            }
        }
    }
    args.push('source.zip');
    args.push('-d');
    args.push(target);
    var ret = {
        fileName: 'unzip',
        args: args
    };
    return ret;
}
