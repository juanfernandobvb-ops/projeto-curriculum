<template>
  <div class="template-developer">
    <!-- Header com código -->
    <header class="dev-header">
      <div class="code-snippet">&lt;/&gt;</div>
      <div class="header-info">
        <h1>{{ curriculum.name }}</h1>
        <p class="dev-title">{{ curriculum.title }}</p>
      </div>
      <div class="header-badges">
        <span v-for="(skill, index) in curriculum.skills.slice(0, 5)" :key="index" class="skill-badge">
          {{ skill }}
        </span>
      </div>
    </header>

    <div class="dev-layout">
      <!-- Conteúdo Principal -->
      <main class="dev-main">
        <!-- Resumo -->
        <section v-if="curriculum.summary" class="dev-section">
          <h2>👤 Sobre Mim</h2>
          <p>{{ curriculum.summary }}</p>
        </section>

        <!-- Experiência -->
        <section v-if="curriculum.experience && curriculum.experience.length" class="dev-section">
          <h2>💼 Experiência</h2>
          <div class="exp-container">
            <div v-for="(item, index) in curriculum.experience" :key="index" class="exp-card">
              <div class="exp-header">
                <h3>{{ item.position }}</h3>
                <span class="exp-company">{{ item.company }}</span>
              </div>
              <p class="exp-date">{{ item.startDate }} — {{ item.endDate }}</p>
              <p class="exp-desc">{{ item.description }}</p>
            </div>
          </div>
        </section>

        <!-- Educação -->
        <section v-if="curriculum.education && curriculum.education.length" class="dev-section">
          <h2>🎓 Educação</h2>
          <div v-for="(item, index) in curriculum.education" :key="index" class="edu-card">
            <h3>{{ item.degree }}</h3>
            <p>{{ item.institution }} • {{ item.graduationYear }}</p>
          </div>
        </section>

        <!-- Skills -->
        <section v-if="curriculum.skills && curriculum.skills.length" class="dev-section">
          <h2>⚙️ Habilidades</h2>
          <div class="skills-grid">
            <div v-for="(skill, index) in curriculum.skills" :key="index" class="skill-item">
              ✓ {{ skill }}
            </div>
          </div>
        </section>
      </main>

      <!-- Sidebar -->
      <aside class="dev-sidebar">
        <!-- Info Contato -->
        <div class="sidebar-box">
          <h3>📬 Contato</h3>
          <p>📧 {{ curriculum.email }}</p>
          <p>📱 {{ curriculum.phone }}</p>
          <p>📍 {{ curriculum.location }}</p>
          <p v-if="curriculum.age">🎂 {{ curriculum.age }} anos</p>
          <p v-if="curriculum.gender">👤 {{ curriculum.gender }}</p>
          <p v-if="curriculum.cnh">🚗 {{ curriculum.cnh }}</p>
        </div>

        <!-- Foto -->
        <div v-if="curriculum.photo" class="photo-box">
          <img :src="curriculum.photo" :alt="curriculum.name" class="sidebar-photo">
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateDeveloper',
  props: {
    curriculum: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.template-developer {
  background: white;
  color: #1a1a1a;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* HEADER */
.dev-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  display: flex;
  align-items: center;
  gap: 30px;
}

.code-snippet {
  font-size: 3rem;
  font-weight: 700;
  opacity: 0.8;
}

.header-info h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.dev-title {
  margin: 8px 0 15px 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.header-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.skill-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

/* LAYOUT */
.dev-layout {
  display: flex;
  gap: 40px;
  padding: 40px;
}

.dev-main {
  flex: 1;
}

/* SECTIONS */
.dev-section {
  margin-bottom: 35px;
}

.dev-section h2 {
  margin: 0 0 20px 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
}

.dev-section p {
  margin: 0;
  color: #555;
  line-height: 1.7;
  font-size: 0.95rem;
}

/* Experience */
.exp-container {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.exp-card {
  background: #f9f9f9;
  padding: 20px;
  border-left: 4px solid #667eea;
  border-radius: 6px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 15px;
  margin-bottom: 8px;
}

.exp-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 700;
}

.exp-company {
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 600;
}

.exp-date {
  margin: 0 0 8px 0;
  font-size: 0.85rem;
  color: #999;
}

.exp-desc {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
}

/* Education */
.edu-card {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.edu-card:last-child {
  border-bottom: none;
}

.edu-card h3 {
  margin: 0;
  font-size: 0.95rem;
  color: #1a1a1a;
  font-weight: 700;
}

.edu-card p {
  margin: 4px 0 0 0;
  font-size: 0.9rem;
  color: #666;
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.skill-item {
  background: #f0f0f0;
  padding: 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #555;
}

/* SIDEBAR */
.dev-sidebar {
  flex: 0 0 240px;
}

.sidebar-box {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.sidebar-box h3 {
  margin: 0 0 15px 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a1a;
}

.sidebar-box p {
  margin: 0 0 10px 0;
  font-size: 0.85rem;
  color: #555;
  line-height: 1.6;
}

.sidebar-box p:last-child {
  margin-bottom: 0;
}

.photo-box {
  text-align: center;
}

.sidebar-photo {
  width: 100%;
  border-radius: 8px;
  border: 3px solid #667eea;
}

@media (max-width: 900px) {
  .dev-layout {
    flex-direction: column;
  }

  .dev-header {
    flex-direction: column;
    text-align: center;
  }

  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media print {
  .template-developer {
    padding: 0;
  }

  .dev-header {
    margin: 0;
  }

  .dev-section {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .exp-card,
  .edu-card {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 20px;
  }
}
</style>
