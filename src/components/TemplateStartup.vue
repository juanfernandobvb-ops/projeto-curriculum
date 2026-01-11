<template>
  <div class="template-startup">
    <!-- Hero Section -->
    <header class="startup-hero">
      <div class="hero-content">
        <div v-if="curriculum.photo" class="hero-photo">
          <img :src="curriculum.photo" :alt="curriculum.name">
        </div>
        <div class="hero-text">
          <h1>{{ curriculum.name }}</h1>
          <p class="hero-title">{{ curriculum.title }}</p>
          <div class="hero-contact">
            <span>{{ curriculum.email }}</span>
            <span>•</span>
            <span>{{ curriculum.phone }}</span>
            <span>•</span>
            <span>{{ curriculum.location }}</span>
            <span v-if="curriculum.age">•</span>
            <span v-if="curriculum.age">{{ curriculum.age }} anos</span>
            <span v-if="curriculum.gender">•</span>
            <span v-if="curriculum.gender">{{ curriculum.gender }}</span>
            <span v-if="curriculum.cnh">•</span>
            <span v-if="curriculum.cnh">{{ curriculum.cnh }}</span>
          </div>
        </div>
      </div>
      <div class="hero-accent"></div>
    </header>

    <!-- About -->
    <section v-if="curriculum.summary" class="startup-section">
      <p class="about-text">{{ curriculum.summary }}</p>
    </section>

    <div class="startup-grid">
      <!-- Experiência -->
      <section v-if="curriculum.experience && curriculum.experience.length" class="startup-section col-2">
        <h2>Experiência</h2>
        <div class="exp-list">
          <div v-for="(item, index) in curriculum.experience" :key="index" class="exp-item">
            <div class="exp-marker"></div>
            <div class="exp-content">
              <h3>{{ item.position }}</h3>
              <p class="exp-company">{{ item.company }}</p>
              <p class="exp-dates">{{ item.startDate }} — {{ item.endDate }}</p>
              <p class="exp-text">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Educação -->
      <section v-if="curriculum.education && curriculum.education.length" class="startup-section">
        <h2>Educação</h2>
        <div v-for="(item, index) in curriculum.education" :key="index" class="edu-box">
          <h3>{{ item.degree }}</h3>
          <p>{{ item.institution }}</p>
          <p class="edu-year">{{ item.graduationYear }}</p>
        </div>
      </section>

      <!-- Skills -->
      <section v-if="curriculum.skills && curriculum.skills.length" class="startup-section">
        <h2>Habilidades</h2>
        <div class="skills-cloud">
          <span v-for="(skill, index) in curriculum.skills" :key="index" class="skill-tag">
            {{ skill }}
          </span>
        </div>
      </section>
    </div>
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
.template-startup {
  background: #fafbfc;
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

/* HERO */
.startup-hero {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%);
  color: white;
  padding: 50px 40px 30px 40px;
  position: relative;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-accent {
  position: absolute;
  right: 0;
  top: 0;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  text-align: center;
}

.hero-photo {
  flex: 0 0 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-photo img {
  width: 120px;
  height: 120px;
  border-radius: 0;
  border: 3px solid white;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

.hero-text {
  flex: 1;
  min-width: 200px;
  text-align: center;
}

.hero-text h1 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: center;
}

.hero-title {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  opacity: 0.95;
  font-weight: 600;
  text-align: center;
}

.hero-contact {
  font-size: 0.95rem;
  opacity: 0.9;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
}

/* SECTIONS */
.startup-section {
  padding: 30px 40px;
  box-sizing: border-box;
  margin: 0 auto 0 auto;
  max-width: 900px;
}

.startup-section:last-child {
  border-bottom: none;
}

.startup-section h2 {
  margin: 0 0 20px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  position: relative;
  padding-bottom: 12px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.startup-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b 0%, #c44569 100%);
  border-radius: 2px;
}

.about-text {
  margin: 0;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.8;
  max-width: 900px;
}

/* GRID */
.startup-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.col-2 {
  grid-column: 1 / -1;
}

/* EXPERIÊNCIA */
.exp-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.exp-item {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.exp-marker {
  flex: 0 0 12px;
  width: 12px;
  height: 12px;
  border-radius: 0;
  background: linear-gradient(135deg, #ff6b6b 0%, #c44569 100%);
  margin-top: 5px;
  flex-shrink: 0;
}

.exp-content {
  flex: 1;
  min-width: 0;
}

.exp-content h3 {
  margin: 0 0 4px 0;
  font-size: 0.95rem;
  color: #1a1a1a;
  font-weight: 700;
}

.exp-company {
  margin: 0 0 4px 0;
  font-size: 0.85rem;
  color: #ff6b6b;
  font-weight: 600;
}

.exp-dates {
  margin: 0 0 8px 0;
  font-size: 0.8rem;
  color: #999;
}

.exp-text {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
}

/* EDUCAÇÃO */
.edu-box {
  background: white;
  padding: 15px;
  border-radius: 0;
  margin-bottom: 12px;
  border: 1px solid #e5e7eb;
  box-sizing: border-box;
}

.edu-box h3 {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  color: #1a1a1a;
  font-weight: 700;
}

.edu-box p {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
}

.edu-year {
  margin-top: 4px;
  font-size: 0.8rem;
  color: #999;
}

/* SKILLS */
.skills-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.skill-tag {
  background: white;
  color: #ff6b6b;
  padding: 8px 14px;
  border-radius: 0;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid #ff6b6b;
  transition: all 0.2s;
}

.skill-tag:hover {
  background: #ff6b6b;
  color: white;
}

@media (max-width: 900px) {
  .startup-grid {
    grid-template-columns: 1fr;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .startup-hero {
    padding: 40px 20px 20px 20px;
  }

  .startup-section {
    padding: 20px 10px;
  }
}

</style>
