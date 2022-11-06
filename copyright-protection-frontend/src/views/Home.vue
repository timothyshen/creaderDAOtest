<template>
  <HeroSection></HeroSection>
  <CallToActionOne></CallToActionOne>
  <FeatureSectionOne></FeatureSectionOne>


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
