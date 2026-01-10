<template>
  <div class="template-devops">
    <!-- Header -->
    <header class="devops-header">
      <div v-if="curriculum.photo" class="header-photo">
        <img :src="curriculum.photo" :alt="curriculum.name">
      </div>
      <div class="header-content">
        <h1>{{ curriculum.name }}</h1>
        <p class="job-title">{{ curriculum.title }}</p>
        <p class="summary">{{ curriculum.summary }}</p>
      </div>
    </header>

    <div class="devops-container">
      <!-- Main Content -->
      <section class="main-content">
        <!-- Experiência Profissional -->
        <section v-if="curriculum.experience && curriculum.experience.length" class="content-section">
          <div class="section-header">
            <span class="section-icon">⚙️</span>
            <h2>Experiência Profissional</h2>
          </div>
          <div class="timeline">
            <div v-for="(item, index) in curriculum.experience" :key="index" class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <div class="exp-title-row">
                  <h3>{{ item.position }}</h3>
                  <span class="company-badge">{{ item.company }}</span>
                </div>
                <p class="timeline-date">{{ item.startDate }} — {{ item.endDate }}</p>
                <p class="timeline-desc">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Educação -->
        <section v-if="curriculum.education && curriculum.education.length" class="content-section">
          <div class="section-header">
            <span class="section-icon">📚</span>
            <h2>Educação</h2>
          </div>
          <div v-for="(item, index) in curriculum.education" :key="index" class="education-item">
            <h3>{{ item.degree }}</h3>
            <p class="institution">{{ item.institution }}</p>
            <p class="year">{{ item.graduationYear }}</p>
          </div>
        </section>

        <!-- Habilidades Técnicas -->
        <section v-if="curriculum.skills && curriculum.skills.length" class="content-section">
          <div class="section-header">
            <span class="section-icon">💾</span>
            <h2>Stack Técnico</h2>
          </div>
          <div class="tech-grid">
            <div v-for="(skill, index) in curriculum.skills" :key="index" class="tech-badge">
              {{ skill }}
            </div>
          </div>
        </section>
      </section>

      <!-- Sidebar -->
      <aside class="sidebar">
        <!-- Contact Info -->
        <div class="sidebar-section">
          <h3>📋 Informações</h3>
          <div class="info-item">
            <span class="info-label">Email:</span>
            <p>{{ curriculum.email }}</p>
          </div>
          <div class="info-item">
            <span class="info-label">Telefone:</span>
            <p>{{ curriculum.phone }}</p>
          </div>
          <div class="info-item">
            <span class="info-label">Endereço:</span>
            <p>{{ curriculum.location }}</p>
          </div>
          <div v-if="curriculum.age" class="info-item">
            <span class="info-label">Idade:</span>
            <p>{{ curriculum.age }} anos</p>
          </div>
          <div v-if="curriculum.gender" class="info-item">
            <span class="info-label">Sexo:</span>
            <p>{{ curriculum.gender }}</p>
          </div>
          <div v-if="curriculum.cnh" class="info-item">
            <span class="info-label">CNH:</span>
            <p>{{ curriculum.cnh }}</p>
          </div>
        </div>

        <!-- Stats Box -->
        <div class="stats-box">
          <div class="stat">
            <div class="stat-number">{{ curriculum.experience ? curriculum.experience.length : 0 }}+</div>
            <div class="stat-label">Posições</div>
          </div>
          <div class="stat">
            <div class="stat-number">{{ curriculum.skills ? curriculum.skills.length : 0 }}</div>
            <div class="stat-label">Skills</div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateDevOps',
  props: {
    curriculum: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.template-devops {
  background: white;
  color: #1a1a1a;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
  /* Anti-quebra de palavras */
  word-break: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: none;
  -webkit-hyphens: none;
  -moz-hyphens: none;
}

/* HEADER */
.devops-header {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 40px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.header-photo {
  flex: 0 0 120px;
}

.header-photo img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
}

.header-content h1 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
}

.job-title {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  opacity: 0.95;
  font-weight: 600;
}

.summary {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.6;
}

/* CONTAINER */
.devops-container {
  display: flex;
  gap: 40px;
  padding: 40px;
}

.main-content {
  flex: 1;
}

/* SECTIONS */
.content-section {
  margin-bottom: 35px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #2a5298;
}

.section-icon {
  font-size: 1.3rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e3c72;
}

/* TIMELINE - Experiência */
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e5e7eb;
}

.timeline-item {
  position: relative;
  margin-bottom: 25px;
}

.timeline-marker {
  position: absolute;
  left: -37px;
  top: 5px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #2a5298;
  border: 3px solid white;
  box-shadow: 0 0 0 3px #2a5298;
}

.timeline-content {
  background: #f8f9fa;
  padding: 18px;
  border-radius: 6px;
  border-left: 3px solid #2a5298;
}

.exp-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 15px;
  margin-bottom: 8px;
}

.timeline-content h3 {
  margin: 0;
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 700;
}

.company-badge {
  background: #2a5298;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.timeline-date {
  margin: 0 0 8px 0;
  font-size: 0.85rem;
  color: #999;
  font-weight: 600;
}

.timeline-desc {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
}

/* Educação */
.education-item {
  background: #f8f9fa;
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 6px;
  border-left: 3px solid #2a5298;
}

.education-item h3 {
  margin: 0 0 4px 0;
  font-size: 0.95rem;
  color: #1a1a1a;
  font-weight: 700;
}

.institution {
  margin: 0;
  font-size: 0.85rem;
  color: #2a5298;
  font-weight: 600;
}

.year {
  margin: 4px 0 0 0;
  font-size: 0.8rem;
  color: #999;
}

/* Tech Grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
}

.tech-badge {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e3c72;
  text-align: center;
}

/* SIDEBAR */
.sidebar {
  flex: 0 0 240px;
}

.sidebar-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #2a5298;
}

.sidebar-section h3 {
  margin: 0 0 15px 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a1a;
}

.info-item {
  margin-bottom: 12px;
}

.info-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #2a5298;
  text-transform: uppercase;
  margin-bottom: 3px;
}

.info-item p {
  margin: 0;
  font-size: 0.85rem;
  color: #555;
}

/* Stats Box */
.stats-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.75rem;
  opacity: 0.9;
  font-weight: 600;
}

@media (max-width: 900px) {
  .devops-container {
    flex-direction: column;
  }

  .devops-header {
    flex-direction: column;
    text-align: center;
  }

  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media print {
  .template-devops {
    padding: 0;
  }
}
</style>
