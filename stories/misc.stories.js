import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

import notes from "@docs/components/misc.md";
import PulsatingDot from "@components/PulsatingDot.vue";
import ProfilePicture from "@components/ProfilePicture.vue";
import ExampleImage from "@assets/avatarExample.svg";

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
	}));
