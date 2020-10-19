<!-- eslint-disable max-lines -->

<template>
	<div class="route-calendar">
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
				@setCourseScopeId="setCourseScopeId"
				@setTeamScopeId="setTeamScopeId"
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
			ref="fullCalendar"
			:options="calendarOptions"
		></full-calendar>
	</div>
</template>
<script>
import AppointmentModal from "@components/organisms/Calendar/AppointmentModal";
//TODOs
// [x] Display reoccuring events
// [ ] Dedicated Edit mode
// [ ] Handle permissions
// [x] Partial Data-Loading
// [x] On Event Click Go To Team Or Course page if its not a personal event
// [x] Locales
// [ ] Handling BBB Events
// [x] Send course or team if on create if selected
// [ ] Courses and teams need permissions so we can filter which to display
// [ ] Suport fullday events (create and view)
// [x] Fix race condition when events are loaded before courses and teams are fetched (makes coloring break)
// [x] Show event after creation
// [ ] Make events draggable
// [x] Onclick create prefill clicked values
// [ ] Localize Modal
// [x] Fix time offset and add timezone handling

// Create Code vom Client
// summary: data.name,
// 				location: res.locals.currentSchoolData.name,
// 				description: data.description,
// 				startDate: new Date(
// 					new Date(data.startDate).getTime() + time.startTime,
// 				).toISOString(),
// 				duration: time.duration,
// 				repeat_until: data.untilDate,
// 				frequency: 'WEEKLY',
// 				weekday: recurringEventsHelper.getIsoWeekdayForNumber(time.weekday),
// 				scopeId: data._id,  //why is this doubled
// 				courseId: data._id,
// 				courseTimeId: time._id,
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import allLocales from "@fullcalendar/core/locales-all";
import rrulePlugin from "@fullcalendar/rrule";
import moment from "moment";

