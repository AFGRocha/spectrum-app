<template>
  <div class="profile">
    <navbar />
    <div v-if="!editing" class="margin">
      <div class="has-padding-top-30 has-padding-bottom-50 center">
        <h3 class="title is-4">Profile</h3>
      </div>

      <div class="has-padding-bottom-20 center">
        <img class="profilePic" v-bind:src="avatarSrc" />
        <div class="bottom-right">
          <a @click="editProfile"><i class="fas fa-cog fa-2x"></i></a>
        </div>
      </div>

      <div class="center">
        <h5 class="subtitle is-4">{{ firstName }} {{ lastName }}</h5>
      </div>

      <div class="has-padding-top-20 center">
        <i class="fas fa-phone"></i>
        <h5 class="subtitle is-4">Phone Number</h5>
        <h5 class="position is-4">{{ phone }}</h5>
      </div>

      <div class="has-padding-top-30 center">
        <i class="fas fa-envelope"></i>
        <h5 class="subtitle is-4">Email</h5>
        <h5 class="position is-4">{{ email }}</h5>
      </div>
    </div>

    <div v-if="editing" class="margin">
      <div class="has-padding-top-30 has-padding-bottom-50 center">
        <h3 class="title is-4">Profile</h3>
      </div>

      <div class="has-padding-bottom-20 center">
        <img class="profilePic" src="../assets/profile-placeholder.jpg" />
      </div>

      <div class="center is-flex-mobile">
        <input
          class="input is-rounded"
          type="text"
          name="name"
          v-model="firstName"
        />
        <input
          class="input is-rounded"
          type="text"
          name="name"
          v-model="lastName"
        />
      </div>

      <div class="has-padding-top-20 center">
        <h5 class="subtitle is-4">Phone Number</h5>
        <input
          class="input is-rounded"
          type="text"
          name="number"
          v-model="phone"
        />
      </div>

      <div class="has-padding-top-30 center">
        <h5 class="subtitle is-4">Email</h5>
        <input
          class="input is-rounded"
          type="email"
          name="email"
          v-model="email"
        />
      </div>
      <div class="has-padding-top-30 center">
        <button class="button is-spectrum_blue is-rounded" @click="saveProfile">
          Save
        </button>
        <router-link :to="{ name: 'password' }">
          <button class="button is-spectrum_blue is-rounded">
            New Password
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.margin {
  margin-left: 10%;
  margin-right: 10%;
}

.center {
  text-align: center;
}

.title {
  color: black;
}

.subtitle {
  color: black;
}

.postion {
  color: rgba(0, 0, 0, 0.35);
}

.profilePic {
  border-radius: 50%;
  height: 150px;
  width: 150px;
}
.fas {
  color: #1374f2;
}

.bottom-right {
  position: absolute;
  top: 33%;
  left: 60%;
  transform: translate(-50%, -50%);
}
</style>

<script>
// @ is an alias to /src
import navbar from "@/components/navbar.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "profile",
  components: {
    navbar
  },

  data: function() {
    return {
      editing: false,
      firstName: this.$store.state.user.name.first,
      lastName: this.$store.state.user.name.last,
      phone: this.$store.state.user.phone,
      email: this.$store.state.user.email,
      avatarSrc: ""
    };
  },

  methods: {
    editProfile() {
      this.editing = true;
    },

    saveProfile() {
      axios
        .put("https://api-spectrum.herokuapp.com/users/" + this.$store.state.user._id, {
          name: {
            first: this.firstName,
            last: this.lastName
          },
          email: this.email,
          phone: this.phone
        })
        .catch(err => {
          throw err;
        });
      this.editing = false;
    }
  },

  created() {
    console.log(this.$store.state.user);
  },
  computed:{
    ...mapState(["user"])
  },
  watch: {
    user() {
      return (this.avatarSrc =
       "https://api-spectrum.herokuapp.com/" + `files/image/${this.user.avatar}`);
    }
  }
};
</script>
