<template>
  <div class="template-creative">
    <!-- Header com foto grande à esquerda -->
    <header class="creative-header">
      <div class="header-photo" v-if="curriculum.photo">
        <img :src="curriculum.photo" :alt="curriculum.name" class="large-photo">
      </div>
      <div class="header-info">
        <h1>{{ curriculum.name }}</h1>
        <p class="creative-title">{{ curriculum.title }}</p>
        
        <div class="quick-contact">
          <div v-if="curriculum.email" class="contact-item">
            <span class="contact-icon">📧</span>
            <span>{{ curriculum.email }}</span>
          </div>
          <div v-if="curriculum.phone" class="contact-item">
            <span class="contact-icon">📱</span>
            <span>{{ curriculum.phone }}</span>
          </div>
          <div v-if="curriculum.location" class="contact-item">
            <span class="contact-icon">📍</span>
            <span>{{ curriculum.location }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 2 Colunas: Sidebar + Conteúdo -->
    <div class="creative-layout">
      <!-- Sidebar Esquerda -->
      <aside class="creative-sidebar">
        <!-- Habilidades -->
        <section class="creative-block" v-if="curriculum.skills && curriculum.skills.length">
          <h3>HABILIDADES</h3>
          <div class="skill-list">
            <span class="skill-item" v-for="(skill, index) in curriculum.skills" :key="index">
              {{ skill }}
            </span>
          </div>
        </section>
      </aside>

      <!-- Conteúdo Principal -->
      <main class="creative-main">
        <!-- Resumo -->
        <section v-if="curriculum.summary" class="creative-section">
          <h2>SOBRE MIM</h2>
          <p>{{ curriculum.summary }}</p>
        </section>

        <!-- Experiência -->
        <section v-if="curriculum.experience && curriculum.experience.length" class="creative-section">
          <h2>EXPERIÊNCIA PROFISSIONAL</h2>
          <div class="creative-item" v-for="(item, index) in curriculum.experience" :key="index">
            <div class="item-header">
              <h3>{{ item.position }}</h3>
              <span class="item-date">{{ item.startDate }} - {{ item.endDate }}</span>
            </div>
            <p class="item-company">{{ item.company }}</p>
            <p class="item-description">{{ item.description }}</p>
          </div>
        </section>

        <!-- Educação -->
        <section v-if="curriculum.education && curriculum.education.length" class="creative-section">
          <h2>EDUCAÇÃO</h2>
          <div class="creative-item" v-for="(item, index) in curriculum.education" :key="index">
            <div class="item-header">
              <h3>{{ item.degree }}</h3>
              <span class="item-date">{{ item.graduationYear }}</span>
            </div>
            <p class="item-company">{{ item.institution }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateCreative',
  props: {
    curriculum: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.template-creative {
  background: white;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* HEADER */
.creative-header {
  background: #2b2b2b;
  color: white;
  padding: 50px 40px;
  display: flex;
  gap: 40px;
  align-items: flex-start;
  border-bottom: 4px solid #1a1a1a;
}

.header-photo {
  flex-shrink: 0;
}

.large-photo {
  width: 180px;
  height: 200px;
  object-fit: cover;
  border: 2px solid #fff;
  border-radius: 4px;
}

.header-info {
  flex: 1;
}

.header-info h1 {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  color: white;
}

.creative-title {
  margin: 10px 0 25px 0;
  font-size: 1.1rem;
  color: #ccc;
  font-weight: 500;
}

.quick-contact {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #bbb;
}

.contact-icon {
  font-size: 1rem;
}

/* LAYOUT */
.creative-layout {
  display: flex;
  gap: 30px;
  padding: 40px;
}

/* SIDEBAR */
.creative-sidebar {
  flex: 0 0 200px;
}

.creative-block {
  background: #f5f5f5;
  padding: 25px 20px;
  border-radius: 6px;
}

.creative-block h3 {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1a1a1a;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-item {
  background: white;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #555;
}

/* MAIN CONTENT */
.creative-main {
  flex: 1;
}

.creative-section {
  margin-bottom: 30px;
}

.creative-section h2 {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #1a1a1a;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #333;
}

.creative-section p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.7;
}

/* ITEMS */
.creative-item {
  background: white;
  border-left: 4px solid #2c2c2c;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.creative-item:last-child {
  margin-bottom: 0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 8px;
}

.item-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 700;
}

.item-date {
  font-size: 0.85rem;
  color: #999;
  white-space: nowrap;
}

.item-company {
  margin: 6px 0 8px 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
}

.item-description {
  margin: 10px 0 0 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 900px) {
  .creative-layout {
    flex-direction: column;
  }

  .creative-sidebar {
    flex: 1;
  }

  .creative-header {
    flex-direction: column;
    text-align: center;
  }

  .header-photo {
    margin: 0 auto;
  }

  .quick-contact {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media print {
  .template-creative {
    background: white;
  }

  .creative-item {
    box-shadow: none;
    border: 1px solid #e5e7eb;
  }
}
</style>


