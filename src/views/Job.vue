<template>
  <div class="container">
    <div class="loading-background" v-if="job.name == null || loading == true">
      <span class="loading" v-if="job.name == null || loading == true"></span>
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
    <div v-if="controller == 'candidatar'" class="content">
      <form class="form" @submit.prevent>
        <h3 class="form-title">Informações pessoais</h3>
        <div class="form-row">
          <div class="form-input">
            <p class="input-label">Nome</p>
            <input type="text" required v-model="application.nome" />
          </div>
          <div class="form-input">
            <p class="input-label">Sobrenome</p>
            <input type="text" required v-model="application.sobrenome" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-input">
            <p class="input-label">E-mail</p>
            <input type="text" required v-model="application.email" />
          </div>
          <div class="form-input">
            <p class="input-label">Telefone</p>
            <input type="text" required v-model="application.telefone" />
          </div>
        </div>
        <label class="input-label">Currículo</label>
        <input type="file" required @change="handleFileChange" />
        <input
          class="form-submit"
          type="submit"
          value="Enviar minha candidatura"
          @click="postApplication()"
        />
        <div class="succcess" v-if="success == true">
          Candidatura enviada com sucesso!
        </div>
        <div class="error" v-if="error == true">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      baseUrl: "http://localhost:8000/api/",
      job: {
        name: null,
      },
      application: {
        nome: null,
        sobrenome: null,
        email: null,
        telefone: null,
        curriculo: null,
      },
      controller: "detalhes",
      success: false,
      error: false,
      errorMessage: {},
      loading: false,
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
    postApplication: function () {
      this.success = false;
      this.error = false;
      this.errorMessage = {};

      this.loading = true;

      let token = localStorage.getItem("Jwt");
      let data = new FormData();

      data.append("name", this.application.nome);
      data.append("surname", this.application.sobrenome);
      data.append("email", this.application.email);
      data.append("phone", this.application.telefone);
      data.append("cv", this.application.curriculo);
      data.append("job_id", this.job.id);

      fetch(this.baseUrl + "application", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.created_at) {
            this.error = true;
            this.errorMessage = res;
          } else {
            this.success = true;
          }
          return (this.loading = false);
        });
    },
    handleFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.application.curriculo = files[0];
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
  width: 50%;
  margin-top: 50px;
  color: gray;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
}

.form-title {
  text-align: start;
  font-weight: 400;
  width: 100%;
  border-bottom: 1px solid rgba(168, 167, 167, 0.438);
  padding-bottom: 5px;
  margin-bottom: 40px;
}

.form-input {
  width: 45%;
  display: flex;
  flex-direction: column;
}

.form-input input {
  width: 95%;
  height: 30px;
  border: 1px solid rgba(150, 150, 150, 0.377);
  border-radius: 5px;
  margin-bottom: 20px;
  outline: none;
  color: gray;
  padding-left: 10px;
}

.input-label {
  text-align: start;
  margin-bottom: 5px;
}

.form-submit {
  background-color: #d9013e;
  color: white;
  border: none;
  margin-top: 25px;
  height: 50px;
  border-radius: 10px;
  outline: none;
  font-size: 16px;
}

.form-submit:hover {
  cursor: pointer;
}

.succcess {
  color: rgb(4, 143, 4);
  margin-top: 30px;
  font-weight: 600;
}
.error {
  color: red;
  margin-top: 30px;
  font-weight: 600;
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

@media screen and (max-width: 850px) {
  .controllers-content {
    width: 40%;
  }
}

@media screen and (max-width: 550px) {
  .back {
    width: 15px;
    margin-left: -10px;
  }

  .job-title {
    font-size: 14px;
  }

  .controllers-content {
    font-size: 12px;
    width: 80%;
  }

  .content {
    width: 90%;
  }

  .form-row {
    flex-direction: column;
    width: 90%;
  }

  .form-input {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .form-row input {
    width: 100%;
  }

  .form-submit {
    margin-bottom: 30px;
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
</style>