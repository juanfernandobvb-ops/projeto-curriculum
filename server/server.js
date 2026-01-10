import express from 'express'
import cors from 'cors'
import puppeteer from 'puppeteer'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'PDF Generator API is running' })
})

app.post('/api/generate-pdf', async (req, res) => {
  let browser = null
  
  try {
    const { html, filename } = req.body

    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' })
    }

    console.log('🚀 Iniciando Puppeteer...')
    
    // Inicia o navegador
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    })

    console.log('📄 Criando página...')
    const page = await browser.newPage()

    // Define o conteúdo HTML
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000
    })

    console.log('🖨️ Gerando PDF...')

    // Gera o PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    })

    await browser.close()

    console.log('✅ PDF gerado com sucesso!')

    // Retorna o PDF
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'curriculo.pdf'}"`)
    res.send(pdf)

  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error)
    
    if (browser) {
      await browser.close().catch(() => {})
    }

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
