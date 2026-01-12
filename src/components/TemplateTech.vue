<template>
  <div class="a4-curriculum-container">
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
              <div class="contact-row"><IconMail class="contact-icon" /><span class="contact-info">{{ curriculum.email }}</span></div>
              <div class="contact-row"><IconPhone class="contact-icon" /><span class="contact-info">{{ curriculum.phone }}</span></div>
              <div class="contact-row"><IconMapPin class="contact-icon" /><span class="contact-info">{{ curriculum.location }}</span></div>
              <div v-if="curriculum.age" class="contact-row"><IconCake class="contact-icon" /><span class="contact-info">{{ curriculum.age }} anos</span></div>
              <div v-if="curriculum.gender" class="contact-row"><IconUser class="contact-icon" /><span class="contact-info">{{ curriculum.gender }}</span></div>
              <div v-if="curriculum.cnh" class="contact-row"><IconCar class="contact-icon" /><span class="contact-info">{{ curriculum.cnh }}</span></div>
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
                  <div class="exp-header">
                    <h3>{{ item.position }}</h3>
                    <span class="company-name">{{ item.company }}</span>
                    <span class="date-range">{{ item.startDate }} → {{ item.endDate }}</span>
                  </div>
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
  </div>
</template>

<script>
import { IconMail, IconPhone, IconMapPin, IconCake, IconUser, IconCar } from '@tabler/icons-vue'
export default {
  name: 'TemplateTech',
  components: {
    IconMail, IconPhone, IconMapPin, IconCake, IconUser, IconCar
  },
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

.a4-curriculum-container {
  width: 210mm;
  min-height: 297mm;
  box-sizing: border-box;
  background: #fff;
  margin: 24px auto;
  box-shadow: 0 0 8px 0 rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  position: relative;
}
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
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12pt;
  
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
  font-size: 24pt;
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
  font-size: 13.2pt;
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
  font-size: 9pt;
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
  align-items: flex-start;
}

/* SIDEBAR */
.tech-sidebar {
  flex: 0 0 160px !important;
  min-width: 140px !important;
  max-width: 160px !important;
  width: 160px !important;
  flex-shrink: 0 !important;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: break-word;
}

.tech-block {
  margin-bottom: 30px;
}

.block-title {
  margin: 0 0 15px 0;
  font-size: 10.8pt;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1a1a1a;
  padding-bottom: 10px;
  border-bottom: 2px solid #58a6ff;
}

.tech-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tech-badge {
  background: #f0f4f8;
  border: 1px solid #d0d5dd;
  color: #0d1117;
  padding: 4px 4px;
  border-radius: 0;
  font-size: 8.6pt;
  font-weight: 600;
  text-align: center;
  max-width: 140px;
  min-width: 0;
  width: 100%;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-tech {
  font-size: 9.4pt;
  color: #555;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
  flex-wrap: wrap;
  word-break: break-all;
}

.contact-icon {
  font-size: 12pt;
  width: 18px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.contact-info {
  font-size: 9.4pt;
  color: #222;
  word-break: break-all;
}

/* MAIN CONTENT */
.tech-main {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.tech-section {
  margin-bottom: 28px;
}

.tech-section h2 {
  font-size: 14pt;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1a1a1a;
  padding-bottom: 10px;
  border-bottom: 2px solid #58a6ff;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 18px;
}

.tech-section h3 {
  margin-bottom: 8px;
  margin-top: 6px;
}

.tech-section p,
.tech-section span,
.tech-section h3 {
  font-size: 12pt;
}

.exp-header,
.timeline-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

/* Timeline */
.experience-timeline {
  position: relative;
  padding-left: 32px;
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

.timeline-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.timeline-body h3 {
  margin: 0 0 4px 0;
  font-size: 12pt;
  color: #1a1a1a;
  font-weight: 700;
}

.company-name,
.date-range,
.description {
  font-size: 12pt;
}

.company-name {
  margin: 0 0 4px 0;
  font-size: 10.8pt;
  font-weight: 600;
  color: #58a6ff;
}

.date-range {
  margin: 0 0 8px 0;
  font-size: 10.2pt;
  color: #999;
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
