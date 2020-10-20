const fs = require('fs');
global.CKEDITOR = {};
require('./core/loader');
require('./core/lang');
var scripts = CKEDITOR.scripts;
var languages = CKEDITOR.lang.languages;

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

function importLang(name){
	code.push(`import './lang/${name}';`);
}

Object.keys(scripts).forEach(importCode);
Object.keys(languages).forEach(importLang);


fs.writeFileSync('importAll.js', code.join('\n'), 'utf8');
