<script lang="ts" setup>
import codiconSvg from "@vscode/codicons/dist/codicon.svg";
import { computed } from "vue";

const props = defineProps<{
  icon: string;
}>();

const href = computed(() => `${codiconSvg}#${props.icon}`);
</script>

<template>
  <svg
    width="1em"
    height="1em"
  >
    <use :xlink:href="href"></use>
  </svg>
</template>
