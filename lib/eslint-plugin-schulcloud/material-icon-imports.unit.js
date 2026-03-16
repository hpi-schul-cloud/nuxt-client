"use strict";

import materialIconImportRule from "./material-icon-imports.js";
import { RuleTester } from "eslint";

global.structuredClone = (value) => JSON.parse(JSON.stringify(value));
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
