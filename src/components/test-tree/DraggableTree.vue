<script lang="ts" setup>
import { TreeNode } from "./tree-node";
import { CodeIcon } from "@/components";
import type { NodeType, NodeId } from ".";

defineProps<{
  tree: NodeType;
  selectedId?: NodeId;
}>();

const emits = defineEmits<{
  expand: [id: NodeId];
  collapse: [id: NodeId];
  select: [id: NodeId];
}>();
</script>

<template>
  <div class="text-sm">
    <TreeNode :node="tree">
      <template #="{ node, hasChildren }">
        <!-- 有 children 时显示展开/收起按钮 -->
        <template v-if="hasChildren">
          <!-- 展开按钮 -->
          <button
            class="p-1 rounded-sm"
            v-if="node.collapse"
            @click="emits('expand', node.id)"
          >
            <CodeIcon icon="diff-added"></CodeIcon>
          </button>

          <!-- 收起按钮 -->
          <button
            v-else
            class="p-1 rounded-sm"
            @click="emits('collapse', node.id)"
          >
            <CodeIcon icon="diff-removed"></CodeIcon>
          </button>
        </template>

        <!-- 无 children 时展示指示按钮 -->
        <span
          v-else
          class="p-1"
        >
          <CodeIcon
            icon="file"
            class="text-slate-500"
          ></CodeIcon>
        </span>

        <button
          class="rounded-sm hover:bg-slate-200 px-1.5"
          :class="{ '!bg-black !text-white': selectedId === node.id }"
          @click="emits('select', node.id)"
        >
          {{ node.name }}
        </button>
      </template>
    </TreeNode>
  </div>
</template>
