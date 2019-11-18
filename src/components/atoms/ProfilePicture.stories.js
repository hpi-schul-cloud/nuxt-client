import { storiesOf } from "@storybook/vue";

import ProfilePicture from "@components/atoms/ProfilePicture";
import ExampleImage from "@assets/img/avatarExample.svg";

storiesOf("Atoms/ProfilePicture", module).add("Profile Picture", () => ({
	components: { ProfilePicture },
	data: () => ({ imgsrc: ExampleImage }),
	template: `<div><ProfilePicture :image="imgsrc" size="small"/><ProfilePicture :image="imgsrc" size="medium"/><ProfilePicture :image="imgsrc" size="large"/></div>`,
}));
