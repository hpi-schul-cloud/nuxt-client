<template>
    <div>
        <navigation-bar :img="require('@assets/img/logo/logo-image-color.svg')" />
        <div class="container">
            <Nuxt />
        </div>
    </div>
</template>

<script>
    import NavigationBar from "@components/legacy/NavigationBar";

    export default {
        components: {
            NavigationBar,
        },
    };
</script>

<style lang="scss" scoped>
    @import "@styles";

    .container {
        width: 100%;
        padding: var(--space-xl-3);
    }

</style>
