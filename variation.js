const fs = require("fs");

const walkSync = function(dir, filelist, base) {
	const files = fs.readdirSync(dir);
	const extension = /\.(vue)$/i;
	myfilelist = filelist || {};
	files.forEach(function(file) {
		const dirname = dir.replace(base, "").substr(1);
		const fullname = dir + "/" + file;
		const filename = file.replace(/(.*)\.[^.]+$/, "$1");

		if (fs.statSync(dir + "/" + file).isDirectory()) {
			myfilelist = walkSync(dir + "/" + file, myfilelist, base);
		} else {
			if (extension.test(file)) {
				myfilelist["@" + dirname + "/" + filename] = fullname;
			} else {
				myfilelist["@" + dirname + "/" + file] = fullname;
			}
		}
	});
	return myfilelist;
};

module.exports = function(variation) {
	const dirname = "./src/themes/" + variation;
	const aliasComponents = walkSync(dirname + "/components", {}, dirname);
	const aliasPages = walkSync(dirname + "/pages", {}, dirname);

	return Object.assign({}, aliasPages, aliasComponents);
};
