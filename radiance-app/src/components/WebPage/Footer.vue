<template>
  <v-footer color="grey darken-4" dark class="pa-10">
    <v-sheet class="flex" color="transparent">
      <v-row justify="center" no-gutters class="px-12">
        <v-icon color="#F37154" large>mdi-lightning-bolt</v-icon>
        <h2 class="footer-title">Radiance</h2>
        <v-spacer />
        <h3 class="footer-item py-4">Powered by ArchTeam</h3>
      </v-row>
    </v-sheet>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>
<style>
h2.footer-title {
  font-size: 36px !important;
  font-family: "Noto Serif" !important;
  font-weight: 700 !important;
}
h3.footer-item {
  font-family: "Montserrat" !important;
  font-weight: 400 !important;
}
</style>
