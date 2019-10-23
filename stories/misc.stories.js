import { storiesOf } from "@storybook/vue";
import { text, select } from "@storybook/addon-knobs";

import notes from "@docs/storybook/misc.md";
import PulsatingDot from "@components/atoms/PulsatingDot";
import ProfilePicture from "@components/atoms/ProfilePicture";
import ExampleImage from "@assets/img/avatarExample.svg";
import MenuLink from "@components/atoms/MenuLink";
import DropdownMenu from "@components/organisms/DropdownMenu";
import BaseButton from "@basecomponents/BaseButton";
import Searchbar from "@components/molecules/Searchbar";
import PopupIcon from "@components/legacy/PopupIcon";
import DemoBanner from "@components/legacy/DemoBanner";
import PopupIconInitials from "@components/legacy/PopupIconInitials";
import VueSwatchesColors from "vue-swatches";
import "vue-swatches/dist/vue-swatches.min.css";

storiesOf("Misc", module)
	.addParameters({
		notes,
	})
	.add("Color Picker Pop Up", () => ({
		components: { VueSwatchesColors },
		data: () => ({
			color: "#ACACAC",
			colors: [
				"#ACACAC",
				"#D4AF37",
				"#00E5FF",
				"#1DE9B6",
				"#546E7A",
				"#FFC400",
				"#BCAAA4",
				"#FF4081",
				"#FFEE58",
			],
		}),
		template: `
		<VueSwatchesColors v-model="color" :colors="colors" row-length="3" shapes="circles" show-border popover-to="right"></VueSwatchesColors>
		`,
	}))
	.add("Color Picker Inline", () => ({
		components: { VueSwatchesColors },
		data: () => ({
			color: "#00E5FF",
			colors: [
				"#ACACAC",
				"#D4AF37",
				"#00E5FF",
				"#1DE9B6",
				"#546E7A",
				"#FFC400",
				"#BCAAA4",
				"#FF4081",
				"#FFEE58",
			],
		}),
		template: `
		<VueSwatchesColors v-model="color" :colors="colors" shapes="circles" inline></VueSwatchesColors>
		`,
	}))
	.add("Pulsing Dot", () => ({
		components: { PulsatingDot },
		template: `<PulsatingDot />`,
	}))
	.add("Profile Pic", () => ({
		components: { ProfilePicture },
		data: () => ({ imgsrc: ExampleImage }),
		template: `<div><ProfilePicture :image="imgsrc" size="small"/><ProfilePicture :image="imgsrc" size="medium"/><ProfilePicture :image="imgsrc" size="large"/></div>`,
	}))
	.add("DropdownMenu", () => ({
		components: { DropdownMenu, MenuLink },
		template: `
			<DropdownMenu>
				<template v-slot:header>Dropdown</template>
				<MenuLink to="/">Link 1</MenuLink>
				<MenuLink to="/">Link 2</MenuLink>
				<MenuLink to="/">Link 3</MenuLink>
			</DropdownMenu>
		`,
	}))
	.add("Searchbar", () => ({
		components: { Searchbar },
		data: () => ({
			searchQuery: text("searchQuery", ""),
			placeholder: text("placeholder", "Suche nach..."),
		}),
		template: `<searchbar v-model.lazy="searchQuery" :placeholder="placeholder" />`,
	}))
	.add("Toast", () => ({
		components: { BaseButton },
		data: () => ({
			type: select(
				"type",
				{ show: "show", info: "info", success: "success", error: "error" },
				"show"
			),
			message: text("message", "Toast 🧐"),
		}),
		template: `
			<div>
				<BaseButton @click="$toast[type](message)">Knobs Toast</BaseButton>
				<br>
				<BaseButton @click="$toast.show('Show 🧐')">Default Toast</BaseButton>
				<BaseButton @click="$toast.info('Info 🤓')" design="info">Info Toast</BaseButton>
				<BaseButton @click="$toast.success('Success 😊')" design="success">Success Toast</BaseButton>
				<BaseButton @click="$toast.error('Error 😥')" design="danger">Error Toast</BaseButton>
			</div>
		`,
	}))
	.add("Popup Icon", () => ({
		components: { PopupIcon },
		template: `<div>
			<PopupIcon source="fa" icon="solid/address-book"></PopupIcon>
		</div>`,
	}))
	.add("Popup Icon with Initials", () => ({
		components: { PopupIconInitials, MenuLink },
		template: `<div style="text-align: right">
			<PopupIconInitials firstname="Fritz" lastname="Schmidt">
				<div>Fritz Schmidt </div>
				<MenuLink to="/">Link 1</MenuLink>
				<MenuLink to="/">Link 2</MenuLink>
			</PopupIconInitials>
		</div>`,
	}))
	.add("Demo Banner", () => ({
		components: { DemoBanner },
		template: `<div>
			<DemoBanner></DemoBanner>
		</div>`,
	}));
