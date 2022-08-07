<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="props.icon"></use>
    </svg>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
    icon: {
        type: String
    }
})
</script>
