<template>
  <div id="home">
    <NavigationDialog
      v-if="$vuetify.breakpoint.name === 'xs'"
      :items1="items1"
      :items2="items2"
      :drawer="drawer"
      @drawerClicked="drawer = !drawer"
    />
    <NavigationDrawer
      v-else
      :items1="items1"
      :items2="items2"
      :drawer="drawer"
      @drawerClicked="drawer = !drawer"
    />
    <section :class="!drawer ? 'drawer-open' : ''">
      <Header :drawer="drawer" @drawerClicked="drawer = !drawer" />
      <Content />
    </section>
  </div>
</template>

<script>
import Content from "@/components/Content";
import Header from "@/components/Header";
import NavigationDrawer from "@/components/NavigationDrawer";
import NavigationDialog from "@/components/NavigationDialog";
export default {
  name: "Home",
  components: { Content, Header, NavigationDrawer, NavigationDialog },
  data() {
    return {
      drawer: false,
      items1: [
        { text: "Employee", icon: "mdi-clock" },
        { text: "Calendar", icon: "mdi-account" },
      ],
      items2: [
        { text: "Subcontractor", icon: "mdi-clock" },
        { text: "Supplier", icon: "mdi-account" },
        { text: "Users", icon: "mdi-flag" },
        { text: "File Upload", icon: "mdi-clock" },
        { text: "Widgets", icon: "mdi-account" },
        { text: "Calendar", icon: "mdi-flag" },
        { text: "Charts", icon: "mdi-clock" },
        { text: "Maps", icon: "mdi-account" },
        { text: "Miscellaneous", icon: "mdi-account" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#home {
  display: flex;
  height: 100%;
  background-color: #e7e7ef;

  section {
    width: -webkit-fill-available;
    margin-left: 80px;
    height: 100%;
    transition: all 3 ease !important;
  }

  .drawer-open {
    margin-left: 260px;
  }
}

@media screen and (max-width: 500px) {
  #home {
    section {
      margin-left: 0px;
    }
    .drawer-open {
      margin-left: 0px;
    }
  }
}
</style>
