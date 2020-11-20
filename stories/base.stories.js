import { storiesOf } from "@storybook/vue";
import { text, select, boolean, color } from "@storybook/addon-knobs";
import notes from "@docs/storybook/base.md";

import BaseAudio from "@basecomponents/BaseAudio";
import BaseBlockquote from "@basecomponents/BaseBlockquote";
import BaseBreadcrumb from "@basecomponents/BaseBreadcrumb";
import BaseButton from "@basecomponents/BaseButton";
import BaseCard from "@basecomponents/BaseCard";
import BaseCollapsible from "@basecomponents/BaseCollapsible";
import BaseIcon from "@basecomponents/BaseIcon";
import BaseLink from "@basecomponents/BaseLink";
import BaseProgressbar from "@basecomponents/BaseProgressbar";
import BaseQrCode from "@basecomponents/BaseQrCode";
import BaseSelect from "@basecomponents/BaseSelect";
import BaseSpinner from "@basecomponents/BaseSpinner";
import BaseVideo from "@basecomponents/BaseVideo";

storiesOf("4 Base UI Components/Base UI", module)
	.addParameters({
		notes,
	})
	.add("BaseButton", () => ({
		components: {
			BaseButton,
			BaseIcon,
		},
		data: () => ({
			text: text("Text", "Action"),
			design: select(
				"Design",
				{
					default: "",
					none: "none",
					text: "text",
					outline: "outline",
					icon: "icon",
					"text icon": "text icon",
					"icon outline": "icon outline",
					primary: "primary",
					"primary text": "primary text",
					"primary icon": "primary icon",
					"primary icon outline": "primary icon outline",
					"primary text icon": "primary text icon",
					"primary outline": "primary outline",
					"hero-cta": "hero-cta",
					"hero-cta icon": "hero-cta icon",
					fancy: "fancy",
					"fancy icon": "fancy icon",
					secondary: "secondary",
					"secondary text": "secondary text",
					"secondary icon": "secondary icon",
					"secondary icon outline": "secondary icon outline",
					"secondary text icon": "secondary text icon",
					"secondary outline": "secondary outline",
					info: "info",
					"info text": "info text",
					"info icon": "info icon",
					"info icon outline": "info icon outline",
					"info text icon": "info text icon",
					"info outline": "info outline",
					success: "success",
					"success text": "success text",
					"success icon": "success icon",
					"success text icon": "success text icon",
					"success outline": "success outline",
					danger: "danger",
					"danger text": "danger text",
					"danger icon": "danger icon",
					"danger text icon": "danger text icon",
					"danger outline": "danger outline",
				},
				""
			),
			size: select(
				"Size",
				{
					small: "small",
					medium: "medium",
					large: "large",
				},
				"medium"
			),
			disabled: boolean("disabled", false),
		}),
		template: `<div style="padding: 2rem;">
				<h2>Knobs</h2>
				<base-button :disabled="disabled" :size="size" :design="design">{{ text }}</base-button>

				<h2>Sizes</h2>
				<base-button size="small">small</base-button>
				<base-button>medium (default)</base-button>
				<base-button size="large">large</base-button>

				<h2>Primary Action</h2>
				<base-button design="primary">
					<base-icon source="material" icon="add"/>
					primary
				</base-button>
				<base-button design="primary outline">primary outline</base-button>
				<base-button design="primary text">primary text</base-button>
				<base-button design="primary icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="primary icon outline">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="primary text icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<br/><br/>
				<base-button design="hero-cta" size="large">hero-cta</base-button>
				<base-button design="fancy" size="large">hero-cta fancy</base-button>
				<base-button design="hero-cta icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="fancy icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<br/><br/>

				<h2>Secondary Action</h2>
				<base-button design="secondary">secondary</base-button>
				<base-button design="secondary outline">secondary outline</base-button>
				<base-button design="secondary text">secondary text</base-button>
				<base-button design="secondary icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="secondary icon outline">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="secondary text icon">
					<base-icon source="material" icon="home"/>
				</base-button>

				<h2>Tertiary Action</h2>
				<base-button>Default</base-button>
				<base-button design="outline">outline</base-button>
				<base-button design="text">text</base-button>
				<base-button design="icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="icon outline">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="text icon">
					<base-icon source="material" icon="home"/>
				</base-button>




				<h2>Disabled</h2>
				<base-button disabled>Disabled</base-button>
				<base-button disabled design="outline">Disabled outline</base-button>
				<base-button disabled design="text">Disabled text</base-button>
				<base-button disabled design="icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button disabled design="text icon">
					<base-icon source="material" icon="home"/>
				</base-button>

				<h2>Signal</h2>
				<base-button design="success">success</base-button>
				<base-button design="success outline">success outline</base-button>
				<base-button design="success text">success text</base-button>
				<base-button design="success icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="success text icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<br/><br/>
				<base-button design="danger">danger</base-button>
				<base-button design="danger outline">danger outline</base-button>
				<base-button design="danger text">danger text</base-button>
				<base-button design="danger icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="danger text icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<br/><br/>
				<base-button design="info">info</base-button>
				<base-button design="info outline">info outline</base-button>
				<base-button design="info text">info text</base-button>
				<base-button design="info icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="info text icon">
					<base-icon source="material" icon="home"/>
				</base-button>

				<h2>Other</h2>
				<base-button design="none">none</base-button> wherever we need a plain button
			</div>`,
	}))
	.add("BaseCard", () => ({
		components: {
			BaseCard,
		},
		template: "<base-card>Card</base-card>",
		methods: {},
	}))
	.add("Base Select", () => ({
		components: {
			BaseSelect,
		},
		data: () => ({
			content: [],
			options: [
				{
					_id: 1,
					value: 1,
					name: "Option 1",
				},
				{
					_id: 2,
					value: 2,
					name: "Option 2",
				},
				{
					_id: 3,
					value: 3,
					name: "Option 3",
				},
			],
			closeOnSelect: boolean("closeOnSelect", false),
			deselectLabel: text("deselectLabel", "Entfernen"),
			label: text("label", "Label"),
			multiple: boolean("mutiple", false),
			optionLabel: text("optionLabel", "name"),
			placeholder: text("placeholder", "Etwas auswählen"),
			selectLabel: text("selectLabel", "Auswählen"),
			selectedLabel: text("selectedLabel", "Aktiv"),
			trackBy: text("trackBy", "_id"),
			dataTestid: text("dataTestid", "dataTestid"),
		}),
		template: `
		<div>
		Content: {{content}} <br/>
		Options: {{options}} <br/>
			<base-select
				v-model="content"
				:closeOnSelect="closeOnSelect"
				:deselectLabel="deselectLabel"
				:label="label"
				:multiple="multiple"
				:options="options"
				:optionLabel="optionLabel"
				:placeholder="placeholder"
				:selectLabel="selectLabel"
				:selectedLabel="selectedLabel"
				:trackBy="trackBy">
			</base-select>
		</div>`,
		methods: {},
	}))
	.add("Base Link", () => ({
		components: {
			BaseLink,
		},
		template: `
			<div>
				<base-link href="https://schul-cloud.org">external Link to https://schul-cloud.org</base-link>
				<base-link to="/news">Internal Link to /news</base-link>
				<base-link name="news">Internal Link with name "news"</base-link>
			</div>`,
		methods: {},
	}))
	.add("Base Progressbar", () => ({
		components: {
			BaseProgressbar,
		},
		template: '<base-progressbar :value="2" :max="3"/>',
	}))
	.add("Base Collapsible", () => ({
		components: {
			BaseCollapsible,
		},
		template: `<base-collapsible label="Test">
			<p>Some collapsible content. Click the button to toggle between showing and hiding the collapsible content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		</base-collapsible>`,
	}))
	.add("Base Breadcrumb", () => ({
		components: {
			BaseBreadcrumb,
		},
		data: () => ({
			inputs: [
				{
					text: "Kurse",
					to: "",
					icon: {
						source: "material",
						icon: "school",
					},
				},
				{
					text: "Biologie",
					href: "http://schul-cloud.org",
				},
				{
					text: "Thema - das Nervensystem",
					href: "https://schul-cloud.org",
				},
			],
		}),
		template: `<base-breadcrumb :inputs="inputs"/>`,
		propsDescription: {
			inputs:
				"Strings are rendered as simple text, Objects are passed to BaseLink (text is interpreted as text, and the rest as properties)",
		},
	}))
	.add("Base Audio", () => ({
		components: {
			BaseAudio,
		},
		template: `<base-audio src="https://podcast.hpi.de/media/2019-03-05_neuland_ep05.mp3"></base-audio>`,
	}))
	.add("Base Video", () => ({
		components: {
			BaseVideo,
		},
		data: () => ({
			poster: text(
				"poster",
				"https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/explainer-poster.jpg"
			),
			source: text(
				"source",
				"https://www10-fms.hpi.uni-potsdam.de/vod/media/SCHUL-CLOUD/explainer2018/hd/video.mp4"
			),
			noControls: boolean("noControls", false),
		}),
		template: `
			<base-video
				style="max-width: 400px"
				:noControls="noControls"
				:poster="poster"
				:sources="[
					{
						src: source,
						type: 'video/mp4',
					}
				]"
			/>`,
	}))
	.add("Base QrCode", () => ({
		components: {
			BaseQrCode,
		},
		data: () => ({
			url: text("Url", "http://www.schul-cloud.org"),
		}),
		template: `<base-qr-code :url="url"/>`,
	}))
	.add("BaseBlockquote", () => ({
		components: {
			BaseBlockquote,
		},
		data: () => ({
			cite: text("cite", "http://www.worldwildlife.org/who/index.html"),
			quote: text(
				"quote",
				`For 50 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5 million globally.`
			),
			srcText: text("src-text", ""),
		}),
		template: `
			<BaseBlockquote :cite="cite" :src-text="srcText || undefined">
				{{quote}}
			</BaseBlockquote>
		`,
	}))
	.add("BaseSpinner", () => ({
		components: {
			BaseSpinner,
		},
		data: () => ({
			label: text("label", "Loading"),
			color: color("color", "var(--color-tertiary)"),
			size: select(
				"size",
				{
					small: "small",
					medium: "medium",
					large: "large",
					xlarge: "xlarge",
				},
				"medium"
			),
		}),
		template: `<BaseSpinner :color="color" :size="size" :aria-label="label"/>`,
	}));
