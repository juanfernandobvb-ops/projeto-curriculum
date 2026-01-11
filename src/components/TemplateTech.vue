<template>
  <div class="template-tech">
    <!-- Header com fundo escuro tipo terminal -->
    <header class="tech-header">
      <div class="header-content">
        <h1 v-if="curriculum.photo" class="header-with-photo">
          <img :src="curriculum.photo" :alt="curriculum.name" class="header-photo">
          {{ curriculum.name }}
        </h1>
        <h1 v-else>{{ curriculum.name }}</h1>
        <p class="tech-subtitle">{{ curriculum.title }}</p>
        <div class="tech-badges">
          <span class="badge">{{ curriculum.location }}</span>
          <span class="badge">{{ curriculum.email }}</span>
          <span class="badge">{{ curriculum.phone }}</span>
        </div>
      </div>
    </header>

    <!-- 2 Colunas -->
    <div class="tech-layout">
      <!-- Sidebar Esquerda - Habilidades -->
      <aside class="tech-sidebar">
        <!-- Stack Tecnológico -->
        <section v-if="curriculum.skills && curriculum.skills.length" class="tech-block">
          <h3 class="block-title">Stack Tecnológico</h3>
          <div class="tech-grid">
            <span v-for="(skill, index) in curriculum.skills" :key="index" class="tech-badge">
              {{ skill }}
            </span>
          </div>
        </section>

        <!-- Contato -->
        <section class="tech-block">
          <h3 class="block-title">Contato</h3>
          <div class="contact-tech">
            <p><strong>Email:</strong> {{ curriculum.email }}</p>
            <p><strong>Phone:</strong> {{ curriculum.phone }}</p>
            <p><strong>Endereço:</strong> {{ curriculum.location }}</p>
            <p v-if="curriculum.age"><strong>Idade:</strong> {{ curriculum.age }} anos</p>
            <p v-if="curriculum.gender"><strong>Sexo:</strong> {{ curriculum.gender }}</p>
            <p v-if="curriculum.cnh"><strong>CNH:</strong> {{ curriculum.cnh }}</p>
          </div>
        </section>
      </aside>

      <!-- Conteúdo Principal -->
      <main class="tech-main">
        <!-- Resumo Profissional -->
        <section v-if="curriculum.summary" class="tech-section">
          <h2>Sobre</h2>
          <p>{{ curriculum.summary }}</p>
        </section>

        <!-- Experiência Profissional -->
        <section v-if="curriculum.experience && curriculum.experience.length" class="tech-section">
          <h2>Experiência Profissional</h2>
          <div class="experience-timeline">
            <div v-for="(item, index) in curriculum.experience" :key="index" class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-body">
                <h3>{{ item.position }}</h3>
                <p class="company-name">{{ item.company }}</p>
                <p class="date-range">{{ item.startDate }} → {{ item.endDate }}</p>
                <p class="description">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Educação -->
        <section v-if="curriculum.education && curriculum.education.length" class="tech-section">
          <h2>Educação</h2>
          <div v-for="(item, index) in curriculum.education" :key="index" class="education-item">
            <h3>{{ item.degree }}</h3>
            <p class="institution">{{ item.institution }} • {{ item.graduationYear }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateTech',
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

.template-tech {
  background: white;
  color: #1a1a1a;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  
  /* Anti-quebra de palavras */
  word-break: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: none;
  -webkit-hyphens: none;
  -moz-hyphens: none;
}

/* HEADER */
.tech-header {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
  color: white;
  padding: 40px;
  border-bottom: 3px solid #58a6ff;
  box-sizing: border-box;
}

.header-content h1 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
}

.header-with-photo {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-photo {
  width: 80px;
  height: 80px;
  border-radius: 0;
  object-fit: cover;
  border: 3px solid #58a6ff;
}

.tech-subtitle {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: #79c0ff;
  font-weight: 600;
}

.tech-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  background: rgba(88, 166, 255, 0.15);
  border: 1px solid #58a6ff;
  color: #79c0ff;
  padding: 6px 12px;
  border-radius: 0;
  font-size: 0.75rem;
  font-weight: 600;
}

/* LAYOUT */
.tech-layout {
  display: flex !important;
  gap: 30px;
  padding: 40px;
  flex-wrap: nowrap !important;
  flex-direction: row !important;
  box-sizing: border-box;
}

/* SIDEBAR */
.tech-sidebar {
  flex: 0 0 260px !important;
  min-width: 260px !important;
  max-width: 260px !important;
  flex-shrink: 0 !important;
}

.tech-block {
  margin-bottom: 30px;
}

.block-title {
  margin: 0 0 15px 0;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1a1a1a;
  padding-bottom: 10px;
  border-bottom: 2px solid #58a6ff;
}

.tech-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.tech-badge {
  background: #f0f4f8;
  border: 1px solid #d0d5dd;
  color: #0d1117;
  padding: 8px 10px;
  border-radius: 0;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}

.contact-tech {
  font-size: 0.85rem;
  line-height: 1.8;
  color: #555;
}

.contact-tech p {
  margin: 0 0 8px 0;
}

.contact-tech strong {
  color: #1a1a1a;
  font-weight: 600;
}

/* MAIN CONTENT */
.tech-main {
  flex: 1;
}

.tech-section {
  margin-bottom: 35px;
}

.tech-section h2 {
  margin: 0 0 20px 0;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1a1a1a;
  padding-bottom: 10px;
  border-bottom: 2px solid #58a6ff;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.tech-section p {
  margin: 0;
  color: #555;
  line-height: 1.7;
  font-size: 0.95rem;
}

/* Timeline */
.experience-timeline {
  position: relative;
  padding-left: 30px;
}

.timeline-item {
  position: relative;
  margin-bottom: 25px;
  padding-bottom: 25px;
}

.timeline-item:last-child {
  border-bottom: none;
}

.timeline-marker {
  position: absolute;
  left: -30px;
  top: 5px;
  width: 12px;
  height: 12px;
  background: #58a6ff;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #58a6ff;
}

.timeline-body h3 {
  margin: 0 0 4px 0;
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 700;
}

.company-name {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #58a6ff;
}

.date-range {
  margin: 0 0 8px 0;
  font-size: 0.85rem;
  color: #999;
}

.description {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #555;
}

/* Educação */
.education-item {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.education-item:last-child {
  border-bottom: none;
}

.education-item h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
}

.institution {
  margin: 6px 0 0 0;
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 900px) {
  .tech-layout {
    flex-direction: column;
  }

  .tech-sidebar {
    flex: 1;
  }

  .tech-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

</style>
