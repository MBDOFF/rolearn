<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="grid gap-4">
      <h1 class="text-2xl font-bold mb-4 underline text-center">RoLearn</h1>
      <div v-if="files.length" class="space-y-4">
        <div v-for="file in files" :key="file" class="text-center pb-1">
          <NuxtLink
            :to="`/${file.replace('.txt', '')}`"
            class="border-2 border-solid border-indigo-700 px-4 py-2 rounded-lg text-indigo-700 hover:underline"
          >
            {{ file.replace('.txt', '') }}
          </NuxtLink>
        </div>
      </div>
      <p v-else class="text-center">Loading files...</p>
    </div>
  </div>
</template>

<script setup>
const { data: files, error } = await useFetch('/api/files')

if (error) {
  console.error('Error loading files:', error)
}
</script>
