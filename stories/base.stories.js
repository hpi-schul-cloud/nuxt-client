import { storiesOf } from "@storybook/vue";
import { tableData, tableColumns } from "./mockData/BaseTable";
import { text, select, boolean, color } from "@storybook/addon-knobs";
import BaseButton from "@basecomponents/BaseButton";
import notes from "@docs/storybook/base.md";
import BaseCard from "@basecomponents/BaseCard";
import BaseIcon from "@basecomponents/BaseIcon";
import BaseInput, {
	supportedTypes as baseInputTypes,
} from "@basecomponents/BaseInput/BaseInput";
import BaseLink from "@basecomponents/BaseLink";
import BaseProgressbar from "@basecomponents/BaseProgressbar";
import BaseTable from "@basecomponents/BaseTable";
import BaseCollapsible from "@basecomponents/BaseCollapsible";
import BaseBreadcrumb from "@basecomponents/BaseBreadcrumb";
import BaseSelect from "@basecomponents/BaseSelect";
import BaseTextarea from "@basecomponents/BaseTextarea";
import BaseAudio from "@basecomponents/BaseAudio";
import BaseVideo from "@basecomponents/BaseVideo";
import BaseQrCode from "@basecomponents/BaseQrCode";
import BaseModalScroll from "@basecomponents/BaseModalScroll";
import BaseModalAction from "@basecomponents/BaseModalAction";
import BaseModalActionSymbol from "@basecomponents/BaseModalActionSymbol";
import BaseModalInfo from "@basecomponents/BaseModalInfo";
import BaseModalFooter from "@basecomponents/BaseModalFooter";
import BaseModalFooterButton from "@basecomponents/BaseModalFooterButton";
import BaseBlockquote from "@basecomponents/BaseBlockquote";

