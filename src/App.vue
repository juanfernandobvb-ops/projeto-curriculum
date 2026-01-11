<template>
  <div id="app">
    <MainVue />
  </div>
</template>

<script>
import MainVue from './views/MainVue.vue'

export default {
  name: 'App',
  components: {
    MainVue
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
}

#app {
  width: 100%;
  min-height: 100vh;
}

@media print {
  html, body, #app {
    font-size: 12pt !important;
    background: #fff !important;
    color: #000 !important;
  }
  h1, h2, h3, .section-title, .minimal-section h2, .classic-section h2, .creative-section h2, .tech-section h2, .techmin-section h2, .dev-section h2, .startup-section h2, .section-header h2 {
    font-size: 14pt !important;
    font-weight: 700 !important;
    color: #000 !important;
    margin-bottom: 14px !important;
  }
  p, span, li, .exp-position, .exp-company, .exp-period, .org-name, .date-range, .item-desc, .exp-header, .exp-title-row, .timeline-body, .item-header {
    font-size: 12pt !important;
    color: #000 !important;
  }
  /* Remove box-shadows, backgrounds e bordas coloridas que não imprimem bem */
  * {
    box-shadow: none !important;
    background: transparent !important;
    color-adjust: exact !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
