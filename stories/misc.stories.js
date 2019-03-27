import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

import notes from "@docs/storybook/misc.md";
import PulsatingDot from "@components/PulsatingDot.vue";
import ProfilePicture from "@components/ProfilePicture.vue";
import ExampleImage from "@assets/avatarExample.svg";
import MenuLink from "@components/MenuLink.vue";
import DropdownMenu from "@components/DropdownMenu.vue";
import BaseButton from "@components/ui/BaseButton.vue";

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
				<base-button @click="$toast.info('Info 🤓')">Info Toast</base-button>
				<base-button @click="$toast.success('Success 😊')" class="is-success">Success Toast</base-button>
				<base-button @click="$toast.error('Error 😥')" class="is-error">Error Toast</base-button>
			</div>
		`,
	}));
