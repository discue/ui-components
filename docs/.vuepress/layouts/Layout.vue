<script setup>
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <Footer :show-logo="false" />
    </template>
  </ParentLayout>
</template>