<template>
  <div class="template-techminimal">
    <!-- Header Minimalista -->
    <header class="tech-header">
      <div class="header-wrapper">
        <div v-if="curriculum.photo" class="photo-circle">
          <img :src="curriculum.photo" :alt="curriculum.name">
        </div>
        <div class="header-main">
          <h1>{{ curriculum.name }}</h1>
          <p class="subtitle">{{ curriculum.title }}</p>
        </div>
      </div>
    </header>

    <!-- Contact Bar -->
    <div class="contact-bar">
      <span class="contact-item">{{ curriculum.email }}</span>
      <span class="divider">|</span>
      <span class="contact-item">{{ curriculum.phone }}</span>
      <span class="divider">|</span>
      <span class="contact-item">{{ curriculum.location }}</span>
      <span v-if="curriculum.age" class="divider">|</span>
      <span v-if="curriculum.age" class="contact-item">{{ curriculum.age }} anos</span>
      <span v-if="curriculum.gender" class="divider">|</span>
      <span v-if="curriculum.gender" class="contact-item">{{ curriculum.gender }}</span>
      <span v-if="curriculum.cnh" class="divider">|</span>
      <span v-if="curriculum.cnh" class="contact-item">{{ curriculum.cnh }}</span>
    </div>

    <div class="tech-min-layout">
      <!-- Main Content -->
      <main class="content">
        <!-- Resumo -->
        <section v-if="curriculum.summary" class="section">
          <p class="summary-text">{{ curriculum.summary }}</p>
        </section>

        <!-- Experiência -->
        <section v-if="curriculum.experience && curriculum.experience.length" class="section">
          <h2 class="section-title">EXPERIÊNCIA</h2>
          <div class="exp-items">
            <article v-for="(item, index) in curriculum.experience" :key="index" class="exp">
              <div class="exp-header">
                <h3 class="job-title">{{ item.position }}</h3>
                <span class="date">{{ item.startDate }} — {{ item.endDate }}</span>
              </div>
              <p class="employer">{{ item.company }}</p>
              <p class="description">{{ item.description }}</p>
            </article>
          </div>
        </section>

        <!-- Educação -->
        <section v-if="curriculum.education && curriculum.education.length" class="section">
          <h2 class="section-title">EDUCAÇÃO</h2>
          <div v-for="(item, index) in curriculum.education" :key="index" class="edu">
            <h3 class="degree">{{ item.degree }}</h3>
            <p class="school">{{ item.institution }} • {{ item.graduationYear }}</p>
          </div>
        </section>
      </main>

      <!-- Sidebar -->
      <aside class="sidebar-tech">
        <!-- Stack Técnico -->
        <section v-if="curriculum.skills && curriculum.skills.length" class="sidebar-section">
          <h3 class="sidebar-title">STACK</h3>
          <ul class="tech-list">
            <li v-for="(skill, index) in curriculum.skills" :key="index">{{ skill }}</li>
          </ul>
        </section>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateTechMinimal',
  props: {
    curriculum: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.template-techminimal {
  background: #ffffff;
  color: #1a1a1a;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  
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
  background: #1a1a1a;
  color: white;
  padding: 40px;
}

.header-wrapper {
  display: flex;
  gap: 25px;
  align-items: flex-start;
  max-width: 100%;
}

.photo-circle {
  flex: 0 0 100px;
}

.photo-circle img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #00d4ff;
}

.header-main h1 {
  margin: 0 0 8px 0;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle {
  margin: 0;
  font-size: 1rem;
  opacity: 0.85;
  font-weight: 500;
}

/* CONTACT BAR */
.contact-bar {
  background: #f5f5f5;
  padding: 12px 40px;
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 0.85rem;
  color: #555;
  flex-wrap: wrap;
}

.contact-item {
  color: #1a1a1a;
  font-weight: 500;
}

.divider {
  color: #ccc;
}

/* LAYOUT */
.tech-min-layout {
  display: flex;
  gap: 50px;
  padding: 40px;
}

.content {
  flex: 1;
}

/* SECTIONS */
.section {
  margin-bottom: 35px;
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #1a1a1a;
  text-transform: uppercase;
  border-bottom: 1px solid #1a1a1a;
  padding-bottom: 10px;
}

.summary-text {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.8;
  max-width: 600px;
}

/* EXPERIÊNCIA */
.exp-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.exp {
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.exp:last-child {
  border-bottom: none;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 15px;
  margin-bottom: 4px;
}

.job-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
}

.date {
  font-size: 0.8rem;
  color: #999;
  white-space: nowrap;
}

.employer {
  margin: 0 0 8px 0;
  font-size: 0.85rem;
  color: #00d4ff;
  font-weight: 600;
}

.description {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.7;
}

/* EDUCAÇÃO */
.edu {
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.edu:last-child {
  border-bottom: none;
}

.degree {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  color: #1a1a1a;
  font-weight: 700;
}

.school {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
}

/* SIDEBAR */
.sidebar-tech {
  flex: 0 0 200px;
}

.sidebar-section {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 6px;
}

.sidebar-title {
  margin: 0 0 15px 0;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #1a1a1a;
  text-transform: uppercase;
}

.tech-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tech-list li {
  padding: 8px 0;
  font-size: 0.85rem;
  color: #555;
  position: relative;
  padding-left: 15px;
}

.tech-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #00d4ff;
  font-weight: bold;
}

@media (max-width: 900px) {
  .tech-min-layout {
    flex-direction: column;
    gap: 30px;
  }

  .header-wrapper {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .header-main h1 {
    font-size: 1.8rem;
  }

  .sidebar-tech {
    flex: none;
  }
}


</style>
