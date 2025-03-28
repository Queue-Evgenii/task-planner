<template>
  <div class="loader"></div>
</template>

<style>
.loader {
  width: 100%;
  padding-bottom: 5px;
  font-weight: bold;
  font-family: monospace;
  font-size: 1.5rem;
  overflow: hidden;
  color: var(--color-heading-opacity);
  text-shadow: 0 0 0 var(--color-heading),10ch 0 0 var(--color-heading);
  background: linear-gradient(var(--color-heading) 0 0) bottom left/0% 3px no-repeat;
  animation: l14 3s infinite;
}
.loader:before {
  content: "Loading...";
}
@keyframes l14 {
    80%  {text-shadow:    0  0 0 var(--color-heading),10ch 0 0 var(--color-heading);background-size:100% 3px}
    100% {text-shadow: -10ch 0 0 var(--color-heading),0    0 0 var(--color-heading)}
}
</style>
