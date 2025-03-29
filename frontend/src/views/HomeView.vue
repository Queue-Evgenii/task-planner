<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();

const tabs = [
  {
    path: "profile",
    name: "Profile",
    icon: "person"
  },
  {
    path: "tasks",
    name: "Tasks",
    icon: "view_kanban"
  },
]
const activeTab = tabs.find(tab => tab.path === route.name);
</script>

<template>
  <div v-if="activeTab !== undefined" class="home">
    <h1 class="home__title _title">{{ activeTab.name }}</h1>
      <div class="home__content">
        <RouterView />
      </div>
      <ul class="tabs _flex _ai-c">
        <li v-for="(tab, index) in tabs" :key="index"
          :class="[
            'tabs__item _flex-1-1-full',
            route.name === tab.path ? '_active' : ''
          ]">
          <RouterLink
            :to="{ name: tab.path }"
            class="_flex _ai-c _jc-c _gap-x-8"
          >
            <span>
              {{ tab.name}}
            </span>
            <i class="material-icons">{{ tab.icon }}</i>
          </RouterLink>
        </li>
      </ul>
  </div>
  <div v-else>
    Something went wrong
  </div>
</template>

<style lang="scss">
.home {
  &__title {
  padding: 24px 0;
    font-size: 1.5rem;
  }
}
.tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  &__item {
    padding: 16px 24px;
    color: var(--color-heading);
    font-size: 1.25rem;
    background-color: var(--color-background-mute);
    transition: background-color 0.3s ease;
    &._active {
      background-color: var(--vt-c-text-light-1);
    }
    &:hover, &:focus {
      background-color: var(--color-background-soft);
    }
  }
}
</style>
