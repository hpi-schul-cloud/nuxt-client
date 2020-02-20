<script>
import RenderHtml from "@components/helpers/RenderHtml";
import MintEcLinkContainer from "@components/molecules/MintEcLinkContainer";
import BaseGrid from "@components/base/BaseGrid";
import NavigationBar from "@components/legacy/NavigationBar";
import LegacyFooter from "@components/legacy/LegacyFooter";
import MintEcFooter from "@components/molecules/MintEcFooter";
export default {
	components: {
		MintEcLinkContainer,
		BaseGrid,
		NavigationBar,
		LegacyFooter,
		MintEcFooter,
	},
	...RenderHtml,
};
</script>
