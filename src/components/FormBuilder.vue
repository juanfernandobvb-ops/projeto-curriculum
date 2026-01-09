<template>
  <div class="form-builder">
    <div class="form-container">
      <div class="form-header">
        <h2>Criar Meu Currículo</h2>
        <p>Preencha os campos abaixo para gerar seu currículo</p>
        <button v-if="hasSavedData" @click="clearSavedData" class="btn-clear-data" title="Limpar dados salvos">
          🗑️ Limpar Dados Salvos
        </button>
      </div>

      <!-- Indicador de Progresso -->
      <div class="steps-indicator">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="step-item"
          :class="{ 
            'active': currentStep === index + 1, 
            'completed': currentStep > index + 1 
          }"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-label">{{ step }}</div>
        </div>
      </div>

      <!-- STEP 1: DADOS PESSOAIS -->
      <section v-if="currentStep === 1" class="form-section">
        <h3 class="section-title">Informações Pessoais</h3>
        
        <div class="form-row">
          <div class="form-group">
            <label>Nome Completo *</label>
            <input v-model="formData.name" type="text" placeholder="Seu nome completo" class="input">
          </div>
          <div class="form-group">
            <label>Profissão/Título *</label>
            <input v-model="formData.title" type="text" placeholder="Sua profissão" class="input">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Email *</label>
            <input v-model="formData.email" type="email" placeholder="seu@email.com" class="input">
          </div>
          <div class="form-group">
            <label>Telefone</label>
            <input v-model="formData.phone" type="tel" placeholder="(00) 00000-0000" class="input">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Endereço</label>
            <input v-model="formData.location" type="text" placeholder="Cidade, Estado" class="input">
          </div>
          <div class="form-group">
            <label>CNH (Carteira Nacional de Habilitação)</label>
            <input v-model="formData.cnh" type="text" placeholder="Ex: Categoria B" class="input">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Idade</label>
            <input v-model="formData.age" type="number" placeholder="Sua idade" class="input">
          </div>
          <div class="form-group">
            <label>Sexo</label>
            <select v-model="formData.gender" class="input">
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
              <option value="Prefiro não informar">Prefiro não informar</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Resumo Profissional</label>
          <textarea v-model="formData.summary" placeholder="Descreva brevemente seu perfil profissional..." class="textarea" rows="4"></textarea>
        </div>

        <div class="form-group">
          <label>Foto de Perfil</label>
          <div class="photo-upload">
            <input 
              @change="handlePhotoUpload" 
              type="file" 
              accept="image/*"
              class="file-input"
              id="photo-input"
            >
            <label for="photo-input" class="file-label">
              <span v-if="!formData.photo" class="upload-text">📤 Clique para selecionar uma foto</span>
              <span v-else class="upload-text">✓ Foto selecionada</span>
            </label>
          </div>
          <div v-if="formData.photo" class="photo-preview">
            <img :src="formData.photo" :alt="formData.name" class="preview-img">
            <button @click="removePhoto" class="btn-remove-photo">Remover</button>
          </div>
        </div>
      </section>

      <!-- STEP 2: EXPERIÊNCIA PROFISSIONAL -->
      <section v-if="currentStep === 2" class="form-section">
        <div class="section-header">
          <h3 class="section-title">Experiência Profissional</h3>
          <button @click="addExperience" class="btn-add">+ Adicionar</button>
        </div>

        <div class="experience-list">
          <div v-for="(exp, index) in formData.experience" :key="index" class="form-item">
            <div class="item-header">
              <h4>Experiência {{ index + 1 }}</h4>
              <button @click="removeExperience(index)" class="btn-remove">×</button>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Cargo</label>
                <input v-model="exp.position" type="text" placeholder="Nome do cargo" class="input">
              </div>
              <div class="form-group">
                <label>Empresa</label>
                <input v-model="exp.company" type="text" placeholder="Nome da empresa" class="input">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Data de Início</label>
                <input v-model="exp.startDate" type="text" placeholder="Mês Ano" class="input">
              </div>
              <div class="form-group">
                <label>Data de Término</label>
                <input v-model="exp.endDate" type="text" placeholder="Mês Ano ou Atual" class="input">
              </div>
            </div>

            <div class="form-group">
              <label>Descrição</label>
              <textarea v-model="exp.description" placeholder="Descreva suas responsabilidades e realizações..." class="textarea" rows="3"></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- STEP 3: EDUCAÇÃO -->
      <section v-if="currentStep === 3" class="form-section">
        <div class="section-header">
          <h3 class="section-title">Formação Acadêmica</h3>
          <button @click="addEducation" class="btn-add">+ Adicionar</button>
        </div>

        <div class="education-list">
          <div v-for="(edu, index) in formData.education" :key="index" class="form-item">
            <div class="item-header">
              <h4>Educação {{ index + 1 }}</h4>
              <button @click="removeEducation(index)" class="btn-remove">×</button>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Grau/Curso</label>
                <input v-model="edu.degree" type="text" placeholder="Nome do curso" class="input">
              </div>
              <div class="form-group">
                <label>Instituição</label>
                <input v-model="edu.institution" type="text" placeholder="Nome da instituição" class="input">
              </div>
            </div>

            <div class="form-group">
              <label>Ano de Conclusão</label>
              <input v-model="edu.graduationYear" type="text" placeholder="Ano" class="input">
            </div>
          </div>
        </div>
      </section>

      <!-- STEP 4: HABILIDADES -->
      <section v-if="currentStep === 4" class="form-section">
        <h3 class="section-title">Habilidades</h3>
        
        <div class="skills-input">
          <input 
            v-model="newSkill" 
            @keydown.enter="addSkill"
            type="text" 
            placeholder="Digite uma habilidade e pressione Enter"
            class="input"
          >
          <button @click="addSkill" class="btn-add">Adicionar</button>
        </div>

        <div class="skills-tags">
          <span v-for="(skill, index) in formData.skills" :key="index" class="skill-tag">
            {{ skill }}
            <button @click="removeSkill(index)" class="btn-remove-skill">×</button>
          </span>
        </div>
      </section>

      <!-- Navegação entre Steps -->
      <div class="steps-navigation">
        <button 
          v-if="currentStep > 1" 
          @click="previousStep" 
          class="btn-previous"
        >
          ← Voltar
        </button>
        <button 
          v-if="currentStep < 4" 
          @click="nextStep" 
          class="btn-next"
        >
          Próximo →
        </button>
        <button 
          v-if="currentStep === 4" 
          @click="generateModels" 
          class="btn-generate"
        >
          Visualizar Modelos →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormBuilder',
  props: {
    onGenerate: Function
  },
  data() {
    return {
      currentStep: 1,
      steps: ['Informações Pessoais', 'Experiência', 'Formação', 'Habilidades'],
      hasSavedData: false,
      formData: {
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        age: '',
        gender: '',
        cnh: '',
        summary: '',
        photo: '',
        experience: [
          {
            position: '',
            company: '',
            startDate: '',
            endDate: '',
            description: ''
          }
        ],
        education: [
          {
            degree: '',
            institution: '',
            graduationYear: ''
          }
        ],
        skills: []
      },
      newSkill: ''
    }
  },
  mounted() {
    // Carregar dados salvos do localStorage
    this.loadSavedData()
  },
  watch: {
    // Auto-save sempre que formData mudar
    formData: {
      handler(newData) {
        this.saveToLocalStorage(newData)
      },
      deep: true
    }
  },
  methods: {
    saveToLocalStorage(data) {
      try {
        localStorage.setItem('curriculumFormData', JSON.stringify(data))
        localStorage.setItem('curriculumFormStep', this.currentStep.toString())
        this.hasSavedData = true
      } catch (error) {
        console.error('Erro ao salvar dados:', error)
      }
    },
    loadSavedData() {
      try {
        const savedData = localStorage.getItem('curriculumFormData')
        const savedStep = localStorage.getItem('curriculumFormStep')
        
        if (savedData) {
          this.formData = JSON.parse(savedData)
          this.hasSavedData = true
          console.log('✅ Dados carregados do armazenamento local')
        }
        
        if (savedStep) {
          this.currentStep = parseInt(savedStep)
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    },
    clearSavedData() {
      if (confirm('Tem certeza que deseja limpar todos os dados salvos? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('curriculumFormData')
        localStorage.removeItem('curriculumFormStep')
        
        // Resetar para dados vazios
        this.formData = {
          name: '',
          title: '',
          email: '',
          phone: '',
          location: '',
          age: '',
          gender: '',
          cnh: '',
          summary: '',
          photo: '',
          experience: [
            {
              position: '',
              company: '',
              startDate: '',
              endDate: '',
              description: ''
            }
          ],
          education: [
            {
              degree: '',
              institution: '',
              graduationYear: ''
            }
          ],
          skills: []
        }
        this.currentStep = 1
        this.hasSavedData = false
        this.newSkill = ''
        
        alert('✅ Dados limpos com sucesso!')
      }
    },
    addExperience() {
      this.formData.experience.push({
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      })
    },
    removeExperience(index) {
      this.formData.experience.splice(index, 1)
    },
    addEducation() {
      this.formData.education.push({
        degree: '',
        institution: '',
        graduationYear: ''
      })
    },
    removeEducation(index) {
      this.formData.education.splice(index, 1)
    },
    addSkill() {
      if (this.newSkill.trim() && !this.formData.skills.includes(this.newSkill.trim())) {
        this.formData.skills.push(this.newSkill.trim())
        this.newSkill = ''
      }
    },
    removeSkill(index) {
      this.formData.skills.splice(index, 1)
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.formData.photo = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    removePhoto() {
      this.formData.photo = ''
      document.getElementById('photo-input').value = ''
    },
    nextStep() {
      // Validação básica por step (DESABILITADA PARA DEV)
      // if (this.currentStep === 1) {
      //   if (!this.formData.name.trim() || !this.formData.title.trim() || !this.formData.email.trim()) {
      //     alert('Por favor, preencha nome, profissão e email!')
      //     return
      //   }
      // }
      if (this.currentStep < 4) {
        this.currentStep++
        localStorage.setItem('curriculumFormStep', this.currentStep.toString())
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
        localStorage.setItem('curriculumFormStep', this.currentStep.toString())
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    generateModels() {
      // Validar campos obrigatórios (DESABILITADO PARA DEV)
      // if (!this.formData.name.trim() || !this.formData.title.trim() || !this.formData.email.trim()) {
      //   alert('Por favor, preencha nome, profissão e email!')
      //   return
      // }
      
      // Emitir evento com dados do formulário
      this.$emit('generate', JSON.parse(JSON.stringify(this.formData)))
    }
  }
}
</script>

<style scoped>
.form-builder {
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(30, 64, 175, 0.1);
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h2 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.form-header p {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.btn-clear-data {
  margin-top: 12px;
  padding: 8px 16px;
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.btn-clear-data:hover {
  background: #fecaca;
  border-color: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
}

/* STEPS INDICATOR */
.steps-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 0 20px;
  position: relative;
}

.steps-indicator::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 3px;
  background: linear-gradient(90deg, #e5e7eb 0%, #dbeafe 100%);
  z-index: 0;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 2px solid #d0d0d0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #999;
  transition: all 0.3s ease;
}

.step-item.active .step-number {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  border-color: #1e40af;
  color: white;
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}

.step-item.completed .step-number {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  border-color: #10b981;
  color: white;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.step-item.completed .step-number::after {
  content: '✓';
}

.step-label {
  font-size: 0.85rem;
  color: #999;
  font-weight: 600;
  text-align: center;
  max-width: 100px;
}

.step-item.active .step-label {
  color: #1e40af;
  font-weight: 700;
}

.step-item.completed .step-label {
  color: #10b981;
}

/* STEPS NAVIGATION */
.steps-navigation {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 30px;
}

.btn-previous,
.btn-next {
  padding: 14px 28px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
  color: #2c2c2c;
}

.btn-previous:hover {
  background: #eff6ff;
  border-color: #1e40af;
  color: #1e40af;
  transform: translateY(-2px);
}

.btn-next {
  margin-left: auto;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  border-color: #1e40af;
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.2);
}

.btn-next:hover {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  border-color: #1e3a8a;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.3);
  transform: translateY(-2px);
}

.form-section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e5e7eb;
}

.form-section:last-of-type {
  border-bottom: none;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  margin: 0;
  font-size: 1.2rem;
  color: #1a1a1a;
  font-weight: 700;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c2c2c;
  font-size: 0.9rem;
}

.input,
.textarea {
  padding: 12px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color 0.3s;
  color: #333;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.textarea {
  resize: vertical;
  font-size: 0.9rem;
}

.preview-hint {
  display: block;
  margin-top: 6px;
  color: #4caf50;
  font-weight: 600;
}

.photo-upload {
  margin-bottom: 12px;
}

.file-input {
  display: none;
}

.file-label {
  display: block;
  padding: 24px;
  background: #f9f9f9;
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #2c2c2c;
}

.file-label:hover {
  border-color: #3b82f6;
  background: #eff6ff;
}

.upload-text {
  display: block;
  font-size: 1rem;
}

.photo-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 15px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.preview-img {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #d0d0d0;
}

.btn-remove-photo {
  background: #d32f2f;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: background 0.3s;
}

.btn-remove-photo:hover {
  background: #b71c1c;
}

.experience-list,
.education-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.item-header h4 {
  margin: 0;
  color: #2c2c2c;
  font-size: 0.95rem;
}

.btn-remove {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #d32f2f;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.3s;
}

.btn-remove:hover {
  color: #b71c1c;
}

.btn-add {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(30, 64, 175, 0.15);
}

.btn-add:hover {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(30, 64, 175, 0.25);
}

.skills-input {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.skills-input .input {
  flex: 1;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: #f0f0f0;
  border: 1px solid #d0d0d0;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #2c2c2c;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-remove-skill {
  background: none;
  border: none;
  color: #d32f2f;
  cursor: pointer;
  padding: 0;
  font-size: 1.2rem;
  line-height: 1;
  transition: color 0.3s;
}

.btn-remove-skill:hover {
  color: #b71c1c;
}

.btn-generate {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
}

.btn-generate:hover {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 64, 175, 0.3);
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }

  .form-builder {
    padding: 20px;
  }

  .steps-indicator {
    padding: 0 10px;
  }

  .steps-indicator::before {
    left: 5%;
    right: 5%;
  }

  .step-number {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }

  .step-label {
    font-size: 0.7rem;
    max-width: 80px;
  }

  .steps-navigation {
    flex-direction: column;
  }

  .btn-next {
    margin-left: 0;
  }
}
</style>
