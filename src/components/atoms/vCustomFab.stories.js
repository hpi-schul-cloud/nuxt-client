import { storiesOf } from "@storybook/vue";
import vCustomFab from "@components/atoms/vCustomFab";
import { mdiPlus, mdiAccountPlus, mdiCloudUpload } from "@mdi/js";
import { defaultText } from "@@/stories/mockData/LoremIpsumParagraphs";

const loremIpsum = defaultText();

storiesOf("0 Vuetify/Atoms/vCustomFab", module)
	.add("simple action", () => ({
		components: {
			vCustomFab,
		},
		data: () => ({
			mdiPlus,
			loremIpsum,
		}),
		template: `
		<v-app>
			<h1 class="h4">vCustomFab</h1>
			<p>{{ loremIpsum }}</p>
			<v-custom-fab
				:icon="mdiPlus"
				title="Task"
			></v-custom-fab>
		</v-app>`,
	}))
	.add("multiple actions", () => ({
		components: {
			vCustomFab,
		},
		data: () => ({
			mdiPlus,
			mdiAccountPlus,
			mdiCloudUpload,
			loremIpsum,
		}),
		template: `
		<v-app>
			<h1 class="h4">vCustomFab</h1>
			<p>{{ loremIpsum }}</p>
			<v-custom-fab
				:icon="mdiPlus"
				title="Task"
				:actions="[
					{
						label: 'Create',
						icon: mdiAccountPlus,
					},
					{
						label: 'Import',
						icon: mdiCloudUpload,
					},
				]"
			></v-custom-fab>
		</v-app>`,
	}));
