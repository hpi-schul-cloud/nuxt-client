import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import baseDoc from "@docs/components/base.md";

import BaseButton from "@components/ui/BaseButton.vue";
import BaseCard from "@components/ui/BaseCard.vue";
import BaseIcon from "@components/ui/BaseIcon.vue";
import BaseInput from "@components/ui/BaseInput.vue";
import BaseLink from "@components/ui/BaseLink.vue";
import BaseToast from "@components/ui/BaseToast.vue";
import BaseProgressbar from "@components/ui/BaseProgressbar.vue";
import BaseProfilePicture from "@components/ui/BaseProfilePicture.vue";
import BaseTable from "@components/ui/BaseTable.vue";

storiesOf("Base Components", module)
	.addDecorator(withMarkdownNotes(baseDoc))
	.add("Base Button Primary", () => ({
		components: { BaseButton },
		template:
			"<div><BaseButton class ='is-primary is-small'>Primary</BaseButton> <br/> <BaseButton class ='is-primary is-medium'>Primary</BaseButton><br/><BaseButton class ='is-primary is-large'>Primary</BaseButton></div>",
		methods: {},
	}))
	.add("Base Button Secondary", () => ({
		components: { BaseButton },
		template:
			"<div><BaseButton class ='is-secondary is-small'>Secondary</BaseButton><br/><BaseButton class ='is-secondary is-medium'>Secondary</BaseButton><br/><BaseButton class ='is-secondary is-large'>Secondary</BaseButton><br/></div>",
		methods: {},
	}))
	.add("Base Card", () => ({
		components: { BaseCard },
		template: "<BaseCard>Card</BaseCard>",
		methods: {},
	}))
	.add("Base Icon", () => ({
		components: { BaseIcon },
		template: '<BaseIcon :name="fa-bell"/>',
	}))
	.add("Base Input", () => ({
		components: { BaseInput },
		template:
			'<BaseInput type="text" label="Vorname" v-model="abc" name="firstname"/>',
		methods: {},
	}))
	.add("Base Switch", () => ({
		components: { BaseInput },
		template: "<BaseInput type='checkbox' />",
	}))
	.add("Base Radio Button", () => ({
		components: { BaseInput },
		template: "<BaseInput type='radio' />",
	}))
	.add("Base Link", () => ({
		components: { BaseLink },
		template:
			"<BaseLink href='https://www.google.com'> Link content</BaseLink>",
		methods: {},
	}))
	.add("Base Toast", () => ({
		components: { BaseToast },
		template: "<BaseToast />",
	}))
	.add("Base Progressbar", () => ({
		components: { BaseProgressbar },
		template: "<BaseProgressbar :value='2' :max='3'/>",
	}))
	.add("Base Profile Pic", () => ({
		components: { BaseProfilePicture },
		template:
			"<div><BaseProfilePicture image='https://s14-eu5.startpage.com/cgi-bin/serveimage?url=https:%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F0%2F0b%2FZebra_Closeup_%252822211089308%2529.jpg&sp=572f2d2655837540935f5ab68078ee1a' size='small'/><BaseProfilePicture size='medium'/><BaseProfilePicture size='large'/></div>",
	}))
	.add("Base Table", () => ({
		components: { BaseTable },
		template: `
<BaseTable>
    <tr>
        <th>Firstname</th>
        <th>Lastname</th>
    </tr>
    <tr>
        <td>Peter</td>
        <td>Griffin</td>
    </tr>
</BaseTable>
        `,
	}));
