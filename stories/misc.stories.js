import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

import notes from "@docs/components/misc.md";
import PulsatingDot from "@components/PulsatingDot.vue";
import ProfilePicture from "@components/ProfilePicture.vue";
import ExampleImage from "@assets/avatarExample.svg";
import MenuLink from "@components/MenuLink.vue";
import DropdownMenu from "@components/DropdownMenu.vue";

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
		template: `
<DropdownMenu title="Dropdown">
	<MenuLink href="#" class="test">Link 101</MenuLink>
	<MenuLink href="#">Link 2</MenuLink>
	<MenuLink href="#">Link 3</MenuLink>
</DropdownMenu>
		`,
	}));
