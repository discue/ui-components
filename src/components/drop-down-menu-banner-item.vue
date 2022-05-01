<template>
    <li class="p-3 rounded-t-md border-b border-gray-400 cursor-default" @click.prevent>
        <div class="flex flex-col">
            <slot name="default"/>
        </div>
    </li>
</template>

<script setup/>