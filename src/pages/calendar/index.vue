<!-- eslint-disable max-lines -->
<template>
	<div class="content">
		<div class="route-calendar">
			<BaseTitle>Kalender</BaseTitle>
			<div>
				<appointment-modal
					:input-text.sync="inputText"
					:modal-active.sync="modalActive"
					:confirm-active="confirmActive"
					:date-editable="dateEditable"
					:is-teams-d-d-visible="isTeamsDDVisible"
					:is-courses-d-d-visible="isCoursesDDVisible"
					:is-submit="isSubmit"
					:is-save="isSave"
					:is-remove="isRemove"
					:radio-value="radioValue"
					:start-day.sync="startDayInput"
					:start-time.sync="startTimeInput"
					:end-day.sync="endDayInput"
					:end-time.sync="endTimeInput"
					:users-teams="usersTeams"
					:users-courses="usersCourses"
					:content-courses.sync="contentCourses"
					:content-teams.sync="contentTeams"
					@cancel="cancelHandle"
					@input="onInput"
					@setScopeId="setScopeId"
					@submit="submit"
					@removeDate="removeDate"
					@saveDate="saveDate"
					@prepareSubmit="prepareSubmit"
					@prepareRemove="prepareRemove"
					@prepareSave="prepareSave"
					@cancelConfirm="cancelConfirm"
				></appointment-modal>
			</div>
			<full-calendar
				ref="calendar"
				class="fullcalender"
				:editable="false"
				:events="events"
				:header="header"
				:config="config"
				@day-click="handleDateClick"
				@event-selected="eventClick"
			></full-calendar>
		</div>
	</div>
