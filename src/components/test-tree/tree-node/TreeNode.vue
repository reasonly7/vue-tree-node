<script
  lang="ts"
  setup
  generic="T extends { children?: T[], collapse?: boolean }"
>
import { computed, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    level?: number;
    offset?: number;
    node: T;
  }>(),
  {
    level: 0,
    offset: 1.25,
  },
);

const offsetStyle = computed(() => {
  const { level, offset } = props;
  return level <= 0 ? {} : { paddingLeft: `${level * offset}rem` };
});
const slots = useSlots();
const SlotComponent = computed(() => slots?.default);
</script>

<template>
  <div
    class="flex items-center align-center"
    :style="offsetStyle"
    v-bind="$attrs"
  >
    <slot
      :node="node"
      :level="level"
      :offset="offset"
      :hasChildren="!!node.children?.length"
    ></slot>
  </div>

  <template v-if="!node.collapse">
    <TreeNode
      v-for="node in node.children"
      :node="node"
      :level="level + 1"
      v-bind="$attrs"
    >
      <template #="{ node, level, offset, hasChildren }">
        <SlotComponent
          :node="node"
          :level="level"
          :offset="offset"
          :hasChildren="hasChildren"
        ></SlotComponent>
      </template>
    </TreeNode>
  </template>
</template>
