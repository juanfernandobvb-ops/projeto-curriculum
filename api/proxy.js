// Proxy simples para chamar EC2 via HTTP (backend-to-backend)
import fetch from 'node-fetch'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('📨 Proxy recebeu requisição')
    
    const { html, filename } = req.body
    console.log('📄 Filename:', filename)

    // Chama o EC2 (HTTP é permitido em backend-to-backend)
    console.log('🚀 Chamando EC2...')
    const response = await fetch('http://13.59.218.124:3001/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ html, filename }),
      timeout: 60000 // 60 segundos
    })

    console.log('📡 EC2 respondeu:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erro do EC2:', errorText)
      throw new Error(`EC2 retornou status ${response.status}`)
    }

    // Retorna o PDF
    const pdfBuffer = await response.arrayBuffer()
    console.log('✅ PDF gerado, tamanho:', pdfBuffer.byteLength)
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'curriculo.pdf'}"`)
    res.send(Buffer.from(pdfBuffer))

  } catch (error) {
    console.error('❌ Erro no proxy:', error.message)
    console.error('Stack:', error.stack)
    res.status(500).json({ 
      error: 'Erro ao gerar PDF', 
      details: error.message,
      ec2: 'http://13.59.218.124:3001'
    })
  }
}
