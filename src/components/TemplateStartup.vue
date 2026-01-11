<template>
  <div class="template-startup">
    <!-- Header -->
    <header class="startup-header">
      <div v-if="curriculum.photo" class="startup-photo">
        <img :src="curriculum.photo" :alt="curriculum.name">
      </div>
      <div class="startup-header-info">
        <h1>{{ curriculum.name }}</h1>
        <p class="startup-title">{{ curriculum.title }}</p>
        <div class="startup-contact">
          <span v-if="curriculum.email">{{ curriculum.email }}</span>
          <span v-if="curriculum.phone">| {{ curriculum.phone }}</span>
          <span v-if="curriculum.location">| {{ curriculum.location }}</span>
          <span v-if="curriculum.age">| {{ curriculum.age }} anos</span>
          <span v-if="curriculum.gender">| {{ curriculum.gender }}</span>
          <span v-if="curriculum.cnh">| {{ curriculum.cnh }}</span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="startup-main">
      <section v-if="curriculum.summary" class="startup-section">
        <h2>Sobre Mim</h2>
        <p class="startup-summary">{{ curriculum.summary }}</p>
      </section>
      <section v-if="curriculum.experience && curriculum.experience.length" class="startup-section">
        <h2>Experiência</h2>
        <div class="startup-experience-list">
          <div v-for="(item, index) in curriculum.experience" :key="index" class="startup-experience-item">
            <div class="startup-exp-header">
              <span class="startup-exp-position">{{ item.position }}</span>
              <span class="startup-exp-dates">{{ item.startDate }} – {{ item.endDate }}</span>
            </div>
            <span class="startup-exp-company">{{ item.company }}</span>
            <p class="startup-exp-desc">{{ item.description }}</p>
          </div>
        </div>
      </section>
      <section v-if="curriculum.education && curriculum.education.length" class="startup-section">
        <h2>Educação</h2>
        <div class="startup-education-list">
          <div v-for="(item, index) in curriculum.education" :key="index" class="startup-education-item">
            <span class="startup-edu-degree">{{ item.degree }}</span>
            <span class="startup-edu-institution">{{ item.institution }}</span>
            <span class="startup-edu-year">{{ item.graduationYear }}</span>
          </div>
        </div>
      </section>
      <section v-if="curriculum.skills && curriculum.skills.length" class="startup-section">
        <h2>Habilidades</h2>
        <div class="startup-skills-list">
          <span v-for="(skill, index) in curriculum.skills" :key="index" class="startup-skill-item">{{ skill }}</span>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'TemplateStartup',
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

.template-startup {
  background: #fafbfc;
  color: #1a1a1a;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

/* HEADER */
.startup-header {
  width: 100%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 32px 24px 32px;
  box-sizing: border-box;
  text-align: center;
}
.startup-photo {
  margin-bottom: 18px;
}
.startup-photo img {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border: 3px solid #fff;
  border-radius: 0;
  display: block;
  margin: 0 auto;
}
.startup-header-info {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}
.startup-header-info h1 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}
.startup-title {
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.95;
  font-style: italic;
}
.startup-contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  font-size: 0.95rem;
  color: #fff;
  margin-top: 8px;
}
.startup-contact span {
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

/* MAIN CONTENT */
.startup-main {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px 32px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.startup-section {
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
}
.startup-section h2 {
  font-size: 1rem;
  font-weight: 700;
  color: #ff6b6b;
  margin: 0 0 12px 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.startup-summary {
  margin: 0;
  color: #555;
  font-size: 0.98rem;
  line-height: 1.7;
}

/* EXPERIÊNCIA */
.startup-experience-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.startup-experience-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 4px solid #ff6b6b;
  padding-left: 12px;
}
.startup-exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}
.startup-exp-position {
  font-weight: 700;
  font-size: 1rem;
  color: #1a1a1a;
}
.startup-exp-dates {
  font-size: 0.9rem;
  color: #999;
  white-space: nowrap;
}
.startup-exp-company {
  font-size: 0.95rem;
  color: #ff6b6b;
  font-weight: 600;
}
.startup-exp-desc {
  font-size: 0.95rem;
  color: #555;
  margin: 0;
  line-height: 1.6;
}

/* EDUCAÇÃO */
.startup-education-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.startup-education-item {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  font-size: 0.97rem;
  color: #1a1a1a;
  align-items: center;
}
.startup-edu-degree {
  font-weight: 700;
  color: #ff6b6b;
}
.startup-edu-institution {
  color: #666;
}
.startup-edu-year {
  color: #999;
  font-size: 0.9rem;
}

/* HABILIDADES */
.startup-skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}
.startup-skill-item {
  background: #fff;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 0;
  padding: 7px 14px;
  font-size: 0.95rem;
  font-weight: 600;
}

@media (max-width: 900px) {
  .startup-main {
    padding: 16px 4vw;
    gap: 20px;
  }
  .startup-section {
    padding: 16px 8px;
    gap: 8px;
  }
  .startup-header {
    padding: 24px 8px 16px 8px;
  }
}
</style>
