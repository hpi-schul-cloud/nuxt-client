import { storiesOf } from "@storybook/vue";
import outdent from "outdent";
import { text } from "@storybook/addon-knobs";

import notes from "@docs/storybook/base.md";
import BaseButton from "@components/ui/BaseButton.vue";
import BaseCard from "@components/ui/BaseCard.vue";
import BaseIcon from "@components/ui/BaseIcon.vue";
import BaseInput from "@components/ui/BaseInput/BaseInput.vue";
import BaseLink from "@components/ui/BaseLink.vue";
import BaseProgressbar from "@components/ui/BaseProgressbar.vue";
import BaseTable from "@components/ui/BaseTable.vue";
import BaseCollapsible from "@components/ui/BaseCollapsible.vue";
import BaseBreadcrumb from "@components/ui/BaseBreadcrumb.vue";
import BaseSelect from "@components/ui/BaseSelect.vue";
import BaseAudio from "@components/ui/BaseAudio.vue";
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
			'<div><base-button class ="is-primary is-small">Primary</base-button> <br/> <base-button class ="is-primary is-medium">Primary</base-button><br/><base-button class ="is-primary is-large">Primary</base-button></div>',
		methods: {},
	}))
	.add("Base Button Secondary", () => ({
		components: { BaseButton },
		template:
			'<div><base-button class="is-secondary is-small">Secondary</base-button><br/><base-button class ="is-secondary is-medium">Secondary</base-button><br/><base-button class ="is-secondary is-large">Secondary</base-button><br/></div>',
		methods: {},
	}))
	.add("Base Card", () => ({
		components: { BaseCard },
		template: "<base-card>Card</base-card>",
		methods: {},
	}))
	.add("Base Icon", () => ({
		components: { BaseIcon },
		template: outdent`
			<div>
				<base-icon source="material" icon="home"/>
				<base-icon source="custom" icon="clock"/>
				<base-icon source="custom" icon="tasks" style="font-size: 2em" />
			</div>
		`,
	}))
	.add("Base Input default", () => ({
		components: { BaseInput },
		data: () => ({ content: "" }),
		template: outdent`
			<div>
				<base-input type="text" value="" label="Vorname" name="firstname" />
				<base-input type="email" value="" label="Email" name="email" />
				<base-input type="password" value="" label="Password" name="password" />
				<base-input type="url" value="" label="URL" name="url" />
				<base-input type="number" value="" label="Number" name="number" />
				<base-input type="textarea" value="" label="Textarea" name="textarea" />
				<base-input type="checkbox" value="" label="Checkbox" name="textarea" />
				<base-input type="switch" value="" label="Switch" name="textarea" />
			</div>
				`,
		methods: {},
	}))
	.add("Base Input Switch", () => ({
		components: { BaseInput },
		data: () => ({ toggled: "" }),
		template: `<base-input value="" type="switch" label="Test switch" name="test"/>`,
	}))
	.add("Base Input Radio Button", () => ({
		components: { BaseInput },
		template: outdent`
			<fieldset>
				<legend>Example legend</legend>
				<base-input type="radio" name="choice" value="me" id="radio1">Pick me!</base-input>
				<base-input type="radio" name="choice" value="notMe" id="radio2">Don't pick me.</base-input>
			</fieldset>`,
		methods: {},
	}))
	.add("Base Input Date", () => ({
		components: { BaseInput },
		data: () => ({ content: "" }),
		template:
			'<base-input value="" type="date" v-model="content" label="Datum" placeholder="21.02.2019" name="date"/>',
		methods: {},
	}))
	.add("Base Input Time", () => ({
		components: { BaseInput },
		data: () => ({ content: "" }),
		template:
			'<base-input value="" type="time" v-model="content" label="Uhrzeit" name="someTime"/>',
		methods: {},
	}))
	.add("Base Select", () => ({
		components: { BaseSelect },
		data: () => ({
			content: [],
			options: multioptions,
		}),
		template:
			'<base-select :value.sync="content" :options="options" track-by="_id" label="name" placeholder="Etwas auswählen"/>',
		methods: {},
	}))
	.add("Base Select MultiSelect", () => ({
		components: { BaseSelect },
		data: () => ({
			content: [],
			options: multioptions,
		}),
		template:
			'<base-select :value.sync="content" :multiple="true" :options="options" track-by="_id" label="name" placeholder="Mehrere Inhalte auswählen"/>',
		methods: {},
	}))
	.add("Base Link", () => ({
		components: { BaseLink },
		template: outdent`
			<div>
				<base-link href="https://schul-cloud.org">external Link to https://schul-cloud.org</base-link>
				<base-link to="/news">Internal Link to /news</base-link>
				<base-link name="news">Internal Link with name "news"</base-link>
			</div>`,
		methods: {},
	}))
	.add("Base Progressbar", () => ({
		components: { BaseProgressbar },
		template: '<base-progressbar :value="2" :max="3"/>',
	}))
	.add("Base Table", () => ({
		components: { BaseTable },
		template: outdent`
			<base-table>
					<tr>
							<th>Firstname</th>
							<th>Lastname</th>
					</tr>
					<tr>
							<td>Peter</td>
							<td>Griffin</td>
					</tr>
			</base-table>
		`,
	}))
	.add("Base Collapsible", () => ({
		components: { BaseCollapsible },
		template:
			'<base-collapsible label="Test" ><p>Some collapsible content. Click the button to toggle between showing and hiding the collapsible content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></base-collapsible>',
	}))
	.add("Base Breadcrumb", () => ({
		components: { BaseBreadcrumb },
		data: () => ({
			inputs: [
				{ text: "Home", to: "/" },
				{ text: "Kurse", href: "https://schul-cloud.org" },
				{ text: "Mathematik" },
			],
		}),
		template: `<base-breadcrumb :inputs="inputs"></base-breadcrumb>`,
		propsDescription: {
			inputs:
				"Strings are rendered as simple text, Objects are passed to BaseLink (text is interpreted as text, and the rest as properties)",
		},
	}))
	.add("Base Modal", () => ({
		components: { BaseModal, BaseButton },
		data: () => ({
			active: false,
			header: text("header", "custom header"),
			body: text(
				"body",
				"Hello I'm a modal, do you like to close me? Then just click outside of my box or the button below."
			),
		}),
		template: outdent`
			<div>
				<base-button @click="active = true">
					Open Modal
				</base-button>

				<base-modal :active.sync="active">
					<div class="modal-header">
						<h3 v-html="header" />
					</div>

					<div class="modal-body" v-html="body" />

					<div class="modal-footer">
						<base-button id="button" class="is-light" @click="active = false">
							OK
						</base-button>
					</div>
				</base-modal>
			</div>
		`,
		methods: {},
	}))
	.add("Base Dialog", () => ({
		data: () => ({ active: false }),
		template: outdent`
			<div>
				<BaseButton @click="confirm">
					Delete User
				</BaseButton>
			</div>
		`,
		methods: {
			confirm() {
				this.$dialog.confirm({
					title: "Deleting account",
					message:
						"Are you sure you want to <b>delete</b> this user? This action cannot be undone.",
					confirmText: "Delete Account",
					type: "is-danger",
					onConfirm: () => this.$toast.success("Account deleted!"),
				});
			},
		},
	}))
	.add("Base Audio", () => ({
		components: { BaseAudio },
		template: `<base-audio src="https://podcast.hpi.de/media/2019-03-05_neuland_ep05.mp3"></base-audio>`,
	}))
	.add("Base Video", () => ({
		components: { BaseVideo },
		template: outdent`<base-video
			:configuration="{
				streams: [{
					hd: 'https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/hd/video.mp4',
					sd: 'https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/sd/video.mp4',
					poster: 'https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/explainer-poster.jpg',
					hls: 'https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/hls/video.m3u8',
				}],
				initialState: {playState: 'PAUSED'},
				videoPreload: false
			}" />`,
	}));
