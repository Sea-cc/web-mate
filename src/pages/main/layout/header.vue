<template>
    <div class="layout-header">
        <div>aaaa</div>
        <layTheme />
    </div>
</template>
<script lang="ts" setup>
import layTheme from './theme.vue'
import { reactive, ref, defineProps, defineEmits, getCurrentInstance, onMounted } from 'vue'
</script>
<style lang="scss" scoped>
.layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 60px;
}
</style>
