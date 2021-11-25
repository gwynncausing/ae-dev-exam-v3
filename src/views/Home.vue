<template>
  <div id="home" :class="!drawer ? 'navigation-open' : ''">
    <NavigationDrawer
      :items1="items1"
      :items2="items2"
      :drawer="drawer"
      @drawerClicked="drawer = !drawer"
    />
    <section :class="!drawer ? 'drawer-open' : ''">
      <Header
        :drawer="drawer"
        @drawerClicked="drawer = !drawer"
        @searchChanged="search = $event"
        @addDialog="addDialog = !addDialog"
      />
      <Content
        :search="search"
        :add-dialog="addDialog"
        @addDialogClose="addDialog = false"
      />
    </section>
  </div>
</template>

<script>
import Content from "@/components/Content";
import Header from "@/components/Header";
import NavigationDrawer from "@/components/NavigationDrawer";
export default {
  name: "Home",
  components: { Content, Header, NavigationDrawer },
  data() {
    return {
      drawer: true,
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
      search: "",
      addDialog: false,
    };
  },

  watch: {
    drawer: {
      handler(newValue) {
        if (this.$vuetify.breakpoint.name !== "xs") return;

        if (!newValue) {
          document.body.style.overflow = "hidden";
          document.body.parentNode.style.overflow = "hidden";
          return;
        }
        document.body.style.overflow = "auto";
        document.body.parentNode.style.overflow = "auto";
      },
      immediate: true,
    },
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
    &.navigation-open {
      &::after {
        content: "";
        position: absolute;
        background-color: rgba($color: #000000, $alpha: 0.5);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
    section {
      margin-left: 0px;
    }
    .drawer-open {
      margin-left: 0px;
    }
  }
}
</style>
