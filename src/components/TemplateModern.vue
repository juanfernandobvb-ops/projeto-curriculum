<template>
  <div class="template-modern a4-container">
    <!-- Header com foto e info básica -->
    <div class="header-section">
      <div class="photo-container" v-if="curriculum.photo">
        <img :src="curriculum.photo" :alt="curriculum.name" class="photo-circle">
      </div>
      <div class="name-section">
        <h1 class="name">{{ curriculum.name }}</h1>
        <p class="title-text">{{ curriculum.title }}</p>
      </div>
    </div>

    <!-- 2 Colunas: Sidebar + Conteúdo -->
    <div class="main-layout">
      <!-- Sidebar Esquerda -->
      <aside class="sidebar">
        <!-- Contato -->
        <div class="sidebar-block pdf-avoid-break">
          <h3 class="sidebar-title">CONTATO</h3>
          <div class="contact-list">
            <div class="contact-item pdf-avoid-break" v-if="curriculum.email">
              <strong>Email:</strong>
              <p>{{ curriculum.email }}</p>
            </div>
            <div class="contact-item pdf-avoid-break" v-if="curriculum.phone">
              <strong>Telefone:</strong>
              <p>{{ curriculum.phone }}</p>
            </div>
            <div class="contact-item pdf-avoid-break" v-if="curriculum.location">
              <strong>Endereço:</strong>
              <p>{{ curriculum.location }}</p>
            </div>
            <div class="contact-item pdf-avoid-break" v-if="curriculum.age">
              <strong>Idade:</strong>
              <p>{{ curriculum.age }} anos</p>
            </div>
            <div class="contact-item pdf-avoid-break" v-if="curriculum.gender">
              <strong>Sexo:</strong>
              <p>{{ curriculum.gender }}</p>
            </div>
            <div class="contact-item pdf-avoid-break" v-if="curriculum.cnh">
              <strong>CNH:</strong>
              <p>{{ curriculum.cnh }}</p>
            </div>
          </div>
        </div>

        <!-- Habilidades -->
        <div class="sidebar-block pdf-avoid-break" v-if="curriculum.skills && curriculum.skills.length">
          <h3 class="sidebar-title">HABILIDADES</h3>
          <div class="skills-list">
            <span class="skill-tag" v-for="(skill, index) in curriculum.skills" :key="index">
              {{ skill }}
            </span>
          </div>
        </div>
      </aside>

      <!-- Conteúdo Principal -->
      <main class="content-area">
        <!-- Resumo Profissional -->
        <section v-if="curriculum.summary" class="content-section">
          <h2 class="section-title">SOBRE MIM</h2>
          <p class="section-text">{{ curriculum.summary }}</p>
        </section>

        <!-- Experiência -->
        <section v-if="curriculum.experience && curriculum.experience.length" class="content-section">
          <h2 class="section-title">EXPERIÊNCIA PROFISSIONAL</h2>
          <div class="experience-list">
            <div class="exp-item" v-for="(item, index) in curriculum.experience" :key="index">
              <div class="exp-header">
                <div class="exp-position">{{ item.position }}</div>
                <div class="exp-company">{{ item.company }}</div>
                <div class="exp-date">{{ item.startDate }} - {{ item.endDate }}</div>
              </div>
              <p class="exp-description">{{ item.description }}</p>
            </div>
          </div>
        </section>

        <!-- Educação -->
        <section v-if="curriculum.education && curriculum.education.length" class="content-section">
          <h2 class="section-title">FORMAÇÃO ACADÊMICA</h2>
          <div class="education-list">
            <div class="edu-item" v-for="(item, index) in curriculum.education" :key="index">
              <div class="edu-header">
                <h3 class="edu-degree">{{ item.degree }}</h3>
                <span class="edu-year">{{ item.graduationYear }}</span>
              </div>
              <p class="edu-institution">{{ item.institution }}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateModern',
  props: {
    curriculum: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
:root, html, body {
  font-size: 12pt;
}
@media print {
  :root, html, body {
    font-size: 12pt;
  }
}

/* CONTAINER COM DIMENSÕES A4 */
.template-modern {
  background: white;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  padding: 0;
  
  /* Anti-quebra de palavras */
  word-break: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: none;
  -webkit-hyphens: none;
  -moz-hyphens: none;
}

/* Container A4 para PDF */
.a4-container {
  max-width: 210mm;
  margin: 0 auto;
  background: white;
  min-height: 297mm;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.header-section {
  background: white;
  padding: 30px 40px;
  border-radius: 0;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: none;
  box-sizing: border-box;
}

.photo-container {
  margin-bottom: 20px;
}

.photo-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #2c2c2c;
}

.name-section h1,
.name {
  margin: 0;
  font-size: 2rem;
  color: #1a1a1a;
  font-weight: 700;
}

.title-text {
  margin: 8px 0 0 0;
  font-size: 1.1rem;
  color: #666;
  font-style: italic;
}

/* MAIN LAYOUT - 2 COLUNAS */
.main-layout {
  display: flex !important;
  gap: 30px;
  flex-wrap: nowrap !important;
  align-items: stretch;
  flex-direction: row !important;
  flex: 1 1 auto;
  box-sizing: border-box;
}

/* SIDEBAR */
.sidebar {
  flex: 0 0 280px !important;
  min-width: 280px !important;
  max-width: 280px !important;
  width: 280px !important;
  background: #2c2c2c;
  color: white;
  padding: 30px 25px;
  border-radius: 0;
  flex-shrink: 0 !important;
  box-sizing: border-box;
}

.sidebar-block {
  margin-bottom: 30px;
  width: 100%;
}

.sidebar-block.skills-block {
  min-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.sidebar-title {
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  text-transform: uppercase;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
  display: block;
}

.skills-divider {
  border-bottom: 1px solid #aaa;
  margin: 18px 0 18px 0;
  height: 0;
  display: block;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

@media print {
  .sidebar-block.skills-block {
    min-height: 70px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
  }
  .sidebar-title {
    margin-bottom: 15px !important;
    padding-bottom: 10px !important;
    display: block !important;
  }
  .skills-divider {
    margin: 18px 0 18px 0 !important;
    height: 0 !important;
    display: block !important;
  }
  .skills-list {
    margin-top: 18px !important;
    gap: 8px !important;
  }
}

/* CONTENT AREA */
.content-area {
  flex: 1 1 auto !important;
  min-width: 0 !important;
  max-width: none !important;
  flex-grow: 1 !important;
  flex-shrink: 1 !important;
}

.content-section {
  background: white;
  padding: 20px 30px;
  margin-bottom: 18px;
  border-radius: 0;
  box-shadow: none;
  box-sizing: border-box;
}

.section-title {
  font-size: 14pt;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0 0 18px 0;
  color: #1a1a1a;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.skills-title {
  margin-bottom: 12px !important;
  padding-bottom: 6px !important;
  display: block;
}

.divider {
  border-bottom: 1px solid #aaa;
  margin: 16px 0 16px 0;
  padding-bottom: 6px;
  display: block;
}

@media print {
  .skills-title {
    margin-bottom: 14px !important;
    padding-bottom: 8px !important;
    display: block !important;
  }
  .divider {
    margin: 18px 0 18px 0 !important;
    padding-bottom: 10px !important;
    display: block !important;
  }
}

.section-subtitle {
  margin-bottom: 10px;
  margin-top: 8px;
}

.section-text,
.exp-company,
.exp-date,
.exp-description,
.exp-position {
  font-size: 12pt;
}

.modern-section {
  margin-bottom: 28px;
}

.exp-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
}

/* EXPERIÊNCIA */
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.exp-item {
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.exp-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.exp-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
}

.exp-position {
  margin: 0;
  font-size: 12pt;
  font-weight: 700;
  color: #1a1a1a;
}

.exp-date {
  font-size: 12pt;
  color: #999;
  white-space: nowrap;
}

.exp-company {
  margin: 0 0 8px 0;
  font-size: 12pt;
  font-weight: 600;
  color: #666;
}

.exp-description {
  margin: 0;
  font-size: 12pt;
  line-height: 1.6;
  color: #555;
  word-break: normal;
  hyphens: none;
}

/* EDUCAÇÃO */
.education-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.edu-item {
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.edu-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 6px;
}

.edu-degree {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}

.edu-year {
  font-size: 0.85rem;
  color: #999;
  white-space: nowrap;
}

.edu-institution {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

/* CLASSES DE CONTROLE DE QUEBRA */
.pdf-avoid-break {
  /* Quebra natural permitida */
}

.pdf-page-break-before {
  page-break-before: always !important;
  break-before: page !important;
}

.pdf-page-break-after {
  page-break-after: always !important;
  break-after: page !important;
}

/* Responsive */
@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
  }

  .sidebar {
    flex: 1;
  }
}
</style>
