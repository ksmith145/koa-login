(function() {
  new Vue({
    el: "#welcome",
    data() {
      return {
        email: "",
      }
    },
    template: `
    <div class=text-center>
      <h3>Welcome to your homepage</h3>
      <h4>{{email}}</h4>
    </div>`,
    mounted() {
      this.onLoad()
    },
    methods: {
      onLoad() {
        fetch("/data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then(res => res.json())
          .then(res => {
            if (!res.ok) {
              console.log(res)
              return location.replace("/")
            } else {
              this.email = res.data.email
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
    },
  })
})()
