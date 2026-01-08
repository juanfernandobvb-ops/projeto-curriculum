<template>
  <div class="main-container">
    <!-- Modo Formulário - Preencher dados -->
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
          <button @click="exportToPDF" class="btn-export" title="Exportar como PDF">
            📥 Exportar PDF
          </button>
          <button @click="printPreview" class="btn-print" title="Imprimir">
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
import html2pdf from 'html2pdf.js'

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
    exportToPDF() {
      const element = this.$refs.pdfContent
      const templateName = this.getTemplateName().replace(/[✨📄🎯🎨]/g, '').trim()
      const curriculumName = this.curriculum.name.replace(/\s+/g, '-').toLowerCase()
      
      const options = {
        margin: [0, 0, 0, 0],
        filename: `curriculo-${curriculumName}-${templateName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      
      const clone = element.cloneNode(true)
      clone.style.boxShadow = 'none'
      clone.style.maxWidth = '100%'
      clone.style.margin = '0'
      clone.style.padding = '0'
      
      html2pdf().set(options).from(clone).save()
    },
    printPreview() {
      window.print()
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

.btn-export,
.btn-print {
  background: white;
  border: 1px solid #d0d0d0;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  color: #2c2c2c;
}

.btn-export:hover {
  border-color: #2c2c2c;
  background: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-print:hover {
  border-color: #2c2c2c;
  background: #f5f5f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.expanded-content {
  flex: 1;
  overflow-y: auto;
  background: white;
  padding: 20px;
}

.pdf-container {
  max-width: 8.5in;
  background: white;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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

/* Print Styles */
@media print {
  .expanded-header,
  .floating-back-btn {
    display: none;
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
    page-break-after: always;
  }
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
