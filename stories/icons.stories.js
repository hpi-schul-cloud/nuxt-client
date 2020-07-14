import { storiesOf } from "@storybook/vue";

import IconCard from "./components/IconCard";

const reqSvgs = require.context("@assets/icons", true, /\.svg$/);
const svgs = [];
reqSvgs.keys().forEach((filename) => {
	const iconName = filename.replace(/^.*[\\\/]/, "").slice(0, -4);
	svgs.push(iconName);
});

storiesOf("1 Design Tokens", module).add("Icons", () => ({
	components: { IconCard },
	data: () => ({
		svgs: svgs,
	}),
	template: `
	<div>
		<div v-for="svg in svgs" :key="svg">
			<icon-card :iconName="svg"/>
		</div>
	</div>
	`,
}));
