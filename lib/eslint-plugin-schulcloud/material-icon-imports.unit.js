"use strict";

const { RuleTester } = require("eslint");
const rule = require("./material-icon-imports.js");

const ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

ruleTester.run("material-icon-imports", rule, {
	valid: [
		{
			code: `import { mdiCheck } from "@icons/material";`,
		},
		{
			code: `import { useI18n } from "vue-i18n";`,
		},
		{
			code: `import { mdi } from "vuetify/iconsets/mdi-svg";`,
		},
	],
	invalid: [
		{
			code: `import { mdiCheck } from "@mdi/js";`,
			errors: [{ messageId: "noDirectIconImport" }],
			output: `import { mdiCheck } from "@icons/material";`,
		},
		{
			code: `import { mdiAlert } from "@/components/icons/material";`,
			errors: [{ messageId: "noDirectIconImport" }],
			output: `import { mdiAlert } from "@icons/material";`,
		},
		{
			code: `import { mdiCheck } from "some-other-path";`,
			errors: [{ messageId: "noDirectIconImport" }],
			output: `import { mdiCheck } from "@icons/material";`,
		},
		{
			code: `import { mdiCheck } from "../icons/material";`,
			errors: [{ messageId: "noDirectIconImport" }],
			output: `import { mdiCheck } from "@icons/material";`,
		},
	],
});
