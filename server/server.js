import express from 'express'
import cors from 'cors'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.post('/api/generate-pdf', async (req, res) => {
  try {
    const { html, filename } = req.body

    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' })
    }

    console.log('🚀 Gerando PDF via Puppeteer...')

    // Salva HTML temporário
    const fs = await import('fs')
    const tempHtml = path.join(__dirname, 'temp.html')
    await fs.promises.writeFile(tempHtml, html)

    // Usa puppeteer via npx (instala automaticamente se necessário)
    const puppeteerScript = `
      const puppeteer = require('puppeteer');
      (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('file://${tempHtml.replace(/\\/g, '/')}', { waitUntil: 'networkidle0' });
        const pdf = await page.pdf({
          format: 'A4',
          printBackground: true,
          margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
        });
        await browser.close();
        process.stdout.write(pdf);
      })();
    `

    const tempScript = path.join(__dirname, 'generate.js')
    await fs.promises.writeFile(tempScript, puppeteerScript)

    // Executa o script
    const child = spawn('node', [tempScript], {
      cwd: path.join(__dirname, '../api')
    })

    const chunks = []
    child.stdout.on('data', (chunk) => chunks.push(chunk))
    
    child.on('close', async (code) => {
      // Limpa arquivos temporários
      await fs.promises.unlink(tempHtml).catch(() => {})
      await fs.promises.unlink(tempScript).catch(() => {})

      if (code === 0) {
        const pdf = Buffer.concat(chunks)
        console.log('✅ PDF gerado!')
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `attachment; filename="${filename || 'curriculo.pdf'}"`)
        res.send(pdf)
      } else {
        res.status(500).json({ error: 'Failed to generate PDF' })
      }
    })

    child.on('error', (err) => {
      console.error('❌ Erro:', err)
      res.status(500).json({ error: err.message })
    })

  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error)
    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error.message 
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor PDF rodando em http://localhost:${PORT}`)
  console.log(`📍 Endpoint: POST http://localhost:${PORT}/api/generate-pdf`)
})
