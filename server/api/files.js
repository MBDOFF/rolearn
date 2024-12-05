import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const dataDir = path.resolve(process.cwd(), 'data') // Ensure you target the data folder
  const files = fs.readdirSync(dataDir)

  // Filter for .txt files only
  const txtFiles = files.filter(file => file.endsWith('.txt'))
  return txtFiles
})
