(function() {
  new Vue({
    el: "#app",
    data() {
      return {
        email: "",
        password1: "",
        password2: "",
        emailMessage: "",
        passwordMessage: "",
        emailValid: "",
        passwordValid: "",
      }
    },
    template: `
    <div class="text-center">
        <div>
        <h1 class="heading">Please enter the information in the fields below:</h1>
        <form id="form-signUp" class="form-signUp" @submit.prevent="onSubmit">
            <input v-model="email" type="email" name="email" class="form-control" 
            v-bind:class="emailValid" placeholder="Email Address" required autofocus>
          <h5 class="incorrect">{{emailMessage}}</h5>
            <input v-model="password1" type="password" name="password1" class="form-control" 
            v-bind:class="passwordValid" placeholder="Password" required>
            <input v-model="password2" type="password" name="password2" class="form-control" 
            v-bind:class="passwordValid" placeholder="Confirm Password" required>
          <h5 class="incorrect">{{passwordMessage}}</h5>
          <button class="btn btn-lg btn-primary" type="submit">Sign Up</button>
          </div>
          <h5 class="bottom">If you already have an account please login <a href="/">here.</a></h5>
        </form>
    </div>`,
    methods: {
      async onSubmit() {
        try {
          this.email = this.email.trim().toLowerCase()
          this.password1 = this.password1.trim()
          this.password2 = this.password2.trim()

          if (this.password1 !== this.password2) {
            this.passwordMessage = "Passwords must match."
            this.passwordValid = "is-invalid"
          } else {
            const res = await fetch("/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                email: this.email,
                password: this.password1,
              }),
            }).then(r => r.json())

            if (res.ok) {
              const { data: { token } } = res
              localStorage.setItem("token", token)
              return (window.location = "/homepage")
            } else {
              this.emailMessage = res.error.props.email
              this.emailValid = "is-invalid"
            }
          }
        } catch (err) {
          console.error(err)
        }
      },
    },
  })
})()
