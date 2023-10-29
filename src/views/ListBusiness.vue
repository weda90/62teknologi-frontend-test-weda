<template>
  <div>
    <div v-if="businesses">
      <v-card>
        <v-card-title>
          Search
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="businesses" :search="search"
          item-value="id" class="elevation-1">
          <template v-slot:item.name="{ item }">
            <a :href="getBusinessUrl(item.id)">{{ item.name }}</a>
          </template>
          <template v-slot:item.location="{ value }">
            <v-chip>
              {{ getLocation(value) }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import YelpService from '@/services/YelpService';
import { VDataTable } from 'vuetify/labs/VDataTable'

export default defineComponent({
  components: {
    VDataTable,
  },
  data() {
    return {
      search: '',
      businesses: [] as any[], // Define the type of businesses array
      itemsPerPage: 10,
      headers: [
        {
          title: 'Business Name',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Price', align: 'start', key: 'price' },
        { title: 'Review', align: 'end', key: 'review_count' },
        { title: 'Location', align: 'start', key: 'location' },
      ],
    };
  },
  mounted() {
    this.fetchBusinesses();
  },
  methods: {
    async fetchBusinesses() {
      try {
        const searchLocation = 'NYC';
        const response = await YelpService.getBusinesses(searchLocation);

        this.businesses = response.businesses;
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    },
    getBusinessUrl(id) {
      return `/detail/${id}`;
    },
    getLocation(location) {
      const address = location.display_address.join(', ');
      return address;
    }
  },
});
</script>
