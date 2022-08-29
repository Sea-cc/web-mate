<template>
    <div class="loading">
        <svg
            width="300px"
            height="200px"
            viewBox="0 0 187.3 93.7"
            preserveAspectRatio="xMidYMid meet"
        >
            <path
                id="infinity-outline"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
            />
            <path
                id="infinity-bg"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
            />
        </svg>
    </div>
</template>

<style lang="scss">
$len: 300px;
$time: 3000ms;

.loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    svg {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}

#infinity-outline {
    fill: transparent;
    stroke-width: 4;
    stroke: #582a6b;
    stroke-dasharray: $len * 0.01, $len;
    stroke-dashoffset: 0;
    animation: anim $time linear infinite;
}
#infinity-bg {
    fill: transparent;
    stroke-width: 4;
    stroke: #424242;
    opacity: 0.2;
}
@keyframes anim {
    12.5% {
        stroke-dasharray: $len * 0.14, $len;
        stroke-dashoffset: -$len * 0.11;
    }
    43.75% {
        stroke-dasharray: $len * 0.35, $len;
        stroke-dashoffset: -$len * 0.35;
    }
    100% {
        stroke-dasharray: $len * 0.01, $len;
        stroke-dashoffset: -$len * 0.99;
    }
}
</style>
