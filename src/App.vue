<script setup lang="ts">
import { DraggableTree, useTree } from "./components";

const tree = useTree();
</script>

<template>
  <div class="p-3">
    <DraggableTree
      :tree="tree.data"
      :selectedId="undefined"
      @expand="() => {}"
      @collapse="() => {}"
      @select="() => {}"
    ></DraggableTree>
  </div>
</template>
