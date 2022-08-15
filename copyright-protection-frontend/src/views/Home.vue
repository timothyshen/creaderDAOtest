<template>
  <HeroSection></HeroSection>
  <CallToActionOne></CallToActionOne>
  <FeatureSectionOne></FeatureSectionOne>
  <div>
    <section class='flex flex-wrap justify-center'>
      <div class="w-1/5 mr-3 mb-4 bg-slate-100 rounded-md" v-for="cover in getCovers">
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

</template>

<script>
import {BookOpenIcon, ScaleIcon} from '@heroicons/vue/outline'

import RegisterCover from "../components/Cover/registerCover.vue";
import HeroSection from "../components/Home/HeroSection.vue";
import FeatureSectionOne from "../components/Home/FeatureSectionOne.vue";
import CallToActionOne from "../components/Home/CallToActionOne.vue";
import {mapGetters} from "vuex";

export default {
  name: "Home",
  components: {HeroSection, RegisterCover, FeatureSectionOne, CallToActionOne},
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
    handleNav(name) {
      this.$router.push({
        name: name,
      });
    },
    handleClick(id) {
      this.$router.push({
        name: 'cover',
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
