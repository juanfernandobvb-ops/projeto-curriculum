<template>
  <div class="form-container">
    <div class="form-header">
      <h2>Adicionar Informações com IA</h2>
      <p>Cole informações sobre você e a IA vai estruturar automaticamente</p>
    </div>

    <!-- Configuração da Chave API -->
    <div v-if="!apiConfigured" class="api-setup">
      <div class="setup-content">
        <h3>⚙️ Configure sua Chave de API OpenAI</h3>
        <p>Você precisa de uma chave de API válida para usar este recurso.</p>
        <div class="setup-input">
          <input 
            v-model="tempApiKey"
            type="password"
            placeholder="Sua chave de API do OpenAI (sk-...)"
            class="api-input"
          >
          <button @click="configureApiKey" class="btn-setup">
            Configurar Chave
          </button>
        </div>
        <p class="setup-help">
          <strong>Como obter sua chave:</strong><br>
          1. Acesse <a href="https://platform.openai.com/api-keys" target="_blank">platform.openai.com/api-keys</a><br>
          2. Crie uma nova chave<br>
          3. Cole aqui (será armazenada localmente no seu navegador)
        </p>
      </div>
    </div>

    <!-- Formulário de Input -->
    <div v-else class="form-content">
      <div class="input-section">
        <label>Descreva suas informações:</label>
        <textarea 
          v-model="inputText"
          placeholder="Ex: Trabalhei como desenvolvedor frontend na TechCorp de Jan 2021 a Dez 2022, desenvolvendo aplicações com Vue.js..."
          class="textarea-input"
          :disabled="loading"
        ></textarea>
        
        <div class="form-actions">
          <button 
            @click="processInput"
            :disabled="!inputText.trim() || loading"
            class="btn-process"
          >
            <span v-if="!loading">✨ Processar com IA</span>
            <span v-else>Processando...</span>
          </button>
          <button 
            @click="resetApiKey"
            class="btn-reset"
          >
            Trocar Chave
          </button>
        </div>
      </div>

      <!-- Erro -->
      <div v-if="error" class="error-message">
        <strong>Erro:</strong> {{ error }}
      </div>

      <!-- Sucesso -->
      <div v-if="success" class="success-message">
        <strong>✓ Sucesso!</strong> Informação adicionada ao currículo
      </div>

      <!-- Preview dos dados processados -->
      <div v-if="processedData" class="preview-section">
        <h3>Preview dos dados:</h3>
        <div class="data-preview">
          <div v-if="processedData.type === 'experience'" class="preview-item">
            <strong>{{ processedData.data.position }}</strong> @ {{ processedData.data.company }}
            <small>{{ processedData.data.startDate }} - {{ processedData.data.endDate }}</small>
            <p>{{ processedData.data.description }}</p>
          </div>
          
          <div v-else-if="processedData.type === 'education'" class="preview-item">
            <strong>{{ processedData.data.degree }}</strong>
            <small>{{ processedData.data.institution }} ({{ processedData.data.graduationYear }})</small>
          </div>

          <div v-else-if="processedData.type === 'skills'" class="preview-item">
            <div class="skills-preview">
              <span v-for="(skill, index) in processedData.data" :key="index" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>

          <div v-else-if="processedData.type === 'personal'" class="preview-item">
            <strong>{{ processedData.data.name }}</strong> - {{ processedData.data.title }}
            <p>{{ processedData.data.summary }}</p>
          </div>

          <button @click="addToResume" class="btn-add">
            ✓ Adicionar ao Currículo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { processInput as aiProcessInput, setApiKey, getApiKey, isApiKeyConfigured } from '../services/openai.js'

