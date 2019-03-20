import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

import notes from "@docs/storybook/misc.md";
import PulsatingDot from "@components/PulsatingDot.vue";
import ProfilePicture from "@components/ProfilePicture.vue";
import ExampleImage from "@assets/avatarExample.svg";
import MenuLink from "@components/MenuLink.vue";
import DropdownMenu from "@components/DropdownMenu.vue";
import BaseButton from "@components/ui/BaseButton.vue";
import Quote from "@components/Quote.vue";

storiesOf("Misc", module)
	.addParameters({
		notes,
	})
	.add("Pulsing Dot", () => ({
		components: { PulsatingDot },
		template: outdent`<PulsatingDot />`,
	}))
	.add("Profile Pic", () => ({
		components: { ProfilePicture },
		data: () => ({ imgsrc: ExampleImage }),
		template: `<div><ProfilePicture :image="imgsrc" size="small"/><ProfilePicture size="medium"/><ProfilePicture size="large"/></div>`,
	}))
	.add("DropdownMenu", () => ({
		components: { DropdownMenu, MenuLink },
		template: outdent`
			<DropdownMenu title="Dropdown">
				<MenuLink to="/">Link 1</MenuLink>
				<MenuLink to="/">Link 2</MenuLink>
				<MenuLink to="/">Link 3</MenuLink>
			</DropdownMenu>
		`,
	}))
	.add("Toast", () => ({
		components: { BaseButton },
		template: outdent`
			<div>
				<BaseButton @click="$toast.info('Info 🤓')">Info Toast</BaseButton>
				<BaseButton @click="$toast.success('Success 😊')" class="is-success">Success Toast</BaseButton>
				<BaseButton @click="$toast.error('Error 😥')" class="is-error">Error Toast</BaseButton>
			</div>
		`,
	}))
	.add("Quote", () => ({
		components: { Quote },
		template: outdent`
			<Quote cite="http://www.worldwildlife.org/who/index.html">
				For 50 years, WWF has been protecting the future of nature. The world's
				leading conservation organization, WWF works in 100 countries and is
				supported by 1.2 million members in the United States and close to 5 million
				globally.
			</Quote>
		`,
	}));
