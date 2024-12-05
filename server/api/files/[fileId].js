import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const fileId = event.context.params.fileId // Get the fileId from the route parameter
  const filePath = path.resolve(process.cwd(), 'data', `${fileId}.txt`) // Define path to the file

  // Check if file exists
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8') // Read the content of the file
    return content
  } else {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }
})
