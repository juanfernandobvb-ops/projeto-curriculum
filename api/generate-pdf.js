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

    // Inicia o navegador
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    })

    const page = await browser.newPage()

    // Define o conteúdo HTML
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    })

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

    // Retorna o PDF
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'curriculo.pdf'}"`)
    res.send(pdf)

  } catch (error) {
    console.error('Error generating PDF:', error)
    
    if (browser) {
      await browser.close()
    }

    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error.message 
    })
  }
}
