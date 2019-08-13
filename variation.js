const fs = require("fs");

const walkSync = function(dir, filelist, base) {
	try {
		const files = fs.readdirSync(dir);
		const extension = /\.(vue)$/i;
		myfilelist = filelist || {};
		files.forEach((file) => {
			const dirname = dir.replace(base, "").substr(1);
			const fullname = dir + "/" + file;
			const filename = file.replace(/(.*)\.[^.]+$/, "$1");

			myfileList = fs.statSync(dir + "/" + file).isDirectory()
				? walkSync(dir + "/" + file, myfilelist, base)
				: extension.test(file)
				? (myfilelist["@" + dirname + "/" + filename] = fullname)
				: (myfilelist["@" + dirname + "/" + file] = fullname);
		});
		return myfilelist;
	} catch (err) {
		//directory does not exist
		return {};
	}
};

module.exports = function(variation) {
	const dirname = "./src/themes/" + variation;
	const aliasComponents = walkSync(dirname + "/components", {}, dirname);
	const aliasAssets = walkSync(dirname + "/assets", {}, dirname);

	return Object.assign({}, aliasComponents, aliasAssets);
};
