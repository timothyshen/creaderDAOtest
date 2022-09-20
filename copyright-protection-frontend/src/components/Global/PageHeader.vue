<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Popover class="relative bg-white z-40">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto sm:h-10" src="../../assets/images/logo.jpg" alt="" />
          </a>
        </div>
        <div class="-my-2 -mr-2 md:hidden">
          <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open menu</span>
            <menu-icon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup class="hidden md:flex space-x-10">
          <router-link to="/"
                       class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            Home
          </router-link>
          <router-link :to="{ name : 'all_cover' }"
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
        </PopoverGroup>
        <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <connect-wallet></connect-wallet>
        </div>
      </div>
    </div>

    <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <PopoverPanel focus class="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
        <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="px-5 pt-5 pb-6">
            <div class="flex items-center justify-between">
              <div>
                <img class="h-8 w-auto" src="../../assets/images/logo.jpg" alt="Your Company" />
              </div>
              <div class="-mr-2">
                <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <nav class="grid gap-y-8">
              <router-link to="/"
                           class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                <span class="ml-3 text-base font-medium text-gray-900">Home</span>
              </router-link>
              <router-link to="/"
                           class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                <span class="ml-3 text-base font-medium text-gray-900">Books</span>
              </router-link>
              <router-link to="/"
                           class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                <span class="ml-3 text-base font-medium text-gray-900">Authors</span>
              </router-link>
              <router-link to="/"
                           class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                <span class="ml-3 text-base font-medium text-gray-900">Forum</span>
              </router-link>
            </nav>
            <div class="space-y-6 py-6 px-5">
                <connect-wallet></connect-wallet>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import ConnectWallet from '../ConnectWallet.vue'
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import {
  MenuIcon,
  XIcon
} from '@heroicons/vue/outline'
 export default {
   components: {
     Popover,
     PopoverButton,
     PopoverGroup,
     PopoverPanel,
     MenuIcon,
     XIcon,
     ConnectWallet
   }
 }


</script>
