import { storiesOf } from "@storybook/vue";
import { text, color, select } from "@storybook/addon-knobs";
import notes from "@docs/storybook/base.md";

import BaseButton from "@basecomponents/BaseButton";
import BaseIcon from "@basecomponents/BaseIcon";

import BaseModal from "@basecomponents/BaseModal";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooterActions from "@components/molecules/ModalFooterActions";
import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";
import ModalFooterBorder from "@components/molecules/ModalFooterBorder";
import ModalFooter from "@components/molecules/ModalFooter";
import LoadingModal from "@components/molecules/LoadingModal";

storiesOf("4 Base UI Components/Modals", module)
	.addParameters({
		notes,
	})
	.add("Default", () => ({
		components: { BaseModal, BaseButton, ModalFooter, ModalFooterBorder },
		data: () => ({
			active: true,
			header: text("header", "Modal Inhalt Scrollt"),
			body: text(
				"body",
				"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
			),
			footer: text("footer", "This is a footer"),
			size: select("Size", { medium: "medium", large: "large" }, "medium"),
		}),
		template: `
		<div>
		<base-button @click="active = true">
				Open Modal
		</base-button>
		<base-modal :active.sync="active" :size="size">
			<template v-slot:header>{{header}}</template>
			<template v-slot:body>{{body}}

			</template>
			<template v-slot:footer>
				<modal-footer-border>
					<template v-slot:right>
						<base-button design="primary text" @click="active = false">
							Abbrechen
						</base-button>
						<base-button design="primary" @click="active = false"> Übernehmen</base-button>
					</template>
				</modal-footer-border>
		</template>
		</base-modal>
		</div>`,
	}))
	.add("Action", () => ({
		components: { BaseModal, BaseButton, BaseIcon, ModalFooterActions },
		data: () => ({
			active: true,
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
		template: `<div>
			<base-button @click="active = true">
					Open Modal
			</base-button>
			<base-modal :active.sync="active">
				<template v-slot:header>Plugin Einstellungen</template>
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
				<template v-slot:footer>
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
		</div>`,
	}))
	.add("Info", () => ({
		components: {
			BaseModal,
			BaseButton,
			BaseIcon,
			ModalBodyInfo,
			ModalFooterConfirm,
		},
		data: () => ({
			active: true,
		}),
		template: `<div>
		<base-button @click="active = true">
			Open Modal
		</base-button>
		<base-modal :active.sync="active">
			<template v-slot:header></template>
			<template v-slot:body>
				<ModalBodyInfo
					title="Das neue Schuljahr hat soeben begonnen"
				>
					<template v-slot:icon>
						<base-icon source="material" icon="info" style="color: var(--color-success)"/>
					</template>
				</ModalBodyInfo>
			</template>
			<template v-slot:footer>
				<ModalFooterConfirm text="Ok" @click="active = false"/>
			</template>
		</base-modal>
		</div>`,
	}))
	.add("Dialog", () => ({
		components: { BaseModal, BaseButton, BaseIcon, ModalBodyInfo, ModalFooter },
		data: () => ({
			active: true,
		}),
		template: `<div>
		<base-button @click="active = true">
				Open Modal
		</base-button>
		<base-modal :active.sync="active">
			<template v-slot:header></template>
			<template v-slot:body>
				<ModalBodyInfo
					title="Bist du sicher, dass du das Thema das Herz löschen möchtest?"
				>
					<template v-slot:icon>
						<base-icon source="material" icon="report_problem" style="color: var(--color-danger)"/>
					</template>
				</ModalBodyInfo>
			</template>
			<template v-slot:footerRight>
				<base-button design="primary text" @click="active = false">
					Abbrechen
				</base-button>
				<base-button design="primary" @click="active = false">
					Aktionsname
				</base-button>
			</template>
		</base-modal>
		</div>`,
	}))
	.add("Loading", () => ({
		components: { LoadingModal },
		template: `<div>
		<base-button @click="active = true">Open Modal</base-button>
			<LoadingModal :title="title" :description="description" :active.sync="active"/>
		</div>`,
		data: () => ({
			active: true,
			title: text("title", "Daten werden geladen…"),
			description: text(
				"description",
				"Dies kann bis zu einer Minute dauern. Wir bitten um etwas Geduld…"
			),
		}),
	}));
