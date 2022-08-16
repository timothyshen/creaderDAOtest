<template>
  <div class="relative bg-white overflow-hidden mt-3">
    <div class="max-w-7xl mx-auto">
      <div class="relative z-10 mb-20 bg-amber-50/90 rounded-2xl lg:max-w-2xl lg:w-full">
        <main class="mt-10 p-5 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left">
            <h1 class="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
              <span class="block xl:inline">NFTs ecosystem for</span>
              {{ ' ' }}
              <span class="block text-orange-400 xl:inline"> creators</span>
            </h1>
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Providing an all-in-one platform for authors to show off writing skills. Apply blockchain technology to
              help creators protect and leverage the copyright's value.
            </p>
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <a href="https://irp.cdn-website.com/6b0ab629/files/uploaded/Creader%20whitepaper.pdf"
                   class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-500 hover:bg-orange-200 hover:text-black md:py-4 md:text-lg md:px-10">
                  <font-awesome-icon class="mr-2" icon="fa-solid fa-book" />
                  Whitepaper </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a href="#"
                   class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 md:py-4 md:text-lg md:px-10">
                  Lets start! </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
           src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
           alt=""/>
    </div>
  </div>

</template>

<script>
export default {
  name: "HeroSection"
}
</script>

<style scoped>

</style>
