<template>
  <div class="relative bg-white">
    <nav id="nav" class="sm:container sm:mx-auto px-0">
      <div class="max-w-9xl mx-auto px-4 sm:px-6">
        <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <router-link to="/">
              <span class="sr-only">Creader.io</span>
              <img class="h-8 w-auto sm:h-10" src="../../assets/images/logo.jpg" alt="Creader.io"/>
            </router-link>
          </div>
          <div class="-my-2 -mr-2 md:hidden">
            <button  class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Open menu</span>
              <component :is="MenuIcon" class="h-6 w-6" aria-hidden="true"/>
            </button >
          </div>
          <div class="hidden md:flex space-x-10">
            <router-link to="/"
                         class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
              Home
            </router-link>
            <router-link to="/"
                         class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
              Books
            </router-link>
            <router-link to="/"
                         class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
              Authors
            </router-link>
            <router-link to="/"
                         class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
              Forum
            </router-link>
          </div>
          <connect-wallet></connect-wallet>
        </div>
      </div>
    </nav>
    <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div class="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
        <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="px-5 pt-5 pb-6">
            <div class="flex items-center justify-between">
              <router-link to="/">
                <span class="sr-only">Creader.io</span>
                <img class="h-8 w-auto sm:h-10" src="../../assets/images/logo.jpg" alt="Creader.io"/>
              </router-link>
              <div class="-mr-2">
                <button  class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span class="sr-only">Close menu</span>
                  <component :is="XIcon" class="h-6 w-6" aria-hidden="true"/>
                </button>
              </div>
            </div>
          </div>
          <div class="space-y-6 py-6 px-5">
            <div class="grid grid-cols-2 gap-y-4 gap-x-8">
              <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Home</a>
              <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Books</a>
            </div>
            <div>
              <a href="#" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ConnectWallet from "../ConnectWallet.vue";
import { MenuIcon, XIcon } from "@vue-hero-icons/outline";


export default {
  name: "PageHeader",
  components: {
    ConnectWallet,
    MenuIcon,
    XIcon,
  },
  data() {
    return {};
  },
}
</script>




