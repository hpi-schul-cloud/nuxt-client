import { storiesOf } from "@storybook/vue";

const reqSvgs = require.context("@assets/icons", true, /\.svg$/);
let svgs = "";
reqSvgs.keys().forEach((filename) => {
	const iconName = filename.replace(/^.*[\\\/]/, "").slice(0, -4);
	svgs +=
		"<p><base-icon source='custom' icon='" +
		iconName +
		"'/> " +
		iconName +
		"</p>";
});

storiesOf("1 Design Tokens", module).add("Icons", () => ({
	template: "<div>" + svgs + "</div>",
}));
