<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="clickTab"
  >
    <el-tab-pane
      v-for="(item, index) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      // editableTabsValue: this.$store.state.menus.editableTabsValue,
      // editableTabs: this.$store.state.menus.editableTabs,
    }
  },

  computed: {
    editableTabs: {
      get() {
        return this.$store.state.menus.editableTabs
      },
      set(val) {
        this.$store.state.menus.editableTabs = val
      }
    },
    editableTabsValue: {
      get() {
        return this.$store.state.menus.editableTabsValue
      },
      set(val) {
        this.$store.state.menus.editableTabsValue = val
      }
    }
  },
  methods: {

    //删除之后也要进行动态路由
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;

      if (targetName === "Index") {
        return
      }

      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);

      this.$router.push({ name: activeName })  //删除之后进行路由
    },

    clickTab(target) {
      //点击不同的标签进行不同的切换  可以通过name(定义路由中的name)的方式或者路由的方式
      this.$router.push({ name: target.name })
    }
  }
}
</script>