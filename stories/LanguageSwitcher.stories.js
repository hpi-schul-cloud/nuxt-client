import { storiesOf } from "@storybook/vue";

import notes from "@docs/storybook/LanguageSwitcher.md";
import LanguageSwitcher from "@components/organisms/LanguageSwitcher";

storiesOf("LanguageSwitcher", module)
	.addParameters({
		notes,
	})
	.add("LanguageSwitcher", () => ({
		components: { LanguageSwitcher },
		template: `<div>
		<LanguageSwitcher />
		Current store locale: {{ this.$store.getters["i18n/getLocale"] }}
		<br />
		Current locale:
		{{ this.$i18n.locale }}
		<br />
		{{ $t("storybook.lang") }} </div>`,
		methods: {},
	}));
