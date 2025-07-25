export default {
	meta: {
		type: "problem",
		docs: {
			description:
				"Enforce that icons are imported from our own subset of icons instead of the full Material Icons library.",
		},
		messages: {
			noDirectIconImport:
				"Material icons should only be imported from '@icons/material'.",
		},
		fixable: "code",
	},

	create(context) {
		return {
			ImportDeclaration(node) {
				const importPath = node.source.value;

				node.specifiers.forEach((specifier) => {
					const isMaterialIconImport =
						specifier.type === "ImportSpecifier" &&
						/^mdi[A-Z]/.test(specifier.imported.name); // match 'mdi' followed by a capital letter

					if (isMaterialIconImport && importPath !== "@icons/material") {
						context.report({
							node: specifier,
							messageId: "noDirectIconImport",
							fix: (fixer) => {
								return fixer.replaceText(node.source, '"@icons/material"');
							},
						});
					}
				});
			},
		};
	},
};
