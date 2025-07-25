"use strict";

import { RuleTester } from "eslint";
import materialIconImportRule from "./material-icon-imports.js";

global.structuredClone = (value) => {
	return JSON.parse(JSON.stringify(value));
};
const ruleTester = new RuleTester();

ruleTester.run("material-icon-imports", materialIconImportRule, {
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