export default {
	layout: "loggedInFull",
	components: { AppointmentModal, FullCalendar },
	data() {
		return {
			calendarOptions: {
				plugins: [
					dayGridPlugin,
					interactionPlugin,
					listPlugin,
					timeGridPlugin,
					rrulePlugin,
				],
				initialView: "timeGridWeek",
				editable: false, //handle this later on a per event level base on the permission
				nowIndicator: true,
				timeZone: "UTC",
				dateClick: this.handleDateClick,
				eventClick: this.eventClick,
				events: this.loadEvents,
				headerToolbar: {
					left: "title",
					center: "",
					right:
						"dayGridMonth,timeGridWeek,timeGridDay,listWeek prev,today,next",
				},
				weekNumbers: false,
				scrollTime: "07:00:00",
				locales: allLocales,
				locale: this.$i18n.locale,
			},
			events: {},
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
			courseScopeId: undefined,
			teamScopeId: undefined,
			allNeededDataLoaded: false,
		};
	},
	created() {
		// this.init();
	},
	methods: {
		async loadEvents(info, successCallback, failureCallback) {
			try {
				// from=2020-10-16T09%3A00%3A00.000Z&until=
				const options = {
					from: info.startStr,
					until: info.endStr,
				};
				// this will happen on first load
				if (this.allNeededDataLoaded === false) {
					await this.getUserTeams();
					await this.getUserCourses();
					this.allNeededDataLoaded = true;
				}
				await this.$store
					.dispatch("calendar/getEvents", options)
					.then((res) => {
						res.forEach((event) => {
							if (
								event.included &&
								event.included[0] &&
								event.included[0].type == "rrule" &&
								event.included[0].attributes
							) {
								const att = event.included[0].attributes;
								event.rrule = {
									dtstart: event.attributes.dtstart,
									freq: att.freq,
									until: att.until,
									byweekday: [].concat(att.wkst || []), //enforce array
								};
							}
							event.color = this.checkforItemColor(event);
							//store to internal key value store
							this.pushEvent(event);
						});
						successCallback(res);
					});
			} catch (error) {
				failureCallback(error);
			}
		},
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
		handleDateClick(event) {
			const startDate = moment(event.date);
			const endDate = moment(startDate).add(60, "minutes");
			this.setModalEventAndState(startDate, endDate, "", "");
		},
		onInput(radioValue) {
			if (radioValue == "teams") {
				this.isTeamsDDVisible = true;
				this.isCoursesDDVisible = false;
			} else if (radioValue == "courses") {
				this.isTeamsDDVisible = false;
				this.isCoursesDDVisible = true;
			} else {
				this.isTeamsDDVisible = false;
				this.isCoursesDDVisible = false;
			}
		},
		setCourseScopeId(input) {
			this.courseScopeId = input._id;
		},
		setTeamScopeId(input) {
			this.teamScopeId = input._id;
		},
		eventClick(event) {
			const id = event.event.extendedProps._id;
			const clickedEvent = this.events[id];
			if (clickedEvent) {
				console.log(clickedEvent);
				//if this is true this is a videconference
				if (clickedEvent.attributes["x-sc-teamid"]) {
					// go to team page
					const target =
						"/teams/" +
						clickedEvent.attributes["x-sc-teamid"] +
						"/?activeTab=events";
					location.href = target;
				} else if (clickedEvent.attributes["x-sc-courseid"]) {
					// go to course page
					const target = "/courses/" + clickedEvent.attributes["x-sc-courseid"];
					location.href = target;
				} else {
					//TODO: edit mode for private events
				}
			}
		},
		cancelHandle() {
			this.resetScope();
			this.modalActive = false;
			this.dateEditable = false;
		},
		submit() {
			const start = this.setTime(
				moment.utc(this.startDayInput),
				this.startTimeInput
			);
			const end = this.setTime(moment.utc(this.endDayInput), this.endTimeInput);
			this.postCalendarData(start.toISOString(), end.toISOString());
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
			this.startDayInput = startDate.toISOString().split("T")[0];
			this.startTimeInput = startDate.format("HH:mm");
			this.endDayInput = endDate.toISOString().split("T")[0];
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
		isNewElement(elementArg, list) {
			// list is an object
			let found = false;
			if (list[elementArg._id]) {
				found = true;
			}
			return !found;
		},
		pushEvent(event) {
			if (this.isNewElement(event, this.events)) {
				this.events[event._id] = event;
			}
		},
		checkforItemColor(event) {
			let itemColor = undefined;
			event.relationships["scope-ids"].forEach((id) => {
				this.usersCourses.forEach((course) => {
					if (id === course._id && course.color != undefined) {
						itemColor = course.color;
					}
				});
				this.usersTeams.forEach((team) => {
					if (id === team._id && team.color != undefined) {
						itemColor = team.color;
					}
				});
			});
			return itemColor;
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
						this.pushScope(element, this.usersCourses);
					});
				});
			} catch (error) {
				console.error(error);
			}
		},
		async postCalendarData(startDate, endDate) {
			const event = {
				startDate: startDate,
				courseId: this.courseScopeId,
				teamId: this.teamScopeId,
				endDate: endDate,
				summary: this.inputText,
			};
			if (this.courseScopeId) {
				event.scopeID = this.courseScopeId;
				console.log("Course ID found");
			} else if (this.teamScopeId) {
				event.scopeID = this.teamScopeId;
				console.log("Team ID found");
			} else {
				const { user } = this.$store.state.auth;
				event.scopeID = user.id;
			}
			// currently the scope id is set explicit as well
			if (this.courseScopeId)
				await this.$store.dispatch("calendar/create", event);
			const calApi = this.$refs.fullCalendar.getApi();
			calApi.refetchEvents();
		},
		async deleteDate() {
			this.$store.dispatch("calendar/removeDate", {
				id: this.currentEventId,
			});
		},
	},
	head() {
		return {
			title: "Kalender",
		};
	},
};
</script>
