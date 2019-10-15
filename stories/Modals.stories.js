import { storiesOf } from "@storybook/vue";
import { tableData, tableColumns } from "./mockData/BaseTable";
import { text, select, boolean, color } from "@storybook/addon-knobs";
import notes from "@docs/storybook/base.md";

import BaseButton from "@basecomponents/BaseButton";
import BaseIcon from "@basecomponents/BaseIcon";

import BaseModal from "@basecomponents/BaseModal";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooter from "@components/molecules/ModalFooter";
import ModalFooterActions from "@components/molecules/ModalFooterActions";
import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";

storiesOf("Base Components", module)
	.addParameters({
		notes,
	})
	.add("Modal/Base", () => ({
		components: { BaseModal, BaseButton },
		data: () => ({
			active: false,
		}),
		template: `
		<base-button @click="active = true">
				Open Modal
		</base-button>
		<BaseModal>
			<template v-slot:header>Header</template>
			<template v-slot:body>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			</template>
			<template v-slot:footer>
				Footer Slot
			</template>
		</BaseModal>`,
	}))
	.add("Modal/Action", () => ({
		components: { BaseModal, BaseButton, BaseIcon },
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
		<base-button @click="active = true">
				Open Modal
		</base-button>
		<BaseModal>
			<template v-slot:header>Header</template>
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
		</BaseModal>`,
	}))
	.add("Modal/Info", () => ({
		components: {
			BaseModal,
			BaseButton,
			BaseIcon,
			ModalBodyInfo,
			ModalFooterConfirm,
		},
		data: () => ({
			active: false,
		}),
		template: `
		<base-button @click="active = true">
				Open Modal
		</base-button>
		<BaseModal>
			<template v-slot:header>Header</template>
			<template v-slot:body>
				<ModalBodyInfo
					text="Confirm?"
				>
						<template v-slot:icon>
							<base-icon source="material" icon="info" style="color: var(--color-tertiary)"/>
						</template>
				</ModalBodyInfo>
			</template>
			<template v-slot:footer>
				<ModalFooterConfirm text="Ok"/>
			</template>
		</BaseModal>`,
	}))
	.add("Modal/Dialog", () => ({
		components: { BaseModal, BaseButton, BaseIcon, ModalBodyInfo },
		data: () => ({
			active: false,
		}),
		template: `
		<base-button @click="active = true">
				Open Modal
		</base-button>
		<BaseModal>
			<template v-slot:header>Header</template>
			<template v-slot:body>
				<ModalBodyInfo
					text="Confirm?"
				>
						<template v-slot:icon>
							<base-icon source="material" icon="info" style="color: var(--color-tertiary)"/>
						</template>
				</ModalBodyInfo>
			</template>
			<template v-slot:footer-right>
				<base-button design="secondary text" @click="active = false">
					Abbrechen
				</base-button>
				<base-button design="secondary" @click="active = false">
					Löschen
				</base-button>
			</template>
		</BaseModal>`,
	}));
