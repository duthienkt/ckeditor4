const fs = require('fs');
var scripts = CKEDITOR.scripts;

var loaded = {};

var code = [];

function importCode(name) {
	if (loaded[name]) return;
	loaded[name] = true;
	var dep = scripts[name];
	if (dep && dep.length > 0) {
		dep.forEach(importCode);
	}
	code.push(`import './core/${name}';`)
}


Object.keys(scripts).forEach(importCode);

fs.writeFileSync('importAll.js', code.join('\n'), 'utf8');
