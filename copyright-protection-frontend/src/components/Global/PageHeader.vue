<template>
  <nav id="nav" class="sm:container sm:mx-auto px-0">
    <div class="max-w-9xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <router-link to="/">
            <span class="sr-only">Workflow</span>
            <img class="h-8 w-auto sm:h-10" src="src/assets/logo.jpg" alt=""/>
          </router-link>
        </div>
        <div class="hidden md:flex space-x-10">
          <router-link to="/"
                       class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            Home
          </router-link>
          <router-link to="/team"
                       class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            Team
          </router-link>
          <router-link to="/projects"
                       class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            Projects
          </router-link>
          <router-link to="/reports"
                       class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            Reports
          </router-link>
        </div>
        <connect-wallet></connect-wallet>
      </div>
    </div>
  </nav>
</template>

<script>
import ConnectWallet from "../ConnectWallet.vue";

export default {
  name: "PageHeader",
  components: {
    ConnectWallet,
  },
  data() {
    return {};
  },
}
</script>

<style scoped>

</style>
