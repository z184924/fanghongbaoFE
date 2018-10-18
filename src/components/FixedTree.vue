<template>
  <div>
    <el-tree
      v-if="multiSelect"
      ref="tree"
      :default-expand-all="expandAll"
      :expand-on-click-node="false"
      :node-key="fieldId"
      :data="tree"
      @check-change="handleCheckChange"
      :props="treeProps"
      show-checkbox
      :render-content="renderContent"
    >
      <span
        class="custom-tree-node"
        slot-scope="{ node, data }"
        :title="node.label"
      >{{ node.label }}</span>
    </el-tree>
    <el-tree
      v-else
      ref="tree"
      :default-expand-all="expandAll"
      :expand-on-click-node="false"
      highlight-current
      :node-key="fieldId"
      :data="tree"
      @node-click="nodeClick"
      :props="treeProps"
      :show-checkbox="multiSelect"
      :render-content="renderContent"
    >
      <span
        class="custom-tree-node"
        slot-scope="{ node, data }"
        :title="node.label"
      >{{ node.label }}</span>
    </el-tree>
    <!-- {{value}} -->
  </div>
</template>
<script>
/*
v-model：当前选择的节点
*/
export default {
  props: {
    value: {},
    // 是否多选
    multiSelect: {
      type: Boolean,
      default: false
    },

    //是否需要全部展开

    expandAll: {
      type: Boolean,
      default: true
    },

    // 各类field对应的字段
    fieldId: {
      type: String,
      default: "id"
    },
    fieldPid: {
      type: String,
      default: "pid"
    },
    fieldName: {
      type: String,
      default: "name"
    },
    fieldLevel: {
      type: String,
      default: "level"
    },
    fieldLevelCode: {
      type: String,
      default: "levelCode"
    },
    renderContent: {
      type: Function,
      default: (h, { node, data, store }) => {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      }
    },

    // 根节点id对应的数据
    topId: {
      default: 0
    },
    list: {
      default() {
        return [];
      }
    },

    // 默认选择的节点（用fieldId组成的数组），改变后将引起重选，并冲掉用户已选的其他节点
    checkedKeys: {
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      activeNode: {}
    };
  },
  computed: {
    treeProps() {
      return {
        label: this.fieldName
      };
    },
    tree() {
      return this.getChildrenMenu(this.topId, null);
    }
  },
  watch: {
    value() {
      if (this.value != null && !this.multiSelect) {
        this.$refs.tree.setCurrentKey(this.value[this.fieldId]);
        this.activeNode = this.$refs.tree.getCurrentNode();
        this.$emit("input", this.activeNode);
      }
    },
    checkedKeys: {
      handler() {
        this.$refs.tree.setCheckedKeys(this.checkedKeys);
        this.$nextTick(() => {
          setTimeout(e => {
            this.$emit("input", this.$refs.tree.getCheckedNodes());
          }, 500);
        });
      },
      deep: true
    }
  },
  methods: {
    // tree

    getChildrenMenu(id, parent) {
      // console.log(this.list)
      let menu = [];
      this.list.forEach((item, i) => {
        if (item[this.fieldPid] === id) {
          let newItem = {};
          let p = {};
          $.extend(newItem, item);
          $.extend(p, parent);
          newItem.parent = p;
          newItem.children = this.getChildrenMenu(
            newItem[this.fieldId],
            newItem
          );
          menu.push(newItem);
        }
      });
      return menu;
    },
    nodeClick(item) {
      this.activeNode = item;
      this.$emit("input", this.activeNode);
      this.$emit("node-click", this.activeNode);
    },
    handleCheckChange(a) {
      this.$emit("input", this.$refs.tree.getCheckedNodes());
      // console.log(this.$refs.tree.getCheckedNodes());
    }
  },
  created() {
    // this.getDataTree();
  }
};
</script>

