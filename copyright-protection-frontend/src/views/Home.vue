<template>
  <div class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Creader</h2>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">A better way to write Your Story!</p>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Lorem ipsum dolor sit amet consect adipisicing elit.
          Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
      </div>

      <div class="mt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div v-for="feature in features" :key="feature.name" class="relative">
            <dt>
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <component :is="feature.icon" class="h-6 w-6" aria-hidden="true"/>
              </div>
              <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ feature.name }}</p>
            </dt>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              {{ feature.description }}
            </dd>
            <dd class="mt-2 ml-16 text-base text-gray-500">
              <button type="button"
                      @click="handleClick(feature.to.name)"
                      class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                {{ feature.text }}
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div>
      <section class='flex flex-wrap justify-center'>
        <el-divider class="w-3/4"></el-divider>
        <div class="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" v-for="cover in getCovers">
          <!--        <img class='w-full rounded-t-md' :key="nft.id" :src="nft.media[0].gateway">-->
          <img class='w-full rounded-t-md' :key="cover.id.toNumber()"
               src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
          <div class="p-3">
            <div class="flex mb-3">
              <div class="flex-grow">
                <h3 class="text-xl">{{ cover.title ? cover.title : "Test cover" }}</h3>
                <p>{{ sliceAddress(cover.owner) }}</p>
              </div>
              <div class="mr-2 mt-2">
                <span
                    class="px-4 py-2 rounded-full text-black bg-green-300 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                      {{ cover.status ? cover.status : "Active" }}
                    </span>
              </div>
            </div>
            <p>{{
                cover.description ? cover.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac condimentum dolor. Etiam vel venenatis lacus. Fusce erat urna, congue ac pellentesque ven"
              }}</p>
            <button type="button"
                    @click="handleClick(cover.id.toNumber())"
                    class="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Read more
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {BookOpenIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon} from '@heroicons/vue/outline'

import RegisterCover from "../components/Cover/registerCover.vue";
import {mapGetters} from "vuex";

export default {
  name: "Home",
  components: {RegisterCover},
  data() {
    return {
      features: [
        {
          name: 'Become an author now!',
          description:
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
          icon: BookOpenIcon,
          text: 'Create your own book',
          to: {
            name: 'author_cover',
          },
        },
        {
          name: 'View all books',
          description:
              'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
          icon: ScaleIcon,
          text: 'To the BOOKS',
          to: {
            name: 'books',
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters("cover", ["getCovers"])
  },
  created() {
    this.$store.dispatch("cover/getAllCover");
  },
  methods: {
    sliceAddress(address) {
      return address.slice(0, 6) + "...";
    },
    handleClick(id) {
      this.$router.push({
        name: "cover",
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
