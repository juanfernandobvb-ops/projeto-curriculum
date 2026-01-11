<template>
  <div class="main-container">
    <!-- Modo Formulário - Preencher dados -->
    <!-- AWS EC2 Backend Integration -->
    <div v-if="currentView === 'form'" class="form-view">
      <FormBuilder @generate="handleFormGenerate" />
    </div>

    <!-- Modo Preview - Mostra cards -->
    <div v-else-if="currentView === 'templates'" class="cards-view">
      <div class="view-header">
        <button class="back-to-form" @click="currentView = 'form'">← Voltar ao Formulário</button>
        <h1>Escolha seu Modelo</h1>
        <p>Selecione um template profissional para download</p>
      </div>

      <div class="cards-grid">
        <div 
          v-for="template in templates" 
          :key="template.id"
          class="template-card"
          @click="expandedTemplate = template.id; currentView = 'expanded'"
        >
          <div class="card-preview">
            <component :is="getTemplateComponent(template.id)" :curriculum="curriculum" />
          </div>
          <div class="card-info">
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>
            <button class="view-btn">Ver em Tela Cheia →</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modo Expandido - Mostra template completo -->
    <div v-else-if="currentView === 'expanded'" class="expanded-view">
      <div class="expanded-header">
        <button class="back-btn" @click="currentView = 'templates'">← Voltar</button>
        <h2>{{ getTemplateName() }}</h2>
        <div class="header-actions">
          <button 
            @click="exportToPDF" 
            class="btn-print-primary" 
            :disabled="isGeneratingPDF"
            title="Baixar PDF automático"
          >
            <span v-if="isGeneratingPDF">⏳ Gerando PDF...</span>
            <span v-else>📥 Baixar PDF</span>
          </button>
          <button @click="printPreview" class="btn-export-secondary" title="Salvar via impressão">
            🖨️ Imprimir
          </button>
        </div>
      </div>
      
      <div class="expanded-content">
        <div ref="pdfContent" class="pdf-container">
          <TemplateModern v-if="expandedTemplate === 'modern'" :curriculum="curriculum" />
          <TemplateClassic v-else-if="expandedTemplate === 'classic'" :curriculum="curriculum" />
          <TemplateMinimal v-else-if="expandedTemplate === 'minimal'" :curriculum="curriculum" />
          <TemplateCreative v-else-if="expandedTemplate === 'creative'" :curriculum="curriculum" />
          <TemplateTech v-else-if="expandedTemplate === 'tech'" :curriculum="curriculum" />
          <TemplateDeveloper v-else-if="expandedTemplate === 'developer'" :curriculum="curriculum" />
          <TemplateDevOps v-else-if="expandedTemplate === 'devops'" :curriculum="curriculum" />
          <TemplateStartup v-else-if="expandedTemplate === 'startup'" :curriculum="curriculum" />
          <TemplateTechMinimal v-else-if="expandedTemplate === 'techminimal'" :curriculum="curriculum" />
        </div>
      </div>

      <button class="floating-back-btn" @click="currentView = 'templates'">← Voltar aos Templates</button>
    </div>
  </div>
</template>

<script>
import FormBuilder from '../components/FormBuilder.vue'
import TemplateModern from '../components/TemplateModern.vue'
import TemplateClassic from '../components/TemplateClassic.vue'
import TemplateMinimal from '../components/TemplateMinimal.vue'
import TemplateCreative from '../components/TemplateCreative.vue'
import TemplateTech from '../components/TemplateTech.vue'
import TemplateDeveloper from '../components/TemplateDeveloper.vue'
import TemplateDevOps from '../components/TemplateDevOps.vue'
import TemplateStartup from '../components/TemplateStartup.vue'
import TemplateTechMinimal from '../components/TemplateTechMinimal.vue'
import { sampleCurriculum } from '../utils/sampleCurriculum.js'

