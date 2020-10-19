<template>
  <nav>
    <button
      class="new-job"
      v-if="userName != null"
      @click="$router.push('/job')"
    >
      + Nova Vaga
    </button>
    <div class="nav-content">
      <p class="login" v-if="userName == null" @click="$router.push('/login')">
        Login
      </p>
      <p class="nav-user" v-if="userName != null">
        Olá, <strong> {{ userName }}!</strong>
      </p>
      <img
        class="logout"
        v-if="userName != null"
        src="../assets/logout.png"
        @click="logout()"
      />
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
      componentKey: 0,
    };
  },
  methods: {
    verifyLogin: function () {
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
          if (res.id) {
            this.userName = res.name;
          }
          if (res.status == "Token is Expired") {
            localStorage.removeItem("Jwt")
          }
        });
    },
    logout: function () {
      let token = localStorage.getItem("Jwt");
      fetch(this.baseUrl + "auth/logout", {
        methood: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("Jwt");
      this.$router.push("/login");
      this.$forceUpdate();
    },
  },
  mounted: function () {
    this.verifyLogin();
  },
  updated: function () {
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

.new-job {
  background-color: white;
  color: #d9013e;
  border: 2px solid #d9013e;
  width: 100px;
  border-radius: 8px;
  padding: 5px;
  outline: none
}

.new-job:hover {
  cursor: pointer;
}

.login {
  color: #d9013e;
  font-weight: 700;
}

.login:hover {
  cursor: pointer;
}

.logout {
  width: 16px;
  margin-left: 10px;
}

.logout:hover {
  cursor: pointer;
}
 
@media screen and (max-width: 600px) {
  .new-job {
    margin-left: 30px;
    width: 115px;
  }

  .logout  {
    margin-right: 20px;
  }
}
</style>