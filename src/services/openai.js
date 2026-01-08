// Serviço de integração com OpenAI
// Configure sua chave de API em: src/config/apiKeys.js

let apiKey = '';

export const setApiKey = (key) => {
  apiKey = key;
};

export const getApiKey = () => {
  return apiKey;
};

export const isApiKeyConfigured = () => {
  return apiKey && apiKey.length > 0;
};

const systemPrompt = `Você é um assistente especializado em estruturar e melhorar currículos.
Quando o usuário fornecer informações sobre experiência, educação ou habilidades, 
você deve estruturá-las em JSON com a seguinte estrutura:

Para EXPERIÊNCIA:
{
  "type": "experience",
  "data": {
    "position": "título da posição",
    "company": "nome da empresa",
    "startDate": "Mês Ano",
    "endDate": "Mês Ano ou Atual",
    "description": "descrição das responsabilidades e conquistas"
  }
}

Para EDUCAÇÃO:
{
  "type": "education",
  "data": {
    "degree": "nome do curso/graduação",
    "institution": "nome da instituição",
    "graduationYear": "ano"
  }
}

Para HABILIDADES:
{
  "type": "skills",
  "data": ["skill1", "skill2", "skill3"]
}

Para INFORMAÇÕES PESSOAIS:
{
  "type": "personal",
  "data": {
    "name": "nome completo",
    "title": "título profissional",
    "email": "email",
    "phone": "telefone",
    "location": "localização",
    "summary": "resumo profissional"
  }
}

Responda APENAS com o JSON válido, sem explicações adicionais.
Se não conseguir estruturar as informações, retorne um erro JSON como:
{
  "type": "error",
  "message": "descrição do erro"
}`;

export const processInput = async (userInput) => {
  if (!apiKey) {
    throw new Error('Chave de API do OpenAI não configurada. Configure em Configurações.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userInput
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erro ao chamar API OpenAI');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch (e) {
      throw new Error('Resposta inválida da API. Tente novamente.');
    }
  } catch (error) {
    throw new Error(`Erro ao processar informações: ${error.message}`);
  }
};
