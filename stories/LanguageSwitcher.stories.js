import { storiesOf } from "@storybook/vue";

import notes from "@docs/storybook/LanguageSwitcher.md";
import LanguageSwitcher from "@components/organisms/LanguageSwitcher";

storiesOf("7 Others/LanguageSwitcher", module)
	.addParameters({
		notes,
	})
	.add("LanguageSwitcher", () => ({
		components: { LanguageSwitcher },
		template: `<LanguageSwitcher />`,
		methods: {},
	}));
