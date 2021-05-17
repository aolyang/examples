const fs = require('fs')
const fsExtra = require('fs-extra')
const sharpe = require('sharp')
const path = require('path')

const from = 'radius'
const size = 128
const radius = 12
const distDir = path.resolve(__dirname, `./dist/${size}`)
const files = fs.readdirSync(`./${from}`)

if (!fs.existsSync(distDir)) fsExtra.ensureDirSync(distDir)

const rect = Buffer.from(
  `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`
)

files.forEach(name => {
  const filePath = path.resolve(distDir, name)
  if (!fs.existsSync(filePath)) {
    const dir = path.resolve(__dirname, `./${from}/${name}`)
    console.log(`【${name}】convert to ==>\n\t`, filePath)

    sharpe(dir).resize(size).composite([{ input: rect, blend: 'dest-in' }]).png().toBuffer().then(data => {
      fs.writeFileSync(filePath, data)
    })
  }
})
