// Proxy simples para chamar EC2 via HTTP (backend-to-backend)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { html, filename } = req.body

    // Chama o EC2 (HTTP é permitido em backend-to-backend)
    const response = await fetch('http://13.59.218.124:3001/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ html, filename })
    })

    if (!response.ok) {
      throw new Error('Erro no servidor EC2')
    }

    // Retorna o PDF
    const pdfBuffer = await response.arrayBuffer()
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'curriculo.pdf'}"`)
    res.send(Buffer.from(pdfBuffer))

  } catch (error) {
    console.error('Erro no proxy:', error)
    res.status(500).json({ error: 'Erro ao gerar PDF', details: error.message })
  }
}
