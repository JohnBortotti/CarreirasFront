<template>
  <div class="container">
    <div class="loading-background" v-if="loading == true">
      <span class="loading" v-if="loading == true"></span>
    </div>
    <div class="header">
      <img src="../assets/arrow.png" class="back" @click="$router.push('/')" />
      <h3 class="title">Atualizar vaga</h3>
    </div>
    <form class="form" @submit.prevent>
      <div class="form-row">
        <div class="form-input">
          <p class="input-label">Nome da Vaga</p>
          <input type="text" required v-model="nome" />
        </div>
        <div class="form-input">
          <p class="input-label">País</p>
          <input type="text" required v-model="pais" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-input">
          <p class="input-label">Cidade</p>
          <input type="text" required v-model="cidade" />
        </div>
        <div class="form-input">
          <p class="input-label">Estado</p>
          <input type="text" required v-model="estado" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-input">
          <p class="input-label">Departamento</p>
          <input type="text" required v-model="departamento" />
        </div>
        <div class="form-input">
          <p class="input-label">Tipo</p>
          <input type="text" required v-model="tipo" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-input">
          <p class="input-label">Descrição</p>
          <textarea required id="descricao-input" v-model="descricao" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-input">
          <p class="input-label">Remoto</p>
          <input type="checkbox" id="checkbox" v-model="remoto" />
        </div>
      </div>
      <input
        class="form-submit"
        type="submit"
        value="Atualizar Vaga"
        @click="updateJob()"
      />
    </form>
    <div class="succcess" v-if="success == true">
      Vaga atualizada com sucesso!
    </div>
    <div class="error" v-if="error == true">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      baseUrl: "http://localhost:8000/api/",
      nome: "",
      pais: "",
      cidade: "",
      estado: "",
      departamento: "",
      tipo: "",
      remoto: false,
      descricao: "",
      success: false,
      error: false,
      errorMessage: {},
      loading: false,
    };
  },
  methods: {
    verifyToken: function () {
      let token = localStorage.getItem("Jwt");
      if (!token) {
        this.$router.push("/");
      }
    },
    fetchJob: function () {
      this.loading = true;
      fetch(this.baseUrl + `job/${this.id}`)
        .then((res) => res.json())
        .then((res) => {
          this.nome = res.name;
          this.pais = res.country;
          this.cidade = res.city;
          this.estado = res.state;
          this.departamento = res.category;
          this.tipo = res.type;
          this.descricao = res.description;
          return (this.loading = false);
        });
    },
    updateJob: function () {
      (this.success = false),
        (this.error = false),
        (this.errorMessage = {}),
        (this.loading = true);

      let token = localStorage.getItem("Jwt");
      fetch(this.baseUrl + `job/${this.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.nome,
          state: this.estado,
          city: this.cidade,
          country: this.pais,
          category: this.departamento,
          type: this.tipo,
          remote: this.remoto,
          description: this.descricao,
        }),
      }).then((res) => {
        console.log(res);
        if (res.status == 204) {
          this.success = true;
        } else {
          res.json().then((res) => {
            this.error = true;
            this.errorMessage = res;
          });
        }
        return (this.loading = false);
      });
    },
  },
  mounted: function () {
    this.verifyToken();
    this.fetchJob();
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #f9f9f9;
  width: 100%;
  height: 100%;
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
  top: 95px;
  width: 25px;
}

.back:hover {
  cursor: pointer;
}

.title {
  margin-top: 20px;
}
.form {
  margin-top: 50px;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
}

.form-input {
  width: 90%;
  display: flex;
  flex-direction: column;
}

.form-input input {
  width: 90%;
  height: 30px;
  border: 1px solid rgba(150, 150, 150, 0.377);
  border-radius: 5px;
  margin-bottom: 20px;
  outline: none;
  color: gray;
  padding-left: 10px;
}

#checkbox {
  width: 5%;
  min-width: 20px;
}

#descricao-input {
  width: 100%;
  padding-bottom: 30px;
  border: 1px solid rgba(150, 150, 150, 0.377);
  outline: none;
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