<template>
  <div class="template-minimal">
    <!-- Header -->
    <header class="minimal-header">
      <div v-if="curriculum.photo" class="minimal-photo">
        <img :src="curriculum.photo" :alt="curriculum.name">
      </div>
      <div class="minimal-header-info">
        <h1>{{ curriculum.name }}</h1>
        <p class="minimal-title">{{ curriculum.title }}</p>
      </div>
    </header>

    <!-- Contact Bar -->
    <div class="minimal-contact-bar">
      <span v-if="curriculum.email" class="minimal-contact-item">{{ curriculum.email }}</span>
      <span v-if="curriculum.phone" class="minimal-contact-item">| {{ curriculum.phone }}</span>
      <span v-if="curriculum.location" class="minimal-contact-item">| {{ curriculum.location }}</span>
      <span v-if="curriculum.age" class="minimal-contact-item">| {{ curriculum.age }} anos</span>
      <span v-if="curriculum.gender" class="minimal-contact-item">| {{ curriculum.gender }}</span>
      <span v-if="curriculum.cnh" class="minimal-contact-item">| {{ curriculum.cnh }}</span>
    </div>

    <main class="minimal-main">
      <section v-if="curriculum.summary" class="minimal-section">
        <h2>Sobre</h2>
        <p class="minimal-summary">{{ curriculum.summary }}</p>
      </section>
      <section v-if="curriculum.experience && curriculum.experience.length" class="minimal-section">
        <h2>Experiência</h2>
        <div class="minimal-experience-list">
          <div v-for="(item, index) in curriculum.experience" :key="index" class="minimal-experience-item">
            <div class="minimal-exp-header">
              <span class="minimal-exp-position">{{ item.position }}</span>
              <span class="minimal-exp-dates">{{ item.startDate }} – {{ item.endDate }}</span>
            </div>
            <span class="minimal-exp-company">{{ item.company }}</span>
            <p class="minimal-exp-desc">{{ item.description }}</p>
          </div>
        </div>
      </section>
      <section v-if="curriculum.education && curriculum.education.length" class="minimal-section">
        <h2>Educação</h2>
        <div class="minimal-education-list">
          <div v-for="(item, index) in curriculum.education" :key="index" class="minimal-education-item">
            <span class="minimal-edu-degree">{{ item.degree }}</span>
            <span class="minimal-edu-institution">{{ item.institution }}</span>
            <span class="minimal-edu-year">{{ item.graduationYear }}</span>
          </div>
        </div>
      </section>
      <section v-if="curriculum.skills && curriculum.skills.length" class="minimal-section">
        <h2>Habilidades</h2>
        <div class="minimal-skills-list">
          <span v-for="(skill, index) in curriculum.skills" :key="index" class="minimal-skill-item">{{ skill }}</span>
        </div>
      </section>
    </main>
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
  background: #fff;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12pt;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

/* HEADER */
.minimal-header {
  width: 100%;
  background: #fff;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 32px 18px 32px;
  box-sizing: border-box;
  text-align: center;
}
.minimal-photo {
  margin-bottom: 14px;
}
.minimal-photo img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border: 2px solid #ccc;
  border-radius: 0;
  display: block;
  margin: 0 auto;
}
.minimal-header-info {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}
.minimal-header-info h1 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}
.minimal-title {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.95;
  font-style: italic;
}

/* CONTACT BAR */
.minimal-contact-bar {
  width: 100%;
  background: #f5f5f5;
  padding: 10px 32px;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 0.95rem;
  color: #555;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
}
.minimal-contact-item {
  color: #1a1a1a;
  font-weight: 500;
  min-width: 80px;
  text-align: center;
}

/* MAIN CONTENT */
.minimal-main {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px 32px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.minimal-section {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0;
  padding: 24px 20px;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
}
.minimal-section h2 {
  font-size: 14pt;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1a1a1a;
  margin: 0 0 14px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
}
.minimal-section h3 {
  margin-bottom: 8px;
  margin-top: 6px;
}
.minimal-section p,
.minimal-section span,
.minimal-section h3 {
  font-size: 12pt;
}
.minimal-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.minimal-summary {
  margin: 0;
  color: #555;
  font-size: 0.98rem;
  line-height: 1.7;
}

/* EXPERIÊNCIA */
.minimal-experience-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.minimal-experience-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 4px solid #333;
  padding-left: 12px;
}
.minimal-exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}
.minimal-exp-position {
  font-weight: 700;
  font-size: 1rem;
  color: #1a1a1a;
}
.minimal-exp-dates {
  font-size: 0.9rem;
  color: #999;
  white-space: nowrap;
}
.minimal-exp-company {
  font-size: 0.95rem;
  color: #333;
  font-weight: 600;
}
.minimal-exp-desc {
  font-size: 0.95rem;
  color: #555;
  margin: 0;
  line-height: 1.6;
}

/* EDUCAÇÃO */
.minimal-education-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.minimal-education-item {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  font-size: 0.97rem;
  color: #1a1a1a;
  align-items: center;
}
.minimal-edu-degree {
  font-weight: 700;
  color: #333;
}
.minimal-edu-institution {
  color: #666;
}
.minimal-edu-year {
  color: #999;
  font-size: 0.9rem;
}

/* HABILIDADES */
.minimal-skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}
.minimal-skill-item {
  background: #fff;
  color: #333;
  border: 1px solid #333;
  border-radius: 0;
  padding: 7px 14px;
  font-size: 0.95rem;
  font-weight: 600;
}

@media (max-width: 900px) {
  .minimal-main {
    padding: 16px 4vw;
    gap: 20px;
  }
  .minimal-section {
    padding: 16px 8px;
    gap: 8px;
  }
  .minimal-header {
    padding: 24px 8px 12px 8px;
  }
  .minimal-contact-bar {
    padding: 8px 8px;
  }
}
</style>