storiesOf("Base Components", module)
	.addParameters({
		notes,
	})
	.add("Base Button", () => ({
		components: { BaseButton, BaseIcon },
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
					"icon text": "icon text",
					primary: "primary",
					"primary text": "primary text",
					"primary icon": "primary icon",
					"primary icon text": "primary icon text",
					"primary outline": "primary outline",
					"hero-cta": "hero-cta",
					"hero-cta icon": "hero-cta icon",
					fancy: "fancy",
					"fancy icon": "fancy icon",
					secondary: "secondary",
					"secondary text": "secondary text",
					"secondary icon": "secondary icon",
					"secondary icon text": "secondary icon text",
					"secondary outline": "secondary outline",
					success: "success",
					"success text": "success text",
					"success icon": "success icon",
					"success icon text": "success icon text",
					"success outline": "success outline",
					danger: "danger",
					"danger text": "danger text",
					"danger icon": "danger icon",
					"danger icon text": "danger icon text",
					"danger outline": "danger outline",
				},
				""
			),
			size: select(
				"Size",
				{ small: "small", medium: "medium", large: "large" },
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
					<base-icon source="material" icon="home"/>
					primary
				</base-button>
				<base-button design="primary outline">primary outline</base-button>
				<base-button design="primary text">primary text</base-button>
				<base-button design="primary icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="primary icon text">
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
				<base-button design="secondary icon text">
					<base-icon source="material" icon="home"/>
				</base-button>

				<h2>Tertiary Action</h2>
				<base-button>Default</base-button>
				<base-button design="outline">outline</base-button>
				<base-button design="text">text</base-button>
				<base-button design="icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="icon text">
					<base-icon source="material" icon="home"/>
				</base-button>

				<h2>Disabled</h2>
				<base-button disabled>Disabled</base-button>
				<base-button disabled design="outline">Disabled outline</base-button>
				<base-button disabled design="text">Disabled text</base-button>
				<base-button disabled design="icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button disabled design="icon text">
					<base-icon source="material" icon="home"/>
				</base-button>

				<h2>Signal</h2>
				<base-button design="success">success</base-button>
				<base-button design="success outline">success outline</base-button>
				<base-button design="success text">success text</base-button>
				<base-button design="success icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="success icon text">
					<base-icon source="material" icon="home"/>
				</base-button>
				<br/><br/>
				<base-button design="danger">danger</base-button>
				<base-button design="danger outline">danger outline</base-button>
				<base-button design="danger text">danger text</base-button>
				<base-button design="danger icon">
					<base-icon source="material" icon="home"/>
				</base-button>
				<base-button design="danger icon text">
					<base-icon source="material" icon="home"/>
				</base-button>

				<h2>Other</h2>
				<base-button design="none">none</base-button> wherever we need a plain button
			</div>`,
	}))
	.add("Base Card", () => ({
		components: { BaseCard },
		template: "<base-card>Card</base-card>",
		methods: {},
	}))
	.add("Base Icon", () => ({
		components: { BaseIcon },
		data: () => ({
			icon: text("icon", "home"),
			source: select(
				"source",
				{ material: "material", fa: "fa", custom: "custom" },
				"material"
			),
			size: text("size", "1em"),
			color: color("color", "#f8a41b"),
		}),
		template: `<div>
			<p>
				Icon usage is simple: <base-icon :source="source" :icon="icon" :style="{'font-size': size, fill: color}"/>
			</p>
			<p>
				You can als use icons from fontawesome: <base-icon source="fa" icon="solid/address-book" :style="{'font-size': size}"/>
			</p>
			<p>
				The Color can be also be set using fill:
				<base-icon source="material" icon="add" :fill="color"/>
			</p>
			<p>
				Scaling works, by setting the font-size attribute:
				<base-icon source="custom" icon="tasks" style="font-size: 2em" />
			</p>
		</div>`,
	}))
	.add("Base Input (Knobs)", () => {
		const baseInputTypesDict = {};
		baseInputTypes.forEach((type) => {
			baseInputTypesDict[type] = type;
		});
		return {
			components: { BaseInput, BaseIcon },
			data: () => ({
				vmodel: text("v-model", ""),
				type: select("type", baseInputTypesDict, baseInputTypes[0]),
				label: text("label", "Label"),
				name: text("name", "name"),
				value: text("value", ""),
				placeholder: text("placeholder", "Placeholder"),
				hint: text("hint", "* required"),
				error: text("error", ""),
			}),
			template: `
				<div>
					<base-input
						v-model="vmodel"
						:label="label"
						:type="type"
						:name="name"
						:placeholder="placeholder"
						:hint="hint"
						:error="error"
					>
						<base-icon slot="icon" source="material" icon="alarm" />
					</base-input>
				</div>`,
		};
	})
	.add("Base Input (All)", () => ({
		components: { BaseInput },
		data: () => ({
			vmodels: {
				text: "",
				email: "",
				password: "",
				url: "",
				number: 0,
				date: "",
				time: "",
				checkboxBoolean: true,
				checkboxList: ["a"],
				switch: true,
				radio: "b",
			},
		}),

		template: `<div>
			${["text", "email", "password", "url", "number", "date", "time"]
				.map(
					(type) =>
						`<base-input type="${type}" v-model="vmodels['${type}']" label="${type}" name="${type}" />\n`
				)
				.join("")
				.trimRight()}
			<div>
				<base-input type="checkbox" v-model="vmodels.checkboxList" value="a" label="Checkbox" name="checkbox" />
				<base-input type="checkbox" v-model="vmodels.checkboxList" value="b" label="Checkbox" name="checkbox" />
			</div>
			<base-input type="switch" v-model="vmodels.switch" label="Switch" name="switch" />
			<div>
				<base-input type="radio" v-model="vmodels.radio" value="a" label="Radio 1" name="radio" />
				<base-input type="radio" v-model="vmodels.radio" value="b" label="Radio 2" name="radio" />
			</div>
			<pre>{{ JSON.stringify(vmodels, null, 2) }}</pre>
		</div>`,
	}))
	.add("Base Textarea", () => ({
		components: { BaseTextarea },
		data: () => ({
			value: "",
			label: text("label", "Label"),
			placeholder: text(
				"placeholder",
				"Lange Geschichten brauchen eine BaseTextarea."
			),
		}),
		template: `
			<div>
				v-model: {{value}} <br/>
				<base-textarea v-model="value" :label="label" :placeholder="placeholder"/>
			</div>`,
		methods: {},
	}))
	.add("Base Select", () => ({
		components: { BaseSelect },
		data: () => ({
			content: [],
			options: [
				{ value: 1, name: "Option 1" },
				{ value: 2, name: "Option 2" },
				{ value: 3, name: "Option 3" },
			],
			optionLabel: "name",
			label: text("label", "Label"),
			placeholder: text("placeholder", "Etwas auswählen"),
			multiple: select("mutliple", { true: true, false: false }, false),
		}),
		template: `
		<div>
		Content: {{content}} <br/>
		Options: {{options}} <br/>
			<base-select v-model="content" :multiple="multiple" :options="options" :label="label" optionLabel="name" :placeholder="placeholder"/>
		</div>`,
		methods: {},
	}))
	.add("Base Link", () => ({
		components: { BaseLink },
		template: `
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
		data: () => ({
			data: tableData,
			columns: tableColumns,
		}),
		components: { BaseTable },
		template: `
			<base-table v-slot:default="slotProps" :data="data" :columns="columns">
				<span>{{ slotProps.row.firstName + ' ' +  slotProps.row.lastName }}</span>
			</base-table>
		`,
	}))
	.add("Base Collapsible", () => ({
		components: { BaseCollapsible },
		template: `<base-collapsible label="Test">
			<p>Some collapsible content. Click the button to toggle between showing and hiding the collapsible content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		</base-collapsible>`,
	}))
	.add("Base Breadcrumb", () => ({
		components: { BaseBreadcrumb },
		data: () => ({
			inputs: [
				{
					text: "Kurse",
					to: "",
					icon: { source: "material", icon: "school" },
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

	.add("Base Modal Scroll", () => ({
		components: { BaseModalScroll, BaseButton },
		data: () => ({
			active: false,
			header: text("header", "Modal Inhalt Scrollt"),
			body: text(
				"body",
				"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
			),
		}),
		template: `
			<div>
				<base-button @click="active = true">
					Open Modal
				</base-button>

				<base-modal-scroll :active.sync="active">
				<template v-slot:header>{{header}}</template>
				<template v-slot:body>{{body}}</template>
				<template v-slot:footer>
					<base-button design="secondary text" @click="active = false">
						Abbrechen
					</base-button>
					<base-button design="secondary" @click="active = false">
						Aktionsname
					</base-button>
				</template>
				</base-modal-scroll>
			</div>
		`,
		methods: {},
	}))

	.add("Base Modal Action", () => ({
		components: {
			BaseModalAction,
			BaseButton,
			BaseIcon,
			BaseModalFooter,
			BaseModalScroll,
		},
		data: () => ({
			active: false,
			header: text("header", "Plugin Einstellungen"),
			body: text("body"),
			color: color("color", "var(--color-white)"),
			inputs: {
				a: [],
				b: [],
				c: [],
				d: [],
			},
		}),
		template: `

		<div>
			<base-button @click="active = true">
					Open Modal
			</base-button>

			<base-modal :active.sync="active">
				<template v-slot:header>{{header}}</template>

				<template v-slot:body>

					<div>
						<base-input v-model="inputs.a" type="checkbox" value="a" label="Anonyme Abgabe" name="checkbox" />
						<base-icon source="material" icon="info" style="color: var(--color-tertiary)"/>
					</div>
					<div>
						<base-input v-model="inputs.b" type="checkbox" value="b" label="Schülerabgabe untereinander sichtbar" name="checkbox" />
						<base-icon source="material" icon="info" style="color: var(--color-tertiary)"/>
					</div>
					<div>
						<base-input v-model="inputs.c" type="checkbox" value="c" label="Worte" name="checkbox" />
						<base-icon source="material" icon="info" style="color: var(--color-tertiary)"/>
					</div>
					<div>
						<base-input v-model="inputs.d" type="checkbox" value="d" label="Punkte" name="checkbox" />
						<base-icon source="material" icon="info" style="color: var(--color-tertiary)"/>
					</div>

				</template>

				<template v-slot:footer-wrapper>
					<modal-footer-actions>
						<template v-slot:left>

							<base-button design="icon">
								<base-icon source="material" icon="delete_outline" :fill="color"/>
							</base-button>

							<base-button design="icon">
								<base-icon source="material" icon="file_copy" :fill="color"/>
							</base-button>

							<base-button design="icon">
								<base-icon source="material" icon="share" :fill="color"/>
							</base-button>

							<base-button design="icon">
								<base-icon source="material" icon="info" :fill="color"/>
							</base-button>

						</template>
							<template v-slot:right>
								<base-button @click="active = false">
									Abbrechen
								</base-button>
								<base-button design="outline" @click="active = false"> Übernehmen</base-button>
			 			</template>
					</modal-footer-actions>
				</template>
			</base-modal>
		</div>
		`,
		methods: {},
	}))

	.add("Base Modal Action Symbol", () => ({
		components: {
			BaseModalActionSymbol,
			BaseButton,
			BaseIcon,
		},
		data: () => ({
			active: false,
			body: text("body"),
			color: color("color", "var(--color-danger)"),
		}),
		template: `
			<div>
				<base-button @click="active = true">
					Open Modal
				</base-button>

				<base-modal-action-symbol :active.sync="active">
				<template v-slot:header>
				<base-icon slot="icon" source="material" icon="report_problem" :fill="color" style="font-size: 2.5em" />
				</template>
				<template v-slot:body>Bist du sicher, dass du das Thema „das Herz” löschen möchtest?</template>
				<template v-slot:footer>
					<base-button design="secondary text" @click="active = false">
						Abbrechen
					</base-button>
					<base-button design="secondary" @click="active = false">
						Löschen
					</base-button>
				</template>
				</base-modal-action-symbol>
			</div>
		`,
		methods: {},
	}))
	.add("Base Modal Info", () => ({
		components: {
			BaseModalInfo,
			BaseButton,
			BaseIcon,
			BaseModalFooterButton,
		},
		data: () => ({
			active: false,
			body: text("body", "Das neue Schuljahr hat soeben begonnen"),
			color: color("color", "var(--color-success)"),
		}),
		template: `
			<div>
				<base-button @click="active = true">
					Open Modal
				</base-button>

				<base-modal-info :active.sync="active">
				<template v-slot:header>
				<base-icon slot="icon" source="material" icon="check_circle" :fill="color" style="font-size: 3em" />
				</template>
				<template v-slot:body>{{body}}</template>
				<template v-slot:footer-wrapper>
				<base-modal-footer-button @click="active = false"/>
				</template>
				</base-modal-info>
			</div>
		`,
		methods: {},
	}))
	.add("Base Dialog", () => ({
		data: () => ({ active: false }),
		template: `
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
		components: { BaseQrCode },
		data: () => ({
			url: text("Url", "http://www.schul-cloud.org"),
		}),
		template: `<base-qr-code :url="url"/>`,
	}))
	.add("BaseBlockquote", () => ({
		components: { BaseBlockquote },
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
	}));
