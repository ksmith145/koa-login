(function() {
  new Vue({
    el: "#app",
    data() {
      return {
        email: "",
        password: "",
        message: "",
      }
    },
    template: `
    <div class="text-center">
      <div>
      <h1>Sign In</h1>
      <form id="form-login" class="form-login" v-on:submit.prevent="onSubmit">
          <input v-model="email" type="email" name="email" class="form-control" placeholder="Email Address" required autofocus>
          <input v-model="password" type="password" name="password" class="form-control" placeholder="Password" required>
          <h5 class="incorrect">{{message}}</h5>
          <button class="btn btn-lg btn-primary" type="submit">Login</button>
          </div>
          <h5 class="bottom">If you would like to make an account:</h5>
          <a href="/signup ">Sign up</a>
      </form>
    </div>`,
    methods: {
      async onSubmit() {
        try {
          const res = await fetch("/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          }).then(r => r.json())

          if (res.ok) {
            const { data: { token } } = res
            localStorage.setItem("token", token)
            return (window.location = "/homepage")
          } else {
            this.message = res.error.message
          }
        } catch (err) {
          console.err(err)
        }
      },
    },
  })
})()
