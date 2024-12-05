<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="p-8 mx-4 bg-white shadow-lg rounded-lg w-full max-w-3xl">
            <!-- <h1 class="text-2xl font-bold mb-6 text-center">Word Learning Game</h1> -->

            <div v-if="paragraph" class="mb-4 text-lg">
                <p>{{ paragraph }}</p>
            </div>

            <!-- <div v-if="currentWord" class="mb-4 text-xl font-semibold">
                <p>{{ currentWord }}</p>
            </div> -->

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button v-for="(word, index) in options" :key="index" @click="checkAnswer(word)"
                    class="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900">
                    {{ word }}
                </button>
            </div>

            <div v-if="isFinished" class="mt-4 text-center">
                <p class="text-lg font-bold">Bravo, ai ajuns la sfarsit.</p>
                <button @click="resetGame"
                    class="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700">Restart</button>
            </div>

            <a href="/" class="block mt-8 text-center text-black hover:underline">Inapoi la lista de fisiere</a>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const fileId = route.params.fileId

const paragraph = ref('')
const currentWord = ref('')
const options = ref([])
const isFinished = ref(false)

let words = []
let currentIndex = 0

const loadText = async () => {
    try {
        const file = await fetch(`/api/files/${fileId}`)  // Adjusted to use the public folder
        if (!file.ok) throw new Error('Failed to fetch file')
        const text = await file.text()
        words = text.split(' ').filter(Boolean)
        currentIndex = 0
        paragraph.value = ''
        nextWord()  // Load first word
    } catch (error) {
        console.error('Error loading text file:', error)
    }
}

const nextWord = () => {
    if (currentIndex < words.length) {
        currentWord.value = words[currentIndex]
        options.value = generateOptions(currentWord.value)
    } else {
        isFinished.value = true
    }
}

const generateOptions = (current) => {
    const optionsList = [current]
    while (optionsList.length < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)]
        if (!optionsList.includes(randomWord)) optionsList.push(randomWord)
    }
    return shuffle(optionsList)
}

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // Ensure `j` is declared before use
        [array[i], array[j]] = [array[j], array[i]];  // Swap the elements
    }
    return array;
}


const checkAnswer = (word) => {
    if (word === currentWord.value) {
        paragraph.value += ` ${word}`
        currentIndex++

        // Check if we have reached the end of a sentence
        if (paragraph.value.endsWith('.')) {
            // Reset the paragraph after a sentence ends
            paragraph.value = ''
        }
        nextWord()
    } else {
        options.value = options.value.map(option =>
            option === word ? `${option} (incorrect)` : option
        )
    }
}

const resetGame = () => {
    isFinished.value = false
    loadText()
}

onMounted(() => {
    loadText()
})
</script>