var fs = require('fs-extra');
var path = require('path');

module.exports = function(source, workPath, target, oargs) {
    if (typeof(args) == 'string') {
        args = args.split(' ');
    }
    fs.writeFileSync(path.resolve(workPath, 'source.c'), source);
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
    args.push('source.c');
    args.push('-o');
    args.push('exe');
    var ret = {
        fileName: '/usr/bin/gcc',
        args: args
    };
    return ret;
}
