<template>
  <div class="template-techminimal">
    <!-- Header -->
    <header class="techmin-header">
      <div v-if="curriculum.photo" class="techmin-photo">
        <img :src="curriculum.photo" :alt="curriculum.name">
      </div>
      <div class="techmin-header-info">
        <h1>{{ curriculum.name }}</h1>
        <p class="techmin-title">{{ curriculum.title }}</p>
      </div>
    </header>

    <!-- Contact Bar -->
    <div class="techmin-contact-bar">
      <span v-if="curriculum.email" class="techmin-contact-item">{{ curriculum.email }}</span>
      <span v-if="curriculum.phone" class="techmin-contact-item">| {{ curriculum.phone }}</span>
      <span v-if="curriculum.location" class="techmin-contact-item">| {{ curriculum.location }}</span>
      <span v-if="curriculum.age" class="techmin-contact-item">| {{ curriculum.age }} anos</span>
      <span v-if="curriculum.gender" class="techmin-contact-item">| {{ curriculum.gender }}</span>
      <span v-if="curriculum.cnh" class="techmin-contact-item">| {{ curriculum.cnh }}</span>
    </div>

    <main class="techmin-main">
      <section v-if="curriculum.summary" class="techmin-section">
        <h2>Sobre</h2>
        <p class="techmin-summary">{{ curriculum.summary }}</p>
      </section>
      <section v-if="curriculum.experience && curriculum.experience.length" class="techmin-section">
        <h2>Experiência</h2>
        <div class="techmin-experience-list">
          <div v-for="(item, index) in curriculum.experience" :key="index" class="techmin-experience-item">
            <div class="techmin-exp-header">
              <span class="techmin-exp-position">{{ item.position }}</span>
              <span class="techmin-exp-dates">{{ item.startDate }} – {{ item.endDate }}</span>
            </div>
            <span class="techmin-exp-company">{{ item.company }}</span>
            <p class="techmin-exp-desc">{{ item.description }}</p>
          </div>
        </div>
      </section>
      <section v-if="curriculum.education && curriculum.education.length" class="techmin-section">
        <h2>Educação</h2>
        <div class="techmin-education-list">
          <div v-for="(item, index) in curriculum.education" :key="index" class="techmin-education-item">
            <span class="techmin-edu-degree">{{ item.degree }}</span>
            <span class="techmin-edu-institution">{{ item.institution }}</span>
            <span class="techmin-edu-year">{{ item.graduationYear }}</span>
          </div>
        </div>
      </section>
      <section v-if="curriculum.skills && curriculum.skills.length" class="techmin-section">
        <h2>Stack</h2>
        <div class="techmin-skills-list">
          <span v-for="(skill, index) in curriculum.skills" :key="index" class="techmin-skill-item">{{ skill }}</span>
        </div>
      </section>
    </main>
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
  background: #fff;
  color: #1a1a1a;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

/* HEADER */
.techmin-header {
  width: 100%;
  background: #1a1a1a;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 32px 18px 32px;
  box-sizing: border-box;
  text-align: center;
}
.techmin-photo {
  margin-bottom: 14px;
}
.techmin-photo img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border: 2px solid #00d4ff;
  border-radius: 0;
  display: block;
  margin: 0 auto;
}
.techmin-header-info {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}
.techmin-header-info h1 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}
.techmin-title {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.95;
  font-style: italic;
}

/* CONTACT BAR */
.techmin-contact-bar {
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
.techmin-contact-item {
  color: #1a1a1a;
  font-weight: 500;
  min-width: 80px;
  text-align: center;
}

/* MAIN CONTENT */
.techmin-main {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px 32px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.techmin-section {
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
.techmin-section h2 {
  font-size: 1rem;
  font-weight: 700;
  color: #00d4ff;
  margin: 0 0 12px 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.techmin-summary {
  margin: 0;
  color: #555;
  font-size: 0.98rem;
  line-height: 1.7;
}

/* EXPERIÊNCIA */
.techmin-experience-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.techmin-experience-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 4px solid #00d4ff;
  padding-left: 12px;
}
.techmin-exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}
.techmin-exp-position {
  font-weight: 700;
  font-size: 1rem;
  color: #1a1a1a;
}
.techmin-exp-dates {
  font-size: 0.9rem;
  color: #999;
  white-space: nowrap;
}
.techmin-exp-company {
  font-size: 0.95rem;
  color: #00d4ff;
  font-weight: 600;
}
.techmin-exp-desc {
  font-size: 0.95rem;
  color: #555;
  margin: 0;
  line-height: 1.6;
}

/* EDUCAÇÃO */
.techmin-education-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.techmin-education-item {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  font-size: 0.97rem;
  color: #1a1a1a;
  align-items: center;
}
.techmin-edu-degree {
  font-weight: 700;
  color: #00d4ff;
}
.techmin-edu-institution {
  color: #666;
}
.techmin-edu-year {
  color: #999;
  font-size: 0.9rem;
}

/* STACK */
.techmin-skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}
.techmin-skill-item {
  background: #fff;
  color: #00d4ff;
  border: 1px solid #00d4ff;
  border-radius: 0;
  padding: 7px 14px;
  font-size: 0.95rem;
  font-weight: 600;
}

@media (max-width: 900px) {
  .techmin-main {
    padding: 16px 4vw;
    gap: 20px;
  }
  .techmin-section {
    padding: 16px 8px;
    gap: 8px;
  }
  .techmin-header {
    padding: 24px 8px 12px 8px;
  }
  .techmin-contact-bar {
    padding: 8px 8px;
  }
}
</style>