export default {
  name: 'MainVue',
  components: {
    FormBuilder,
    TemplateModern,
    TemplateClassic,
    TemplateMinimal,
    TemplateCreative,
    TemplateTech,
    TemplateDeveloper,
    TemplateDevOps,
    TemplateStartup,
    TemplateTechMinimal
  },
  data() {
    return {
      currentView: 'form',
      expandedTemplate: null,
      curriculum: JSON.parse(JSON.stringify(sampleCurriculum)),
      isGeneratingPDF: false,
      templates: [
        { 
          id: 'modern', 
          name: '✨ Moderno',
          description: 'Design limpo com sidebar profissional'
        },
        { 
          id: 'classic', 
          name: '📄 Clássico',
          description: 'Estilo tradicional com tipografia serif'
        },
        { 
          id: 'minimal', 
          name: '🎯 Minimalista',
          description: 'Design clean com sidebar e informações bem organizadas'
        },
        { 
          id: 'creative', 
          name: '🎨 Criativo',
          description: 'Layout moderno com foto em destaque'
        },
        { 
          id: 'tech', 
          name: '💻 Tech GitHub',
          description: 'Inspirado em GitHub, perfeito para desenvolvedores'
        },
        { 
          id: 'developer', 
          name: '🔧 Developer',
          description: 'Design moderno com gradiente púrpura para tech'
        },
        { 
          id: 'devops', 
          name: '⚙️ DevOps',
          description: 'Template corporativo com timeline elegante'
        },
        { 
          id: 'startup', 
          name: '🚀 Startup',
          description: 'Design inovador e moderno com cores vibrantes'
        },
        { 
          id: 'techminimal', 
          name: '⚡ Tech Minimal',
          description: 'Minimalista e direto para profissionais tech'
        }
      ]
    }
  },
  methods: {
    handleFormGenerate(formData) {
      this.curriculum = JSON.parse(JSON.stringify(formData))
      this.currentView = 'templates'
    },
    getTemplateName() {
      const template = this.templates.find(t => t.id === this.expandedTemplate)
      return template ? template.name : 'Desconhecido'
    },
    getTemplateComponent(templateId) {
      const components = {
        'modern': TemplateModern,
        'classic': TemplateClassic,
        'minimal': TemplateMinimal,
        'creative': TemplateCreative,
        'tech': TemplateTech,
        'developer': TemplateDeveloper,
        'devops': TemplateDevOps,
        'startup': TemplateStartup,
        'techminimal': TemplateTechMinimal
      }
      return components[templateId]
    },
    async exportToPDF() {
      const element = this.$refs.pdfContent
      const templateName = this.getTemplateName()
        .replace(/[✨📄🎯🎨💻🔧⚙️🚀⚡]/g, '')
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
      const curriculumName = this.curriculum.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
      const filename = `curriculo-${curriculumName}-${templateName}.pdf`
      
      this.isGeneratingPDF = true
      
      try {
        // Aguarda renderização
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Captura TODOS os estilos CSS (incluindo scoped do Vue)
        const styles = Array.from(document.styleSheets)
          .map(styleSheet => {
            try {
              return Array.from(styleSheet.cssRules)
                .map(rule => rule.cssText)
                .join('\n')
            } catch (e) {
              console.warn('Não foi possível acessar stylesheet:', e)
              return ''
            }
          })
          .join('\n')
        
        // Pega o primeiro filho (o template em si, sem o wrapper .pdf-container)
        // Fallback para innerHTML se não houver firstElementChild
        const templateElement = element.firstElementChild
        const htmlToSend = templateElement ? templateElement.outerHTML : element.innerHTML
        
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                @page {
                  margin: 12mm 0 !important;
                  size: A4 portrait;
                }
                @page :first {
                  margin-top: 0 !important;
                }
                * {
                  box-sizing: border-box !important;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  -webkit-margin-before: 0 !important;
                  -webkit-margin-after: 0 !important;
                  -webkit-margin-start: 0 !important;
                  -webkit-margin-end: 0 !important;
                }
                html, body {
                  margin: 0 !important;
                  padding: 0 !important;
                  background: white !important;
                  width: 100% !important;
                  overflow-x: hidden !important;
                }
                body > * {
                  width: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }
                ${styles}
              </style>
            </head>
            <body>
              ${htmlToSend}
            </body>
          </html>
        `
        
        // URL da API (localhost em dev, proxy HTTPS em produção)
        const apiUrl = import.meta.env.DEV 
          ? 'http://localhost:3001/api/generate-pdf'
          : '/api/proxy'
        
        // Chama a API (proxy chama EC2)
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            html: htmlContent,
            filename: filename
          })
        })
        
        if (!response.ok) {
          throw new Error('Falha ao gerar PDF')
        }
        
        // Baixa o PDF
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
      } catch (error) {
        console.error('Erro ao gerar PDF:', error)
        alert('Erro ao gerar PDF. Tente usar o botão Imprimir como alternativa.')
      } finally {
        this.isGeneratingPDF = false
      }
    },
    printPreview() {
      const element = this.$refs.pdfContent
      element.classList.add('print-mode')
      
      setTimeout(() => {
        window.print()
        setTimeout(() => {
          element.classList.remove('print-mode')
        }, 500)
      }, 100)
    }
  }
}
</script>

<style scoped>
.main-container {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 40px 20px;
}

/* MODO FORMULÁRIO */
.form-view {
  max-width: 900px;
  margin: 0 auto;
}

/* MODO CARDS */
.cards-view {
  max-width: 1200px;
  margin: 0 auto;
}

.view-header {
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 50px;
}

.back-to-form {
  background: white;
  border: 1px solid #d0d0d0;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  color: #2c2c2c;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  display: inline-block;
}

.back-to-form:hover {
  background: #f5f5f5;
  border-color: #2c2c2c;
}

.view-header h1 {
  font-size: 2.8rem;
  margin: 0 0 12px 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.view-header p {
  font-size: 1.15rem;
  margin: 0;
  color: #666;
  font-weight: 500;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.template-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e0e0e0;
}

.template-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.card-preview {
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: #f5f5f5;
  border-bottom: 2px solid #e0e0e0;
}

.card-preview > * {
  transform: scale(0.4);
  transform-origin: top left;
  width: 250%;
  height: 250%;
}

.card-info {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-info h3 {
  font-size: 1.4rem;
  margin: 0 0 10px 0;
  color: #333;
  font-weight: bold;
}

.card-info p {
  color: #666;
  margin: 0 0 20px 0;
  font-size: 0.95rem;
  line-height: 1.5;
  flex: 1;
}

.view-btn {
  background: #2c2c2c;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background: #1a1a1a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* MODO EXPANDIDO */
.expanded-view {
  max-width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
}

.expanded-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: white;
  border-bottom: 2px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-btn {
  background: white;
  border: 1px solid #d0d0d0;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  color: #2c2c2c;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.back-btn:hover {
  background: #f5f5f5;
  border-color: #2c2c2c;
  color: #1a1a1a;
}

.expanded-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1a1a1a;
  flex: 1;
  text-align: center;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-print-primary {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.btn-print-primary:hover {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
}

.btn-export-secondary {
  background: white;
  border: 1px solid #d0d0d0;
  color: #666;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.btn-export-secondary:hover {
  border-color: #999;
  background: #f5f5f5;
  color: #333;
}

.expanded-content {
  flex: 1;
  overflow-y: auto;
  background: #f5f5f5;
  padding: 20px;
}

.pdf-container {
  max-width: 8.27in;
  min-width: 8.27in;
  width: 8.27in;
  background: white;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 0;
}

.expanded-content > .pdf-container > * {
  margin: 0;
}

.floating-back-btn {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #2c2c2c;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 100;
}

.floating-back-btn:hover {
  background: #1a1a1a;
  transform: translateX(-50%) translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Print Styles - OTIMIZADO PARA PDF PERFEITO */
@page {
  size: A4;
  margin: 15mm 12mm 15mm 12mm;
  /* Remove cabeçalhos e rodapés do navegador */
  @top-left { content: none; }
  @top-center { content: none; }
  @top-right { content: none; }
  @bottom-left { content: none; }
  @bottom-center { content: none; }
  @bottom-right { content: none; }
}

/* Adiciona margens extras para sobrescrever rodapé do navegador */
@page :first {
  margin-top: 0mm;
}

html {
  margin: 0;
  padding: 0;
}

@media print {
  /* Remove elementos da UI */
  .expanded-header,
  .floating-back-btn {
    display: none !important;
  }

  .expanded-view {
    height: auto;
  }

  .expanded-content {
    padding: 0;
    background: white;
    overflow: visible;
  }

  .pdf-container {
    max-width: 100%;
    box-shadow: none;
    
    /* ANTI-QUEBRA DE PALAVRAS - GLOBAL */
    word-break: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: none;
    -webkit-hyphens: none;
    -moz-hyphens: none;
  }

  /* REGRAS DE QUEBRA DE PÁGINA PERFEITAS */
  
  /* Evita quebra em itens pequenos */
  .exp-item,
  .edu-item,
  .contact-item {
    page-break-inside: avoid;
    break-inside: avoid;
    word-break: keep-all;
  }

  /* Títulos nunca sozinhos no final */
  h1, h2, h3, h4,
  .section-title,
  .sidebar-title,
  .exp-position,
  .edu-degree {
    page-break-after: avoid;
    break-after: avoid;
    orphans: 3;
    widows: 3;
    word-break: keep-all;
    hyphens: none;
  }

  /* Parágrafos e textos */
  p,
  .exp-description,
  .section-text {
    orphans: 3;
    widows: 3;
    page-break-inside: avoid;
    word-break: normal;
    hyphens: none;
    -webkit-hyphens: none;
  }

  /* Blocos da sidebar */
  .sidebar-block {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 12px;
  }

  /* Seções principais - permite quebra natural */
  .content-section {
    page-break-inside: auto;
    margin-bottom: 18px;
  }

  /* Headers de seções */
  .exp-header,
  .edu-header {
    page-break-inside: avoid;
    page-break-after: avoid;
  }

  /* Lista de experiências */
  .experience-list,
  .education-list {
    page-break-inside: auto;
  }

  /* Garante que o layout se mantém */
  .main-layout {
    display: flex;
  }

  /* Otimiza fontes para impressão */
  body {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}

/* Estilo para a dica de PDF */
.pdf-hint {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  text-align: center;
}

/* PDF Export Mode - Regras OTIMIZADAS de quebra de página */
.pdf-export-mode {
  box-shadow: none !important;
  background: white !important;
  
  /* ANTI-QUEBRA DE PALAVRAS - GLOBAL */
  word-break: normal !important;
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
  hyphens: none !important;
  -webkit-hyphens: none !important;
  -moz-hyphens: none !important;
}

/* ZONA DE SEGURANÇA - Padding e margens otimizadas */
.pdf-export-mode p,
.pdf-export-mode .exp-description,
.pdf-export-mode .section-text {
  line-height: 1.55 !important;
  margin-bottom: 8px !important;
  padding-bottom: 2px !important;
  word-break: normal !important;
  hyphens: none !important;
  orphans: 3;
  widows: 3;
}

/* BLOCOS QUE NUNCA DEVEM QUEBRAR */
.pdf-export-mode .exp-item,
.pdf-export-mode .edu-item {
  page-break-inside: avoid !important;
  break-inside: avoid !important;
  position: relative;
}

.pdf-export-mode .sidebar-block,
.pdf-export-mode .contact-item {
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}

/* Headers e títulos - nunca sozinhos no final */
.pdf-export-mode h1,
.pdf-export-mode h2,
.pdf-export-mode h3,
.pdf-export-mode .section-title,
.pdf-export-mode .sidebar-title,
.pdf-export-mode .exp-position,
.pdf-export-mode .edu-degree {
  page-break-after: avoid !important;
  break-after: avoid !important;
  page-break-inside: avoid !important;
  word-break: keep-all !important;
  hyphens: none !important;
  orphans: 3;
  widows: 3;
}

/* Headers de experiência/educação - manter com conteúdo */
.pdf-export-mode .exp-header,
.pdf-export-mode .edu-header {
  page-break-inside: avoid !important;
  page-break-after: avoid !important;
  break-inside: avoid !important;
  break-after: avoid !important;
}

/* Seções grandes - permite quebra controlada */
.pdf-export-mode .content-section {
  page-break-inside: auto;
  margin-bottom: 16px !important;
}

/* Listas - permite quebra entre itens */
.pdf-export-mode .experience-list,
.pdf-export-mode .education-list {
  page-break-inside: auto;
}

/* Força melhor renderização */
.pdf-export-mode * {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Espaçamento entre elementos críticos */
.pdf-export-mode .exp-item {
  margin-bottom: 18px !important;
  padding-bottom: 18px !important;
}

.pdf-export-mode .edu-item {
  margin-bottom: 14px !important;
  padding-bottom: 14px !important;
}

@media (max-width: 768px) {
  .main-container {
    padding: 20px 15px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .view-header h1 {
    font-size: 1.8rem;
  }

  .expanded-header {
    flex-direction: column;
    gap: 15px;
  }

  .expanded-header h2 {
    text-align: center;
  }

  .expanded-content {
    padding: 20px;
  }

  .header-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>
