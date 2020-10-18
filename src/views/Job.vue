<template>
  <div class="container">
    <div class="loading-background" v-if="job.name == null">
      <span class="loading" v-if="job.name == null"></span>
    </div>
    <div class="header">
      <img src="../assets/arrow.png" class="back" @click="$router.push('/')" />
      <h3 class="job-title">{{ job.name }}</h3>
      <p class="job-desc">
        {{ job.category }} &bull; {{ job.city }} &bull; {{ job.state }} &bull;
        {{ job.country }} &bull; {{ job.type }} 
        <remoto v-if="job.remote == true"> &bull; Remoto </remoto>
      </p>
    </div>
    <div class="controllers">
      <div class="controllers-content">
        <p
          @click="setController('detalhes')"
          v-bind:class="{ active: controller == 'detalhes' }"
        >
          Detalhes da Vaga
        </p>
        <p
          @click="setController('candidatar')"
          v-bind:class="{ active: controller == 'candidatar' }"
        >
          Candidatar-se
        </p>
      </div>
    </div>
    <div v-if="controller == 'detalhes'" class="content">
      {{ job.description }}
    </div>
    <div v-if="controller == 'candidatar'" class="content">candidatar</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      baseUrl: "http://localhost:8000/api/",
      job: {
        name: null
      },
      controller: "detalhes",
    };
  },
  methods: {
    fetchJob: function () {
      fetch(this.baseUrl + "job/" + this.id, {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => (this.job = res));
    },
    setController: function (value) {
      this.controller = value;
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  mounted: function () {
    this.fetchJob();
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

.header {
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(163, 163, 163, 0.473);
}

.back {
  color: #d9013e;
  position: absolute;
  left: 10%;
  width: 25px;
}

.back:hover {
  cursor: pointer;
}

.job-title {
  margin-bottom: 10px;
}

.job-desc {
  color: gray;
  font-size: 14px;
}

.controllers {
  width: 100%;
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.2);
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
}

.controllers-content {
  display: flex;
  justify-content: space-between;
  width: 20%;
  margin-top: 20px;
  color: gray;
  font-size: 14px;
  font-weight: bold;
}

.controllers-content:hover {
  cursor: pointer;
}

.active {
  color: #d9013e;
  transition: 0.3s;
}

.content {
  margin-top: 50px;
  color: gray;
}

.loading {
  display: flex;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #7a869f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spinLoader 2s linear infinite;
}

.loading-background {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes spinLoader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>