<template>
  <div class="template-classic">
    <!-- Header -->
    <header class="classic-header">
      <h1>{{ curriculum.name }}</h1>
      <p class="classic-title">{{ curriculum.title }}</p>
      <div class="classic-divider"></div>
      <div class="classic-contact">
        <span v-if="curriculum.email">{{ curriculum.email }}</span>
        <span v-if="curriculum.phone">({{ curriculum.phone }})</span>
        <span v-if="curriculum.location">{{ curriculum.location }}</span>
        <span v-if="curriculum.age">{{ curriculum.age }} anos</span>
        <span v-if="curriculum.gender">{{ curriculum.gender }}</span>
        <span v-if="curriculum.cnh">{{ curriculum.cnh }}</span>
      </div>
    </header>

    <!-- Content -->
    <div class="classic-content">
      <section v-if="curriculum.summary" class="classic-section">
        <h2>RESUMO PROFISSIONAL</h2>
        <p>{{ curriculum.summary }}</p>
      </section>

      <section v-if="curriculum.experience && curriculum.experience.length" class="classic-section">
        <h2>EXPERIÊNCIA PROFISSIONAL</h2>
        <div class="classic-exp" v-for="(item, index) in curriculum.experience" :key="index">
          <div class="exp-row">
            <div class="exp-position">{{ item.position }}</div>
            <div class="exp-company">{{ item.company }}</div>
            <div class="exp-period">{{ item.startDate }} - {{ item.endDate }}</div>
          </div>
          <p class="exp-text">{{ item.description }}</p>
        </div>
      </section>

      <section v-if="curriculum.education && curriculum.education.length" class="classic-section">
        <h2>FORMAÇÃO ACADÊMICA</h2>
        <div class="classic-edu" v-for="(item, index) in curriculum.education" :key="index">
          <div class="edu-row">
            <strong>{{ item.degree }}</strong>
            <span class="edu-year">{{ item.graduationYear }}</span>
          </div>
          <p class="edu-institution">{{ item.institution }}</p>
        </div>
      </section>

      <section v-if="curriculum.skills && curriculum.skills.length" class="classic-section">
        <h2>COMPETÊNCIAS</h2>
        <div class="classic-skills">
          <span v-for="(skill, index) in curriculum.skills" :key="index" class="skill-badge">
            {{ skill }}
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateClassic',
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

.template-classic {
  background: white;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  
  /* Anti-quebra de palavras */
  word-break: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: none;
  -webkit-hyphens: none;
  -moz-hyphens: none;
}

/* HEADER */
.classic-header {
  background: #2d2d2d;
  color: white;
  padding: 50px 40px 25px 40px;
  text-align: center;
  border-bottom: 4px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.classic-header h1 {
  margin: 0 0 10px 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
}

.classic-title {
  margin: 0 0 15px 0;
  font-size: 1rem;
  font-style: italic;
  color: #ccc;
  font-weight: 500;
  text-align: center;
}

.classic-divider {
  width: 120px;
  height: 2px;
  background: #666;
  margin: 15px auto 18px auto;
  display: block;
  box-sizing: border-box;
}

.classic-contact {
  font-size: 0.95rem;
  display: flex;
  justify-content: center;
  gap: 22px;
  flex-wrap: wrap;
  color: #bbb;
  margin-bottom: 10px;
  text-align: center;
}

.classic-contact span {
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

/* CONTENT */
.classic-content {
  padding: 0 40px 30px 40px;
  box-sizing: border-box;
}

.classic-section {
  margin-bottom: 25px;
  box-sizing: border-box;
}

.classic-section h2 {
  font-size: 14pt;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #000;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
  margin: 0 0 20px 0;
}
.classic-section p,
.classic-section span,
.classic-section strong {
  font-size: 12pt;
}

/* EXPERIÊNCIA */
.classic-exp {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.classic-exp:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.exp-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 4px;
}

.exp-position {
  font-weight: 700;
  font-size: 12pt;
  color: #000;
}

.exp-period {
  font-size: 12pt;
  color: #666;
  white-space: nowrap;
}

.exp-company {
  margin: 4px 0 8px 0;
  font-weight: 600;
  color: #555;
  font-size: 12pt;
}

.exp-text {
  margin: 8px 0 0 0;
  font-size: 0.9rem;
  color: #444;
  line-height: 1.6;
}

/* EDUCAÇÃO */
.classic-edu {
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.classic-edu:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.edu-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 15px;
  margin-bottom: 4px;
}

.edu-row strong {
  font-weight: 700;
  color: #000;
  font-size: 0.95rem;
}

.edu-year {
  font-size: 0.85rem;
  color: #666;
  white-space: nowrap;
}

.edu-institution {
  margin: 4px 0 0 0;
  font-size: 0.9rem;
  color: #555;
}

/* COMPETÊNCIAS */
.classic-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-badge {
  background: #f0f0f0;
  border: 1px solid #d0d0d0;
  padding: 8px 14px;
  font-size: 0.85rem;
  color: #333;
  border-radius: 0;
}


</style>
