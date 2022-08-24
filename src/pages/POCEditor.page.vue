<template>
	<div>
		<default-wireframe headline="POC - Editor TipTap" :full-width="false">
			<div>
				<h3>Math formula render</h3>
				<div>
					<span class="math-tex">\(x = {-b \pm \sqrt{b^2-4ac} \over 2a}\)</span>
				</div>
				<div>
					When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and
					they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$
				</div>
				<div>
					Type <code>MathJax.Hub.Typeset()</code> in console, and it transforms
					into images. But not in editor... TODO include matjax lib locally and
					remove tuhh.de from cors
				</div>
			</div>
			<div>
				<h2>Editor 1</h2>

				<text-editor
					v-model="staticContent"
					class="mb--md mt--xl-3"
					placeholder-text="Extending tip-tap POC"
					:advanced-features="true"
				/>
				<div style="border: solid 1px green">
					<h3>Render Editor 1</h3>
					<text-editor
						v-model="staticContent"
						class="mb--md mt--xl-3"
						:readonly="true"
						:advanced-features="true"
					/>
				</div>
			</div>
			<hr />
			<div>
				<h2>Editor 2</h2>
				<text-editor
					v-model="staticContent2"
					class="mb--md mt--xl-3"
					placeholder-text="Extending TipTap POC"
					:advanced-toolbar="false"
				/>

				<div style="border: solid 1px green">
					<h3>Render Editor 2</h3>
					<text-editor
						v-model="staticContent2"
						class="mb--md mt--xl-3"
						:readonly="true"
					/>
				</div>
			</div>
		</default-wireframe>
	</div>
</template>

<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import TextEditor from "@components/molecules/editor/TextEditor.vue";

export default {
	components: {
		DefaultWireframe,
		TextEditor,
	},
	layout: "defaultVuetify",
	data() {
		return {
			staticContent2: "",
			staticContent: `
	<iframe src="https://www.google.com" style="width: 300px; height: 100px">This iframe should be converted into safe text</iframe>
	<h2>h2 and some special chars Ώ😎</h2>
	<p> <strong>strong</strong>. paragraph</p>
	<h3>Die ideale Zeilenlänge für Websites (H3)</h3>
	<p><em>some em here</em></p>
	<p>Paragraph with <u>underline </u> and <s>strike trough</s>, a <sup>sup</sup>, a <sub>sub</sub> and also some <i>italic</i></p>
	<ol>
	   <li>
	      unordered list element.
	   </li>
	</ol>
	<ul>
	   <li>
	      ordered list element
	   </li>
	</ul>
	<blockquote>
	   Blockquotes get rendered, but has no special style, therefor looks like regular paragraph
	</blockquote>
	<p>This should be a <span style="color: red">red span</span></p>
	<p>Code: <code>var myElement = document.getElementById("intro");</code></p>
	<hr contenteditable="false">
	<p>Funky chars: $€¥©°ĒņŊ</p>
	<p>Math formula: <span class="math-tex">\(x = {-b \pm \sqrt{b^2-4ac} \over 2a}\)</span></p>
	<div class="tableWrapper">
	   <table style="min-width: 100px;">
	      <colgroup>
	         <col>
	         <col>
	      </colgroup>
	      <tbody>
	         <tr>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	         </tr>
	         <tr>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	         </tr>
	      </tbody>
	   </table>
	</div>
	<p>Some <a href="http://www.gogle.com">Link</a></p>
	<p>IMAGE:
		<figure class="image"><img src="/files/file?file=6304af4a90126d0f45e16c46&amp;name=1660118574955-katzen.jpg" alt="alt image attr"></figure>
	</p>
	<p>VIDEO:
		<video src="/files/file?file=6304af4a90126d0f45e16c6f&amp;name=1660126664605-video.mp4" controls="true" controlslist="nodownload"></video>
	</p>
	<p>AUDIO:</p>
	<p><audio src="http://192.168.1.136/musik.mp3" controls="true" controlslist="nodownload"></audio></p>`,
		};
	},
};
</script>
