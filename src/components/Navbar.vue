<template>
  <nav>
    <div class="nav-content">
      <p class="login" v-if="userName == null" @click="$router.push('/login')">
        Login
      </p>
      <p class="nav-user" v-if="userName != null">
        Olá, <strong> {{ userName }}!</strong>
      </p>
    </div>
  </nav>
</template>

<style scoped>
</style>

<script>
export default {
  name: "Navbar",
  data: function () {
    return {
      baseUrl: "http://localhost:8000/api/",
      userName: null,
    };
  },
  methods: {
    verifyLogin: async function () {
      let token = localStorage.getItem("Jwt");
      fetch(this.baseUrl + "auth/me", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.id) {
            this.userName = res.name;
          }
        });
    },
  },
  mounted: function () {
    this.verifyLogin();
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 10px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2);
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40px;
}

.nav-icon {
  width: 40px;
}

.nav-content {
  width: 80%;
  display: flex;
  justify-content: flex-end;
}

.login {
  color: #d9013e;
  font-weight: 700;
}

.login:hover {
  cursor: pointer;
}
</style>