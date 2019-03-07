import { storiesOf } from "@storybook/vue";
import notes from "@docs/components/base.md";

import BaseButton from "@components/ui/BaseButton.vue";
import BaseCard from "@components/ui/BaseCard.vue";
import BaseIcon from "@components/ui/BaseIcon.vue";
import BaseInput from "@components/ui/BaseInput.vue";
import BaseLink from "@components/ui/BaseLink.vue";
import BaseToast from "@components/ui/BaseToast.vue";
import BaseProgressbar from "@components/ui/BaseProgressbar.vue";
import BaseProfilePicture from "@components/ui/BaseProfilePicture.vue";
import BaseTable from "@components/ui/BaseTable.vue";
import BaseCollapsible from "@components/ui/BaseCollapsible.vue";
import BaseBreadcrumb from "@components/ui/BaseBreadcrumb.vue";
import BaseSelect from "@components/ui/BaseSelect.vue";

export const multioptions = [
	{ _id: 1, name: "Option 1" },
	{ _id: 2, name: "Option 2" },
	{ _id: 3, name: "Option 3" },
];
import BaseModal from "@components/ui/BaseModal.vue";


storiesOf("Base Components", module)
	.addParameters({
		notes,
	})
	.add("Base Button Primary", () => ({
		components: { BaseButton },
		template:
			'<div><BaseButton class ="is-primary is-small">Primary</BaseButton> <br/> <BaseButton class ="is-primary is-medium">Primary</BaseButton><br/><BaseButton class ="is-primary is-large">Primary</BaseButton></div>',
		methods: {},
	}))
	.add("Base Button Secondary", () => ({
		components: { BaseButton },
		template:
			'<div><BaseButton class="is-secondary is-small">Secondary</BaseButton><br/><BaseButton class ="is-secondary is-medium">Secondary</BaseButton><br/><BaseButton class ="is-secondary is-large">Secondary</BaseButton><br/></div>',
		methods: {},
	}))
	.add("Base Card", () => ({
		components: { BaseCard },
		template: "<BaseCard>Card</BaseCard>",
		methods: {},
	}))
	.add("Base Icon", () => ({
		components: { BaseIcon },
		template: '<BaseIcon icon="trash"/>',
	}))
	.add("Base Input", () => ({
		components: { BaseInput },
		data: () => ({ content: "" }),
		template:
			'<BaseInput type="text" label="Vorname" v-model="content" name="firstname"/>',
		methods: {},
	}))
	.add("Base Switch", () => ({
		components: { BaseInput },
		template: '<BaseInput type="checkbox" />',
	}))
	.add("Base Radio Button", () => ({
		components: { BaseInput },
		template: `<div><BaseInput type="radio" name="choise" value="me" id="radio1">Pick me!</BaseInput> <BaseInput type="radio" name="choise" value="notMe" id="radio2">Don't pick me.</BaseInput></div>`,
			'<BaseInput type="text" label="Vorname" v-model="content" name="firstname" placeholder="Max"/>',
		methods: {},
	}))
	.add("Base Input Date", () => ({
		components: { BaseInput },
		data: () => ({ content: "" }),
		template:
			'<BaseInput value="" type="date" v-model="content" label="Datum" placeholder="21.02.2019" name="date"/>',
		methods: {},
	}))
	.add("Base Select MultiSelect", () => ({
		components: { BaseSelect },
		data: () => ({
			content: [],
			options: multioptions,
		}),
		template:
			'<BaseSelect v-model="content" :options="options" track-by="_id" label="name"/>',
		methods: {},
	}))
	.add("Base Link", () => ({
		components: { BaseLink },
		template: '<BaseLink href="/"> Link content</BaseLink>',
		methods: {},
	}))
	.add("Base Toast", () => ({
		components: { BaseToast },
		template: "<BaseToast />",
	}))
	.add("Base Progressbar", () => ({
		components: { BaseProgressbar },
		template: '<BaseProgressbar :value="2" :max="3"/>',
	}))
	.add("Base Profile Pic", () => ({
		components: { BaseProfilePicture },
		template:
			'<div><BaseProfilePicture image="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Blank&hairColor=BlondeGolden&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=Heather&eyeType=Squint&eyebrowType=UpDown&mouthType=Smile&skinColor=Pale" size="small"/><BaseProfilePicture size="medium"/><BaseProfilePicture size="large"/></div>',
	}))
	.add("Base Table", () => ({
		components: { BaseTable },
	.add("Base Modal", () => ({
		components: { BaseModal, BaseButton },
		data: () => ({ active: false }),

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
	}))
	.add("Base Collapsible", () => ({
		components: { BaseCollapsible },
		template:
			'<BaseCollapsible label="Test" ><p>Some collapsible content. Click the button to toggle between showing and hiding the collapsible content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></BaseCollapsible>',
	}))
	.add("Base Breadcrumb", () => ({
		components: { BaseBreadcrumb },
		template: `<BaseBreadcrumb :inputs="[{text: 'Home', href:'#'}, {text: 'Kurse', href:'#'}, 'Mathematik']"></BaseBreadcrumb>`,
		propsDescription: {
			inputs:
				"Strings are rendered as simple text, Objects are passed to BaseLink (text is interpreted as text, and the rest as properties)",
		},
	}));
