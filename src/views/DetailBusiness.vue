<template>
  <div>
    <h1 class="mx-5">Detail Business Page</h1>
    <v-card class="mx-5">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
      </template>

      <v-img cover height="250" :src="businesses.image_url"></v-img>

      <v-card-item>
        <v-card-title>{{businesses.name}}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">Local Favorite</span>

          <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating :model-value="businesses.rating" color="amber" density="compact" half-increments readonly size="small"></v-rating>

          <div class="text-grey ms-4">
            {{businesses.rating}} ({{businesses.review_count}})
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">
          {{ businesses.price }} • 
          <v-chip class="mr-1" v-for="category in businesses.categories" :key="category">{{ category.title }}</v-chip>
          <!-- {{ businesses.categories ? getCategories(businesses.categories) : '' }} -->
        </div>

        <div> {{ businesses.location ? getAddress(businesses.location) : '' }}</div>
      </v-card-text>

      <v-card-title>Photos</v-card-title>
      <v-card-text>
        <v-carousel 
        cycle
        height="400"
        hide-delimiter-background
        show-arrows="hover">
          <!-- Iterate over business.photos using v-for -->
          <v-carousel-item v-for="(photo, index) in businesses.photos" :key="index" :src="photo" cover></v-carousel-item>
        </v-carousel>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange-lighten-2"
          variant="text"
        >
        Review
        </v-btn>
  
        <v-spacer></v-spacer>
  
        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
  
          <v-card-text>
            <div class="font-weight-bold ms-1 mb-2">
              Reviews
            </div>
  
            <v-timeline density="compact" align="start">
              <v-timeline-item
                v-for="review in reviews.reviews"
                :key="review.time_created"
                size="x-small"
              >
                <div class="mb-4">
                  <div class="font-weight-normal">
                    <strong>{{ review.user.name }}</strong> @{{ review.time_created }}
                  </div>
                  <div>{{ review.text }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import YelpService from '@/services/YelpService';

export default defineComponent({
  data() {
    return {
      businesses: {} as any, // Define the type of businesses array
      reviews: {} as any, // Define the type of businesses array
      show: false,
    };
  },
  mounted() {
    this.getBusinessDetail();
    this.getBusinessReviews();
  },
  methods: {
    async getBusinessDetail() {
      try {
        const businessId = this.$route.params.id;
        const response = await YelpService.getBusinessDetail(businessId);
        
        this.businesses = response;
      } catch (error) {
        console.error('Error fetching business detail:', error);
      }
    },
    async getBusinessReviews() {
      try {
        const businessId = this.$route.params.id;
        const response = await YelpService.getBusinessReviews(businessId);
        
        this.reviews = response;
      } catch (error) {
        console.error('Error fetching business detail:', error);
      }
    },
    getCategories(categories) {
      const titles = categories.map(category => category.title);
      const result = titles.join(', ');
      return result;
    },
    getAddress(location) {
      const address = location.display_address.join(', ');
      return address;
    }
    
  }
});
</script>

<style scoped>
/* Add your page styling here */
</style>
