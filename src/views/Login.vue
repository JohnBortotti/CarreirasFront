<template>
  <div class="content">
    <div class="loading-background" v-if="loading == true">
      <span class="loading" v-if="loading == true"></span>
    </div>
    <div class="login-box">
      <img src="../assets/icon.png" class="icon" />
      <h3 class="title">Aquisição de talentos</h3>
      <p class="field-name">E-mail</p>
      <input type="text" class="inputField" v-model="email" required />
      <p class="field-name">Senha</p>
      <input type="text" class="inputField" v-model="password" required />
      <input
        type="submit"
        class="button"
        value="Entrar"
        @click="login(email, password)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      baseUrl: "http://localhost:8000/api/",
      email: null,
      password: null,
      loading: false,
    };
  },
  methods: {
    login: async function (email, password) {
      this.setLoading(true);
      fetch(this.baseUrl + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (!res.access_token) {
            console.log(res);
            return this.setLoading(false);
          }
          localStorage.setItem("Jwt", res.access_token);
          this.$router.push("/");
        });
    },
    setLoading: function (value) {
      this.loading = value;
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.login-box {
  margin-bottom: 100px;
  width: 23%;
  height: 28%;
  min-width: 240px;
  min-height: 350px;
  border-radius: 10px;
  box-shadow: 0 1px 16px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 20px;
}

.icon {
  width: 15%;
  margin-top: 10px;
}

.title {
  margin-top: 15px;
  margin-bottom: 20px;
}

.field-name {
  text-align: start;
  color: gray;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
}

.inputField {
  width: 96%;
  height: 35px;
  border: 1px solid rgba(150, 150, 150, 0.377);
  border-radius: 5px;
  margin-bottom: 20px;
  outline: none;
  color: gray;
}

.inputField:nth-last-child(2) {
  margin-bottom: 30px;
}

.button {
  width: 100%;
  height: 40px;
  border: none;
  color: white;
  background-color: #d9013e;
  border-radius: 5px;
  transition: 0.3s;
  outline: none;
}

.button:hover {
  cursor: pointer;
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