</template>
<script>
import "fullcalendar/dist/fullcalendar.css";
import AppointmentModal from "@components/organisms/Calendar/AppointmentModal";
import moment from "moment";
export default {
	layout: "loggedInFull",
	components: { AppointmentModal },
	data() {
		return {
			events: [],
			dateEditable: false,
			modalActive: false,
			calendar: undefined,
			currentUserId: undefined,
			currentEventId: undefined,
			usersTeams: [],
			usersCourses: [],
			contentTeams: {},
			contentCourses: {},
			confirmActive: false,
			isCoursesDDVisible: false,
			isTeamsDDVisible: false,
			isSave: false,
			isRemove: false,
			isSubmit: false,
			startDayInput: "",
			startTimeInput: "",
			endDayInput: "",
			endTimeInput: "",
			inputText: "",
			radioValue: "",
			teams: "Teams",
			courses: "Courses",
			jwtDecode: require("jwt-decode"),
			currentScopeId: undefined,
			header: {
				left: "title",
				right: "month,agendaWeek,agendaDay prev,today,next",
			},
			config: {
				locale: "de",
			},
		};
	},
	created() {
		this.init();
	},
	methods: {
		prepareSubmit() {
			this.confirmActive = true;
			this.isSubmit = true;
		},
		prepareRemove() {
			this.confirmActive = true;
			this.isRemove = true;
		},
		prepareSave() {
			this.confirmActive = true;
			this.isSave = true;
		},
		cancelConfirm() {
			this.isSave = false;
			this.isRemove = false;
			this.isSubmit = false;
			this.confirmActive = false;
		},
		handleDateClick(date) {
			const startDate = moment(date);
			const endDate = moment(startDate).add(30, "minutes");
			this.setModalEventAndState(startDate, endDate, "", "");
		},
		onInput(radioValue) {
			if (radioValue == "teams") {
				this.isTeamsDDVisible = true;
				this.isCoursesDDVisible = false;
			} else {
				this.isTeamsDDVisible = false;
				this.isCoursesDDVisible = true;
			}
		},
		setScopeId(input) {
			this.currentScopeId = input._id;
		},
		eventClick(event) {
			const startDate = moment(event.start);
			const endDate = moment(event.end);
			this.dateEditable = true;
			this.setModalEventAndState(startDate, endDate, event.title, event._id);
		},
		cancelHandle() {
			this.resetScope();
			this.modalActive = false;
			this.dateEditable = false;
		},
		init() {
			// initially set ScopeID to userId
			this.currentUserId = this.jwtDecode(this.$cookies.get("jwt")).userId;
			this.currentScopeId = this.currentUserId;
			this.getUserTeams();
			this.getUserCourses();
			this.update();
		},
		submit() {
			const start = this.setTime(
				moment.utc(this.startDayInput),
				this.startTimeInput
			);
			const end = this.setTime(moment.utc(this.endDayInput), this.endTimeInput);
			this.postCalendarData(start.toISOString(), end.toISOString());
			this.update();
			this.resetScope();
			this.cancelConfirm();
			this.modalActive = false;
			this.dateEditable = false;
		},
		removeDate() {
			this.deleteDate();
			this.removeEvent();
			this.resetScope();
			this.cancelConfirm();
			this.modalActive = false;
			this.dateEditable = false;
			this.contentTeams = undefined;
			this.contentCourses = undefined;
		},
		saveDate() {
			this.deleteDate();
			this.removeEvent();
			const start = this.setTime(
				moment.utc(this.startDayInput),
				this.startTimeInput
			);
			const end = this.setTime(moment.utc(this.endDayInput), this.endTimeInput);
			this.postCalendarData(start.toISOString(), end.toISOString());
			this.update();
			this.resetScope();
			this.cancelConfirm();
			this.modalActive = false;
			this.dateEditable = false;
		},
		resetScope() {
			this.inputText = "";
			this.radioValue = "";
			this.isTeamsDDVisible = false;
			this.isCoursesDDVisible = false;
			this.currentScopeId = this.currentUserId;
		},
		setTime(dateToSet, timeForSetting) {
			const startTime = moment(timeForSetting, "HH:mm");
			dateToSet.set({
				hour: startTime.get("hour"),
				minute: startTime.get("minute"),
			});
			return dateToSet;
		},
		setModalEventAndState(startDate, endDate, title, id) {
			this.currentEventId = id;
			this.inputText = title;
			this.startDayInput = startDate.toISOString();
			this.startTimeInput = startDate.format("HH:mm");
			this.endDayInput = endDate.toISOString();
			this.endTimeInput = endDate.format("HH:mm");
			this.modalActive = true;
		},
		removeEvent() {
			this.events.forEach((event) => {
				if (event._id === this.currentEventId) {
					const index = this.events.indexOf(event);
					this.events.splice(index, 1);
				}
			});
		},
		update() {
			try {
				this.getCalendarData().then(() => {
					this.calendar.forEach((event) => {
						this.pushEvent(event);
					});
				});
			} catch (error) {
				console.error(error);
			}
		},
		isNewElement(elementArg, list) {
			let found = false;
			list.forEach((element) => {
				if (element._id === elementArg._id) {
					found = true;
				}
			});
			return !found;
		},
		pushEvent(event) {
			if (this.isNewElement(event, this.events)) {
				this.events.push({
					title: event.title,
					start: event.start,
					end: event.end,
					_id: event._id,
					color: this.checkforCourseColor(event),
				});
			}
		},
		checkforCourseColor(event) {
			let courseColor = undefined;
			event.relationships["scope-ids"].forEach((id) => {
				this.usersCourses.forEach((course) => {
					if (id === course._id && course.color != undefined) {
						courseColor = course.color;
					}
				});
			});
			return courseColor;
		},
		pushScope(event, list) {
			if (this.isNewElement(event, list)) {
				list.push({
					_id: event._id,
					label: event.name,
					color: event.color,
				});
			}
		},
		async getCalendarData() {
			try {
				await this.$store.dispatch("calendar/find").then((res) => {
					this.calendar = res;
				});
			} catch (error) {
				console.error(error);
			}
		},
		async getUserTeams() {
			try {
				await this.$store.dispatch("teams/find").then((res) => {
					res.data.forEach((element) => {
						this.pushScope(element, this.usersTeams);
					});
				});
			} catch (error) {
				console.error(error);
			}
		},
		async getUserCourses() {
			try {
				await this.$store.dispatch("courses/find").then((res) => {
					res.data.forEach((element) => {
						console.log(element);
						this.pushScope(element, this.usersCourses);
					});
				});
			} catch (error) {
				console.error(error);
			}
		},
		async postCalendarData(startDate, endDate) {
			this.$store.dispatch("calendar/create", {
				startDate: startDate,
				scopeId: this.currentScopeId,
				endDate: endDate,
				summary: this.inputText,
			});
		},
		async deleteDate() {
			this.$store.dispatch("calendar/removeDate", {
				id: this.currentEventId,
			});
		},
	},
};
</script>
