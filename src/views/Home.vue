<template>
  <div class="container">
    <div class="content">
      <div class="title-row">
        <div class="title">Vagas de emprego</div>
        <div class="counter">{{ this.jobs.length }} vagas de emprego</div>
      </div>

      <div class="search-row">
        <input
          type="text"
          id="searchInput"
          v-model="searchValue"
          placeholder="Buscar vagas de emprego..."
          @keyup.enter="searchJobs(filter, searchValue)"
        />

        <select name="filter" id="filter" v-model="filter">
          <option value="name">Nome</option>
          <option value="city">Cidade</option>
          <option value="state">Estado</option>
          <option value="country">Pais</option>
          <option value="category">Categoria</option>
          <option value="type">Tipo</option>
          <option value="remote">Remoto</option>
        </select>
      </div>
      <h1
        v-if="jobs.length == 0 && noResults == false"
        class="loading-jobs"
      ></h1>
      <h4 v-if="noResults" class="no-results">
        Não foram encontrados resultados.
      </h4>
      <div
        class="job-card-wrapper"
        v-for="job in jobs"
        :key="job.id"
        v-bind:id="job.id"
      >
        <div class="job-card">
          <div class="job-card-time">
            {{ `Publicado há ${getRelativeTime(job.created_at)} dia(s)` }}
          </div>
          <div class="job-card-title">{{ job.name }}</div>
          <div class="job-card-desc">
            {{ job.category }} - {{ job.city }}, {{ job.state }},
            {{ job.country }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      baseUrl: "http://localhost:8000/api/",
      jobs: [],
      searchValue: null,
      filter: "name",
      noResults: false,
    };
  },
  methods: {
    fetchJobs: async function () {
      fetch(this.baseUrl + "job")
        .then((res) => res.json())
        .then((res) => (this.jobs = res));
    },
    searchJobs: async function (filter, value) {
      this.noResults = false;
      if (value.length == 0) this.fetchJobs();
      this.jobs = [];
      fetch(this.baseUrl + `job/search/${filter}/${value}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.length == 0) {
            this.noResults = true;
          }
          return (this.jobs = res);
        });
    },
    getRelativeTime: function (created_at) {
      let today = new Date();
      let createdAt = new Date(created_at);
      let msInDay = 24 * 60 * 60 * 1000;

      createdAt.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      var diff = (+today - +createdAt) / msInDay;
      return diff;
    },
  },
  mounted: function () {
    this.fetchJobs();
  },
};
</script>

<style scoped>
.container {
  background-color: #f9f9f9;
  width: 100%;
  height: 100%;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
}

.title-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.title {
  font-weight: 700;
  color: #061c39;
  font-size: 20px;
  align-self: start;
}

.counter {
  color: #7a869f;
}

.search-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}

#searchInput {
  height: 50px;
  width: 60%;
  border: 1px solid #d9e3ea;
  color: #7a869f;
  border-radius: 8px;
  padding-left: 40px;
  background-image: url("../assets/search.png");
  background-size: 15px;
  background-repeat: no-repeat;
  background-position: 15px;
}

#searchInput::placeholder {
  color: #7a869f;
}

#searchInput:focus {
  outline: none;
  border: 1px solid #c1d4e2;
}

#filter {
  height: 50px;
  width: 25%;
  border: 1px solid #d9e3ea;
  color: #7a869f;
  border-radius: 8px;
  padding-left: 10px;
}

#filter:focus {
  outline: none;
  border: 1px solid #c1d4e2;
}

.loading-jobs {
  display: flex;
  margin-top: 100px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #7a869f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spinLoader 2s linear infinite;
}

.no-results {
  color: #7a869f;
}

.job-card-wrapper {
  width: 100%;
}

.job-card {
  background-color: white;
  width: 100%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.15);
  height: 120px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: 0.3s;
  margin-bottom: 25px;
  animation: 1s slideFromLeft;
}

.job-card:hover {
  cursor: pointer;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.job-card-time {
  color: #767f88;
  font-size: 14px;
  margin: 15px;
}

.job-card-title {
  color: #d9013e;
  font-weight: 700;
  font-size: 20px;
  margin-left: 15px;
  margin-bottom: 15px;
}

.job-card-desc {
  color: #767f88;
  margin-left: 15px;
  font-size: 14px;
}

@keyframes slideFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-2%);
  }

  100% {
    opacity: 1;
  }
}

@keyframes spinLoader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 420px) {
  .title {
    font-size: 16px;
  }

  .counter {
    font-size: 12px;
  }

  .content {
    width: 90%;
  }

  .job-card {
    height: 100px;
  }

  .job-card-title {
    font-size: 16px;
  }

  .job-card-time {
    font-size: 12px;
  }

  .job-card-desc {
    font-size: 12px;
  }
}

@media screen and (max-width: 290px) {
  .title  {
    font-size: 14px;
  }

  .counter {
    font-size: 10px;
  }

  #searchInput {
    font-size: 12px;
    height: 40px;
    width: 50%;
  }

  #filter {
    font-size: 12px;
    height: 40px;
    width: 30%;
  }

  .search-row {
    margin-bottom: 15px;
  }

  .job-card-title {
    font-size: 12px;
  }
}
</style>