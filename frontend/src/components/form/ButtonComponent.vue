<template>
  <button type="button"><slot></slot></button>
</template>

<style scoped>
button {
  outline: none;
  border: 1px solid var(--color-border);
  font-size: 0.875rem;
  border-radius: 0.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: var(--color-button);
  color: var(--color-text);
  font-weight: 500;
  width: 100%;
  text-transform: uppercase;
}
</style>
