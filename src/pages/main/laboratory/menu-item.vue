<template>
    <div class="menu-item" :command="command">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    reactive,
    toRefs,
    defineProps,
    onBeforeMount,
    onMounted,
    watchEffect,
    computed
} from 'vue'
const porps = defineProps({
    command: {
        type: String
    }
})
const data = reactive({})
onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
</script>
<style scoped lang="scss"></style>