export default {
  name: 'FormInput',
  props: {
    curriculum: {
      type: Object,
      required: true
    }
  },
  emits: ['update:curriculum'],
  data() {
    return {
      inputText: '',
      tempApiKey: '',
      apiConfigured: false,
      loading: false,
      error: '',
      success: false,
      processedData: null
    }
  },
  mounted() {
    this.apiConfigured = isApiKeyConfigured()
  },
  methods: {
    configureApiKey() {
      if (!this.tempApiKey.trim()) {
        this.error = 'Digite uma chave de API válida'
        return
      }
      setApiKey(this.tempApiKey)
      this.apiConfigured = true
      this.error = ''
    },
    resetApiKey() {
      setApiKey('')
      this.apiConfigured = false
      this.tempApiKey = ''
      this.processedData = null
    },
    async processInput() {
      if (!this.inputText.trim()) return

      this.loading = true
      this.error = ''
      this.success = false
      this.processedData = null

      try {
        const result = await aiProcessInput(this.inputText)
        
        if (result.type === 'error') {
          this.error = result.message
        } else {
          this.processedData = result
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    addToResume() {
      if (!this.processedData) return

      const updatedCurriculum = { ...this.curriculum }

      try {
        switch (this.processedData.type) {
          case 'experience':
            updatedCurriculum.experience = [
              ...updatedCurriculum.experience,
              this.processedData.data
            ]
            break
          case 'education':
            updatedCurriculum.education = [
              ...updatedCurriculum.education,
              this.processedData.data
            ]
            break
          case 'skills':
            updatedCurriculum.skills = [
              ...updatedCurriculum.skills,
              ...this.processedData.data
            ]
            break
          case 'personal':
            updatedCurriculum = {
              ...updatedCurriculum,
              ...this.processedData.data
            }
            break
        }

        this.$emit('update:curriculum', updatedCurriculum)
        
        this.success = true
        this.inputText = ''
        this.processedData = null
        
        setTimeout(() => {
          this.success = false
        }, 3000)
      } catch (err) {
        this.error = 'Erro ao adicionar ao currículo: ' + err.message
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  background: white;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.form-header {
  margin-bottom: 25px;
}

.form-header h2 {
  font-size: 1.5rem;
  color: #1e3a8a;
  margin: 0 0 8px 0;
  font-weight: 700;
}

.form-header p {
  color: #6b7280;
  margin: 0;
  font-size: 0.95rem;
}

/* API Setup */
.api-setup {
  background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
  border: 2px solid #bfdbfe;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;
}

.setup-content h3 {
  color: #1e40af;
  margin-top: 0;
  font-size: 1.1rem;
}

.setup-content p {
  color: #1e40af;
  margin: 10px 0;
}

.setup-input {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.api-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: monospace;
}

.api-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-setup {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-setup:hover {
  background: #2563eb;
}

.setup-help {
  background: white;
  padding: 15px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #374151;
  margin-top: 15px;
}

.setup-help a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
}

/* Form Content */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-section label {
  display: block;
  color: #1e3a8a;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.textarea-input {
  width: 100%;
  min-height: 140px;
  padding: 15px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #1e293b;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.textarea-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.textarea-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  gap: 10px;
}

.btn-process,
.btn-reset {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.btn-process {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  flex: 1;
}

.btn-process:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.btn-process:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-reset {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-reset:hover {
  background: #e5e7eb;
}

/* Messages */
.error-message,
.success-message {
  padding: 15px;
  border-radius: 8px;
  font-size: 0.95rem;
}

.error-message {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.success-message {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

/* Preview */
.preview-section {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
}

.preview-section h3 {
  color: #1e3a8a;
  margin-top: 0;
  font-size: 1.05rem;
}

.data-preview {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 15px;
}

.preview-item {
  margin-bottom: 15px;
}

.preview-item strong {
  display: block;
  color: #1e293b;
  margin-bottom: 5px;
}

.preview-item small {
  display: block;
  color: #6b7280;
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.preview-item p {
  color: #4b5563;
  margin: 0;
  line-height: 1.6;
}

.skills-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: #dbeafe;
  color: #1e40af;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 0.9rem;
  border: 1px solid #bfdbfe;
}

.btn-add {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 15px;
  transition: all 0.3s ease;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}
</style>
