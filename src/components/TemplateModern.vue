<template>
  <div class="template-modern">
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
        <div class="sidebar-block">
          <h3 class="sidebar-title">CONTATO</h3>
          <div class="contact-list">
            <div class="contact-item" v-if="curriculum.email">
              <strong>Email:</strong>
              <p>{{ curriculum.email }}</p>
            </div>
            <div class="contact-item" v-if="curriculum.phone">
              <strong>Telefone:</strong>
              <p>{{ curriculum.phone }}</p>
            </div>
            <div class="contact-item" v-if="curriculum.location">
              <strong>Localização:</strong>
              <p>{{ curriculum.location }}</p>
            </div>
          </div>
        </div>

        <!-- Habilidades -->
        <div class="sidebar-block" v-if="curriculum.skills && curriculum.skills.length">
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
                <h3 class="exp-position">{{ item.position }}</h3>
                <span class="exp-date">{{ item.startDate }} - {{ item.endDate }}</span>
              </div>
              <p class="exp-company">{{ item.company }}</p>
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

<style scoped>
.template-modern {
  background: #f8f9fa;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 40px;
}

/* HEADER */
.header-section {
  background: white;
  padding: 40px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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

.name-section h1 {
  margin: 0;
  font-size: 2.2rem;
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
  display: flex;
  gap: 30px;
}

/* SIDEBAR */
.sidebar {
  flex: 0 0 280px;
  background: #2c2c2c;
  color: white;
  padding: 30px 25px;
  border-radius: 8px;
}

.sidebar-block {
  margin-bottom: 30px;
}

.sidebar-block:last-child {
  margin-bottom: 0;
}

.sidebar-title {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  margin: 0 0 15px 0;
  text-transform: uppercase;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  font-size: 0.85rem;
  line-height: 1.4;
}

.contact-item strong {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
  opacity: 0.9;
}

.contact-item p {
  margin: 0;
  opacity: 0.85;
  word-break: break-word;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

/* CONTENT AREA */
.content-area {
  flex: 1;
}

.content-section {
  background: white;
  padding: 25px 30px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0 0 20px 0;
  color: #1a1a1a;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
}

.section-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #555;
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
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 8px;
}

.exp-position {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}

.exp-date {
  font-size: 0.85rem;
  color: #999;
  white-space: nowrap;
}

.exp-company {
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
}

.exp-description {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #555;
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

/* Responsive */
@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
  }

  .sidebar {
    flex: 1;
  }
}

@media print {
  .template-modern {
    background: white;
    padding: 0;
  }

  .header-section,
  .content-section {
    box-shadow: none;
    border: none;
  }
}
</style>
