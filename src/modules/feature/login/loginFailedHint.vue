<template>
  <div class="login-failed-container">
    <h4>{{t("login.headline.loginFailedHint")}}</h4>
	<div class="steps">
		<li class="sub-header"> {{t("login.text.loginFailedFirstHint")}}</li>
		<p>{{ t("login.text.loginFailedFirstHintFirstText")}}</p>
		<div>
			<img class="browser" :src=chromeImg alt="Firefox" height="42" width="42">
			<img class="browser" :src=firefoxImg alt="Chrome" height="42" width="42">
			<img class="browser" :src=safariImg alt="Safari" height="42" width="42">
		</div>
		<p>{{ t("login.text.loginFailedFirstHintSecondText")}}</p>
	</div>
	<div class="steps">
		<li class="sub-header">{{t("login.text.loginFailedSecondHint")}}</li>
		<p>{{ t("login.text.loginFailedSecondHintText")}}</p>
		<div class="sub-step">
			<b>{{ t("login.text.loginFailedSecondHintFirstSubsection")}}</b>
			<div>
				<ul>
					<li>{{t("login.text.loginFailedSecondHintFirstSubsectionFirstText")}}</li>
					<li>{{t("login.text.loginFailedSecondHintFirstSubsectionSecondText")}}</li>
					<li>{{t("login.text.loginFailedSecondHintFirstSubsectionThirdText")}}</li>
					<li>{{t("login.text.loginFailedSecondHintFirstSubsectionFourthText")}}</li>
					<img class="screenshot" :src=loginFailImg alt="login.text.loginFailedScreenshot" width="600">
				</ul>
			</div>
		</div>
		<div class="sub-step">
			<b>{{ t("login.text.loginFailedSecondHintSecondSubsection")}}</b>
			<p>{{ t("login.text.loginFailedSecondHintSecondSubsectionText")}}</p>
			<div>
				<ul>
					<li>{{t("login.text.loginFailedSecondHintSecondSubsectionFirstText")}}</li>
					<li>{{t("login.text.loginFailedSecondHintSecondSubsectionSecondText")}}</li>
					<li>{{t("login.text.loginFailedSecondHintSecondSubsectionThirdText")}}</li>
					<li>{{t("login.text.loginFailedSecondHintSecondSubsectionFourthText")}}</li>
				</ul>
			</div>
		</div>
		<div class="sub-step">
			<b>{{ t("login.text.loginFailedSecondHintThirdSubsection")}}</b>
			<p>{{ t("login.text.loginFailedSecondHintThirdSubsectionText")}}</p>
		</div>
	</div>
	<div class="steps">
		<li class="sub-header">{{t("login.text.loginFailedThirdHint")}}</li>
		<p>{{t("login.text.loginFailedThirdHintFirstText")}}</p>
		<p><b>{{t("login.text.loginFailedThirdHintSecondText")}}</b></p>
		<p>{{t("login.text.loginFailedThirdHintThirdText")}}<a href="mailto:supportDBC">{{t("email.support.text.supportDBC")}}</a></p>
		<p>{{t("login.text.loginFailedThirdHintFourthText")}}<a href="mailto:supportNBC">{{t("email.support.text.supportNBC")}}</a></p>
		<p>{{t("login.text.loginFailedThirdHintFifthText")}}<a href="mailto:supportTHR">{{t("email.support.text.supportTHR")}}</a></p>
		<p>{{t("login.text.loginFailedThirdHintSixthText")}}<a href="mailto:supportBRB">{{t("email.support.text.supportBRB")}}</a></p>
	</div>
	<div class="steps">
		<li class="sub-header">{{t("login.text.loginFailedFourthHint")}}</li>
		<p>{{ t("login.text.loginFailedFourthHintText")}}</p>
		<div class="logo-container">
			<a href="https://dBildungscloud.de/"><img class="sc-logo" :src=dbcLogo alt="loginFailedLogodBildungscloud" target="_blank" width="200"></a>
			<a href="https://brandenburg.schul-cloud.org"><img class="sc-logo" :src=brbLogo alt="loginFailedLogoBrandenburg" target="_blank" width="200"></a>
			<a href="https://schulcloud-thueringen.de"><img class="sc-logo" :src=thrLogo alt="loginFailedLogoTühringen" target="_blank" width="200"></a>
			<a href="https://niedersachsen.cloud/"><img class="sc-logo" :src=n21Logo alt="loginFailedLogoNiedersachsen" target="_blank" width="200"></a>
		</div>
	</div>
	<div class="steps">
		<li class="sub-header">{{t("login.text.loginFailedFithHint")}}</li>
		<p>{{ t("login.text.loginFailedFithHintText")}}</p>
	</div>
	<div class="steps">
		<li class="sub-header">{{t("login.text.loginFailedSixthHint")}}</li>
		<a href="https://support.google.com/accounts/answer/32050?co=GENIE.Platform%3DDesktop&hl=de" target="_blank">{{t("help.text.hereYouCanFindOut") }}</a>
	</div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import chromeImg from "@/assets/images/chrome.png";
import firefoxImg from "@/assets/images/firefox.png";
import safariImg from "@/assets/images/safari.png";
import loginFailImg from "@/assets/images/login-fail.png";
import dbcLogo from "@/assets/images/logo/logo-dBildungscloud.svg";
import brbLogo from "@/assets/images/brb-logo.png";
import thrLogo from "@/assets/images/thr-logo.png";
import n21Logo from "@/assets/images/n21-logo.png";

const { t } = useI18n();
</script>

<style scoped>
.login-failed-container {
  padding: 1rem;
}
.steps {
  margin-bottom: 1rem;
}
.sub-header {
  font-weight: bold;
}
.browser {
  margin-right: 0.5rem;
}
.logo-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.sc-logo {
  height: auto;
}
</style>
