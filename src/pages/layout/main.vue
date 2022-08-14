<template>
    <Transition mode="out-in" name="scale-slide">
        <router-view />
    </Transition>
</template>
<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, getCurrentInstance, onMounted } from 'vue'
</script>
<style lang="scss" scoped></style>
