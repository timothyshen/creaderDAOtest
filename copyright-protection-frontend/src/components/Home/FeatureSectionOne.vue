<template>
  <div class="py-12 bg-white mt-6">
    <div class="max-w-7xl mx-auto px-4 mb-4 sm:px-6 lg:px-8">
      <div class="lg:text-center mb-4">
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Lets Starting Now!</p>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"></p>
      </div>

      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div v-for="feature in features" :key="feature.name" class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <component :is="feature.icon" class="h-6 w-6" aria-hidden="true"/>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ feature.name }}</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              {{ feature.description }}
            </dd>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              <button type="button"
                      @click="handleNav(feature.to.name)"
                      class="inline-block px-6 py-2.5 bg-amber-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-400 active:shadow-lg transition duration-150 ease-in-out">
                {{ feature.text }}
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>

  </div>
</template>

<script>
import {BookOpenIcon, PencilIcon} from "@heroicons/vue/outline";

export default {
  name: "FeatureSectionOne",
  data() {
    return {
      features: [
        {
          name: 'Become an author now!',
          description:
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
          icon: PencilIcon,
          text: 'Create your own book',
          to: {
            name: 'author_cover',
          },
        },
        {
          name: 'View all books',
          description:
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
          icon: BookOpenIcon,
          text: 'To the BOOKS',
          to: {
            name: 'all_cover',
          },
        },
      ],
    }
  },
  methods: {
    sliceAddress(address) {
      return address.slice(0, 6) + "...";
    },
    handleNav(name) {
      this.$router.push({
        name: name,
      });
    },
    handleClick(id) {
      this.$router.push({
        name: 'all_cover',
        params: {
          id: id,
        },
      });
    }
  },
}
</script>

<style scoped>

</style>
