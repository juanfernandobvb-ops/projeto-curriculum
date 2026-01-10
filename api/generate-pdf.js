import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

export default async function handler(req, res) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let browser = null

  try {
    const { html, filename } = req.body

    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' })
    }

    console.log('🚀 Iniciando Puppeteer na Vercel...')

    // Configuração otimizada para Vercel serverless
    const options = {
      args: [
        ...chromium.args,
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--single-process',
        '--no-zygote'
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    }

    console.log('📦 Iniciando browser...')
    browser = await puppeteer.launch(options)

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
    console.error('❌ Erro detalhado:', error)
    
    if (browser) {
      await browser.close().catch(() => {})
    }

    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}
