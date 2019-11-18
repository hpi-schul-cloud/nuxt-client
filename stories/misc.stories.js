import { storiesOf } from "@storybook/vue";
import { text, select } from "@storybook/addon-knobs";

import notes from "@docs/storybook/misc.md";
import ProfilePicture from "@components/atoms/ProfilePicture";
import ExampleImage from "@assets/img/avatarExample.svg";
import MenuLink from "@components/atoms/MenuLink";
import DropdownMenu from "@components/organisms/DropdownMenu";
import BaseButton from "@basecomponents/BaseButton";
import PopupIcon from "@components/legacy/PopupIcon";
import DemoBanner from "@components/legacy/DemoBanner";
import PopupIconInitials from "@components/legacy/PopupIconInitials";

storiesOf("Misc", module)
	.addParameters({
		notes,
	})
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
