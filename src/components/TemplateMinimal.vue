<template>
  <div class="template-minimal">
    <!-- Header com foto pequena -->
    <header class="minimal-header">
      <div class="header-photo" v-if="curriculum.photo">
        <img :src="curriculum.photo" :alt="curriculum.name" class="small-photo">
      </div>
      <div class="header-text">
        <h1>{{ curriculum.name }}</h1>
        <p class="minimal-subtitle">{{ curriculum.title }}</p>
      </div>
    </header>

    <!-- 2 Colunas -->
    <div class="minimal-layout">
      <!-- Sidebar Esquerda -->
      <aside class="minimal-sidebar">
        <!-- Contato -->
        <div class="minimal-block">
          <h3>CONTATO</h3>
          <div class="contact-list" v-if="curriculum.email || curriculum.phone || curriculum.location">
            <div v-if="curriculum.email" class="contact-line">
              <span class="label">Email:</span>
              <span class="value">{{ curriculum.email }}</span>
            </div>
            <div v-if="curriculum.phone" class="contact-line">
              <span class="label">Telefone:</span>
              <span class="value">{{ curriculum.phone }}</span>
            </div>
            <div v-if="curriculum.location" class="contact-line">
              <span class="label">Endereço:</span>
              <span class="value">{{ curriculum.location }}</span>
            </div>
            <div v-if="curriculum.age" class="contact-line">
              <span class="label">Idade:</span>
              <span class="value">{{ curriculum.age }} anos</span>
            </div>
            <div v-if="curriculum.gender" class="contact-line">
              <span class="label">Sexo:</span>
              <span class="value">{{ curriculum.gender }}</span>
            </div>
            <div v-if="curriculum.cnh" class="contact-line">
              <span class="label">CNH:</span>
              <span class="value">{{ curriculum.cnh }}</span>
            </div>
          </div>
        </div>

        <!-- Habilidades -->
        <div class="minimal-block" v-if="curriculum.skills && curriculum.skills.length">
          <h3>HABILIDADES</h3>
          <div class="skills-column">
            <span class="skill-dot" v-for="(skill, index) in curriculum.skills" :key="index">
              {{ skill }}
            </span>
          </div>
        </div>
      </aside>

      <!-- Conteúdo Principal -->
      <main class="minimal-main">
        <!-- Resumo -->
        <section v-if="curriculum.summary" class="minimal-section">
          <h2>SOBRE MIM</h2>
          <p>{{ curriculum.summary }}</p>
        </section>

        <!-- Experiência -->
        <section v-if="curriculum.experience && curriculum.experience.length" class="minimal-section">
          <h2>EXPERIÊNCIA</h2>
          <div class="minimal-item" v-for="(item, index) in curriculum.experience" :key="index">
            <h3>{{ item.position }}</h3>
            <p class="org-name">{{ item.company }}</p>
            <p class="date-range">{{ item.startDate }} - {{ item.endDate }}</p>
            <p class="item-desc">{{ item.description }}</p>
          </div>
        </section>

        <!-- Educação -->
        <section v-if="curriculum.education && curriculum.education.length" class="minimal-section">
          <h2>EDUCAÇÃO</h2>
          <div class="minimal-item" v-for="(item, index) in curriculum.education" :key="index">
            <h3>{{ item.degree }}</h3>
            <p class="org-name">{{ item.institution }}</p>
            <p class="date-range">{{ item.graduationYear }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateMinimal',
  props: {
    curriculum: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
:root, html, body {
  font-size: 12pt;
}
@media print {
  :root, html, body {
    font-size: 12pt;
  }
}

.template-minimal {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12pt;
  background: #fff;
  color: #333;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

/* HEADER */
.minimal-header {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 36px 32px 18px 32px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  box-sizing: border-box;
}

.header-photo {
  flex-shrink: 0;
}

.small-photo {
  width: 90px;
  height: 90px;
  border-radius: 0;
  object-fit: cover;
  border: 2px solid #ccc;
  display: block;
  margin: 0 auto;
}

.header-text h1 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  color: #1a1a1a;
  font-weight: 700;
}

.minimal-subtitle {
  margin: 0 0 8px 0;
  font-size: 1.05rem;
  color: #666;
  font-weight: 500;
}

/* MAIN LAYOUT */
.minimal-layout {
  display: flex;
  gap: 32px;
  padding: 32px 24px 32px 24px;
  flex-wrap: nowrap;
  flex-direction: row;
  box-sizing: border-box;
}

/* SIDEBAR */
.minimal-sidebar {
  flex: 0 0 220px;
  min-width: 220px;
  max-width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.minimal-block {
  margin-bottom: 24px;
}

.minimal-block h3 {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #333;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-line {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-line .label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-line .value {
  font-size: 0.9rem;
  color: #333;
  word-break: break-word;
}

.skills-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-dot {
  font-size: 0.9rem;
  color: #555;
  position: relative;
  padding-left: 12px;
}

.skill-dot::before {
  content: '\2022';
  position: absolute;
  left: 0;
  color: #333;
  font-weight: bold;
}

/* MAIN CONTENT */
.minimal-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.minimal-section {
  margin-bottom: 32px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0;
  padding: 24px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.minimal-section h2 {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
}

.minimal-item {
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.minimal-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.minimal-item h3 {
  margin: 0 0 4px 0;
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 700;
}

.org-name {
  margin: 4px 0;
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
}

.date-range {
  margin: 4px 0 8px 0;
  font-size: 0.85rem;
  color: #999;
}

.item-desc {
  margin: 10px 0 0 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 900px) {
  .minimal-layout {
    flex-direction: column;
    gap: 20px;
    padding: 16px 4vw;
  }
  .minimal-sidebar {
    flex: 1;
    min-width: 0;
    max-width: none;
    gap: 16px;
  }
  .minimal-main {
    gap: 20px;
  }
  .minimal-section {
    padding: 16px 8px;
    gap: 8px;
  }
}
</style>
