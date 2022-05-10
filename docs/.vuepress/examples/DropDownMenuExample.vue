<template>
  <DropDownMenu>
    <DropDownMenuBannerItem>
      <span class="text-sm font-medium">Signed in as</span>
      <span class="font-medium">Stefan</span>
    </DropDownMenuBannerItem>
    <DropDownMenuItem label="Settings">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-6 text-gray-500 group-hover:text-gray-900" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    </DropDownMenuItem>
    <DropDownMenuItem label="Subscription">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-6 text-gray-500 group-hover:text-gray-900" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    </DropDownMenuItem>
    <DropDownMenuItem label="Sign out" href="/signed-out">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-6 text-gray-500 group-hover:text-gray-900" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    </DropDownMenuItem>
  </DropDownMenu>
</template>

<script setup>
import { DropDownMenu, DropDownMenuBannerItem, DropDownMenuItem } from '@discue/ui-components'
</script>