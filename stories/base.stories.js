import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

import notes from "@docs/storybook/base.md";
import BaseButton from "@components/ui/BaseButton.vue";
import BaseCard from "@components/ui/BaseCard.vue";
import BaseIcon from "@components/ui/BaseIcon.vue";
import BaseInput from "@components/ui/BaseInput.vue";
import BaseLink from "@components/ui/BaseLink.vue";
import BaseProgressbar from "@components/ui/BaseProgressbar.vue";
import BaseTable from "@components/ui/BaseTable.vue";
import BaseCollapsible from "@components/ui/BaseCollapsible.vue";
import BaseBreadcrumb from "@components/ui/BaseBreadcrumb.vue";
import BaseSelect from "@components/ui/BaseSelect.vue";
import BaseVideo from "@components/ui/BaseVideo.vue";

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
		template: outdent`
			<div>
				<BaseIcon source="material" icon="home"/>
				<BaseIcon source="custom" icon="clock"/>
				<BaseIcon source="custom" icon="tasks" style="font-size: 2em" />
			</div>
		`,
	}))
	.add("Base Input", () => ({
		components: { BaseInput },
		data: () => ({ content: "" }),
		template:
			'<BaseInput type="text" label="Vorname" v-model="content" name="firstname" placeholder="Max"/>',
		methods: {},
	}))
	.add("Base Input Switch", () => ({
		components: { BaseInput },
		data: () => ({ toggled: "" }),
		template: `<BaseInput type="checkbox" v-model="toggled" />`,
	}))
	.add("Base Input Radio Button", () => ({
		components: { BaseInput },
		template: outdent`
			<div>
				<BaseInput type="radio" name="choice" value="me" id="radio1">Pick me!</BaseInput>
				<BaseInput type="radio" name="choice" value="notMe" id="radio2">Don't pick me.</BaseInput>
			</div>`,
		methods: {},
	}))
	.add("Base Input Date", () => ({
		components: { BaseInput },
		data: () => ({ content: "" }),
		template:
			'<BaseInput value="" type="date" v-model="content" label="Datum" placeholder="21.02.2019" name="date"/>',
		methods: {},
	}))
	.add("Base Input Time", () => ({
		components: { BaseInput },
		data: () => ({ content: "" }),
		template:
			'<BaseInput value="" type="time" v-model="content" label="Uhrzeit" name="someTime"/>',
		methods: {},
	}))
	.add("Base Select", () => ({
		components: { BaseSelect },
		data: () => ({
			content: [],
			options: multioptions,
		}),
		template:
			'<BaseSelect :value.sync="content" :options="options" track-by="_id" label="name" placeholder="Etwas auswählen"/>',
		methods: {},
	}))
	.add("Base Select MultiSelect", () => ({
		components: { BaseSelect },
		data: () => ({
			content: [],
			options: multioptions,
		}),
		template:
			'<BaseSelect :value.sync="content" :multiple="true" :options="options" track-by="_id" label="name" placeholder="Mehrere Inhalte auswählen"/>',
		methods: {},
	}))
	.add("Base Link", () => ({
		components: { BaseLink },
		template: outdent`
			<div>
				<BaseLink href="https://schul-cloud.org">external Link to https://schul-cloud.org</BaseLink>
				<BaseLink to="/news">Internal Link to /news</BaseLink>
				<BaseLink name="news">Internal Link with name "news"</BaseLink>
			</div>`,
		methods: {},
	}))
	.add("Base Progressbar", () => ({
		components: { BaseProgressbar },
		template: '<BaseProgressbar :value="2" :max="3"/>',
	}))
	.add("Base Table", () => ({
		components: { BaseTable },
		template: outdent`
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
		template: `<BaseBreadcrumb :inputs="[{text: 'Home', to:'/'}, {text: 'Kurse', href:'https://schul-cloud.org'}, 'Mathematik']"></BaseBreadcrumb>`,
		propsDescription: {
			inputs:
				"Strings are rendered as simple text, Objects are passed to BaseLink (text is interpreted as text, and the rest as properties)",
		},
	}))
	.add("Base Modal", () => ({
		components: { BaseModal, BaseButton },
		data: () => ({ active: false }),
		template: outdent`
			<div>
				<BaseButton @click="active = true">
					Open Modal
				</BaseButton>

				<BaseModal :active.sync="active">
					<div class="modal-header">
						<h3>custom header</h3>
					</div>

					<div class="modal-body">
						Hello I'm a modal, do you like to close me? Then just click outside of my box or the button below.
					</div>

					<div class="modal-footer">
						<BaseButton id="button" class="is-light" @click="active = false">
							OK
						</BaseButton>
					</div>
				</BaseModal>
			</div>
		`,
		methods: {},
	}))
	.add("Base Video", () => ({
		components: { BaseVideo },
		template: outdent`<BaseVideo
			:configuration="{
				streams: [{
					hd: 'https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/hd/video.mp4',
					sd: 'https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/sd/video.mp4',
					poster: 'https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/explainer-poster.jpg',
					hls: 'https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/hls/video.m3u8',
				}],
				initialState: {playState: 'PAUSED'},
				videoPreload: false
			}"
		/>`,
	}));
