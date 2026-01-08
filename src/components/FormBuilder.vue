<template>
  <div class="form-builder">
    <div class="form-container">
      <div class="form-header">
        <h2>Criar Meu Currículo</h2>
        <p>Preencha os campos abaixo para gerar seu currículo</p>
      </div>

      <!-- DADOS PESSOAIS -->
      <section class="form-section">
        <h3 class="section-title">Informações Pessoais</h3>
        
        <div class="form-row">
          <div class="form-group">
            <label>Nome Completo *</label>
            <input v-model="formData.name" type="text" placeholder="João Silva" class="input">
          </div>
          <div class="form-group">
            <label>Profissão/Título *</label>
            <input v-model="formData.title" type="text" placeholder="Desenvolvedor Full Stack" class="input">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Email *</label>
            <input v-model="formData.email" type="email" placeholder="seu@email.com" class="input">
          </div>
          <div class="form-group">
            <label>Telefone</label>
            <input v-model="formData.phone" type="tel" placeholder="(11) 98765-4321" class="input">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Endereço</label>
            <input v-model="formData.location" type="text" placeholder="São Paulo, SP" class="input">
          </div>
          <div class="form-group">
            <label>CNH (Carteira Nacional de Habilitação)</label>
            <input v-model="formData.cnh" type="text" placeholder="Ex: Categoria B" class="input">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Idade</label>
            <input v-model="formData.age" type="number" placeholder="30" class="input">
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

      <!-- EXPERIÊNCIA PROFISSIONAL -->
      <section class="form-section">
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
                <input v-model="exp.position" type="text" placeholder="Desenvolvedor Senior" class="input">
              </div>
              <div class="form-group">
                <label>Empresa</label>
                <input v-model="exp.company" type="text" placeholder="Tech Solutions Ltda" class="input">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Data de Início</label>
                <input v-model="exp.startDate" type="text" placeholder="Jan 2021" class="input">
              </div>
              <div class="form-group">
                <label>Data de Término</label>
                <input v-model="exp.endDate" type="text" placeholder="Presente" class="input">
              </div>
            </div>

            <div class="form-group">
              <label>Descrição</label>
              <textarea v-model="exp.description" placeholder="Descreva suas responsabilidades e realizações..." class="textarea" rows="3"></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- EDUCAÇÃO -->
      <section class="form-section">
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
                <input v-model="edu.degree" type="text" placeholder="Bacharelado em Ciência da Computação" class="input">
              </div>
              <div class="form-group">
                <label>Instituição</label>
                <input v-model="edu.institution" type="text" placeholder="Universidade de São Paulo" class="input">
              </div>
            </div>

            <div class="form-group">
              <label>Ano de Conclusão</label>
              <input v-model="edu.graduationYear" type="text" placeholder="2020" class="input">
            </div>
          </div>
        </div>
      </section>

      <!-- HABILIDADES -->
      <section class="form-section">
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

      <button @click="generateModels" class="btn-generate">Visualizar Modelos →</button>
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
      formData: {
        name: 'João Silva',
        title: 'Desenvolvedor Full Stack',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321',
        location: 'São Paulo, SP',
        age: '30',
        gender: 'Masculino',
        cnh: 'Categoria B',
        summary: 'Desenvolvedor Full Stack com 5 anos de experiência em desenvolvimento web. Especializado em Vue.js, React e Node.js. Apaixonado por criar interfaces intuitivas e soluções de backend escaláveis.',
        photo: '',
        experience: [
          {
            position: 'Desenvolvedor Senior',
            company: 'Tech Solutions',
            startDate: 'Jan 2021',
            endDate: 'Presente',
            description: 'Liderança de projetos frontend, mentoria de desenvolvedores juniores e implementação de arquitetura de componentes reutilizáveis.'
          },
          {
            position: 'Desenvolvedor Full Stack',
            company: 'Digital Innovations',
            startDate: 'Jun 2019',
            endDate: 'Dez 2020',
            description: 'Desenvolvimento de aplicações web full stack, integração de APIs e otimização de performance.'
          }
        ],
        education: [
          {
            degree: 'Bacharelado em Ciência da Computação',
            institution: 'Universidade de São Paulo',
            graduationYear: '2020'
          }
        ],
        skills: ['Vue.js', 'React', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'HTML/CSS', 'Git']
      },
      newSkill: ''
    }
  },
  methods: {
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
    generateModels() {
      // Validar campos obrigatórios
      if (!this.formData.name.trim() || !this.formData.title.trim() || !this.formData.email.trim()) {
        alert('Por favor, preencha nome, profissão e email!')
        return
      }
      
      // Emitir evento com dados do formulário
      this.$emit('generate', JSON.parse(JSON.stringify(this.formData)))
    }
  }
}
</script>

<style scoped>
.form-builder {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
  color: #1a1a1a;
  font-weight: 700;
}

.form-header p {
  margin: 0;
  color: #666;
  font-size: 1rem;
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
  border-color: #2c2c2c;
  box-shadow: 0 0 0 3px rgba(44, 44, 44, 0.1);
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
  border-color: #2c2c2c;
  background: #f5f5f5;
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
  background: #2c2c2c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: background 0.3s;
}

.btn-add:hover {
  background: #1a1a1a;
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
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-generate:hover {
  background: #1a1a1a;
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
}
</style>
