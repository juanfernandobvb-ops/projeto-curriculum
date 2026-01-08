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
            <strong class="exp-position">{{ item.position }}</strong>
            <span class="exp-period">{{ item.startDate }} - {{ item.endDate }}</span>
          </div>
          <p class="exp-company">{{ item.company }}</p>
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
.template-classic {
  background: white;
  color: #333;
  font-family: Georgia, 'Times New Roman', serif;
  line-height: 1.6;
}

/* HEADER */
.classic-header {
  background: #2d2d2d;
  color: white;
  padding: 50px 40px;
  text-align: center;
  border-bottom: 4px solid #000;
}

.classic-header h1 {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.classic-title {
  margin: 10px 0 15px 0;
  font-size: 1rem;
  font-style: italic;
  color: #ccc;
  font-weight: 500;
}

.classic-divider {
  width: 100px;
  height: 2px;
  background: #666;
  margin: 15px auto 15px auto;
}

.classic-contact {
  font-size: 0.85rem;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  color: #bbb;
}

.classic-contact span {
  display: inline-block;
}

/* CONTENT */
.classic-content {
  padding: 50px 40px;
}

.classic-section {
  margin-bottom: 35px;
}

.classic-section h2 {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #000;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
  margin: 0 0 20px 0;
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
  justify-content: space-between;
  align-items: baseline;
  gap: 15px;
  margin-bottom: 4px;
}

.exp-position {
  font-weight: 700;
  font-size: 1rem;
  color: #000;
}

.exp-period {
  font-size: 0.85rem;
  color: #666;
  white-space: nowrap;
}

.exp-company {
  margin: 4px 0 8px 0;
  font-weight: 600;
  color: #555;
  font-size: 0.9rem;
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
  border-radius: 4px;
}

@media print {
  .template-classic {
    padding: 0;
  }

  .classic-header {
    margin: 0;
  }

  .classic-section h2 {
    page-break-after: avoid;
    break-after: avoid;
    orphans: 3;
    widows: 3;
  }

  .classic-section {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 30px;
  }

  .classic-exp,
  .classic-edu {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 25px;
    padding-bottom: 15px;
    orphans: 2;
    widows: 2;
  }
}
</style>
