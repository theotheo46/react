import * as path from 'path'
import fs from 'fs'

function readFilesRecursive(directory) {
  let files = []

  const entries = fs.readdirSync(directory, { withFileTypes: true })

  entries.forEach(entry => {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files = files.concat(readFilesRecursive(fullPath))
    } else {
      files.push(fullPath)
    }
  })
  return files
}

const files = readFilesRecursive('src')
const publicUrls = ['index.html', 'wave.png', 'minilending.svg', 'home.svg']

const assetsUrls = files.concat(publicUrls).map(file => `'${file}'`)
console.log('assetsUrls', assetsUrls)

const fileContent = `export const assetsUrls = [\n  ${assetsUrls.join(
  ',\n  '
)}\n];`

fs.writeFile('assetsUrls.js', fileContent, err => {
  if (err) {
    console.error('Failed to write output file:', err)
    return
  }
  console.log(`Asset URLs generated and saved to assetsUrls.js`)
})
