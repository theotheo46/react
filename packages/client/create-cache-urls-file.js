import * as path from 'path'
import fs from 'fs'

function readFilesRecursive(directory) {
  let files = []
  if (fs.existsSync(path)) {
    const entries = fs.readdirSync(directory, { withFileTypes: true })

    entries.forEach(entry => {
      const fullPath = path.join(directory, entry.name)

      if (entry.isDirectory()) {
        files = files.concat(readFilesRecursive(fullPath))
      } else {
        files.push(fullPath)
      }
    })
  }
  return files
}

const files = readFilesRecursive('dist')
const publicUrls = ['index.html', 'wave.png', 'minilending.svg', 'home.svg']
const assetsUrls = files.concat(publicUrls).map(file => `'${file}'`)
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
