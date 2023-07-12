<template>
  <div class="villa-display">
    <h1 class="villa-title">Display Villas</h1>
    <div class="filter-container">
      <label for="date">Select Date:</label>
      <input type="date" id="date" v-model="selectedDate" @change="filterVillasByDate" />
    </div>
    <div class="sort-container">
      <label for="sort">Sort By:</label>
      <select id="sort" v-model="sortBy" @change="filterVillasByDate">
        <option value="location">Location</option>
        <option value="price">Price</option>
        <option value="capacity">Capacity</option>
      </select>
    </div>
    <ul class="villa-list">
      <li v-for="villa in displayedVillas" :key="villa.id" class="villa-item">
        <div class="villa-thumbnail">
          <img :src="villa.thumbnail" alt="Villa Thumbnail" />
        </div>
        <div class="villa-details">
          <h3 class="villa-location">{{ villa.location }}</h3>
          <p class="villa-price">Price: {{ villa.price }}</p>
          <p class="villa-capacity">Capacity: {{ villa.capacity }}</p>
          <p class="villa-facilities">Facilities: {{ villa.facilities }}</p>
          <div class="villa-buttons">
            <button v-if="!villa.booked" @click="openConfirmationModal(villa)" class="villa-book-button">Book</button>
            <button v-else class="villa-status villa-status-booked">Booked</button>
            <button @click.stop="goToVillaDetail(villa)" class="villa-detail-button">Detail</button>
          </div>
        </div>
      </li>
    </ul>
    <button v-if="showLoadMoreButton" @click="loadMoreVillas" class="load-more-button">Load More</button>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmationModal" class="modal-overlay">
      <div class="modal">
        <h3>Confirm Booking</h3>
        <p>Are you sure you want to book this villa?</p>
        <div class="modal-buttons">
          <button @click="confirmBooking" class="modal-button confirm-button">Confirm</button>
          <button @click="closeConfirmationModal" class="modal-button cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DisplayVillas',
  data() {
    return {
      selectedDate: new Date().toISOString().slice(0, 10), // Default selected date is current date
      sortBy: 'location',
      villas: [
        {
          id: 1,
          thumbnail: require('@/assets/image1.jpg'),
          location: 'Karachi',
          price: '$1000',
          capacity: '6 guests',
          facilities: 'Swimming Pool, BBQ Area',
          date: '2023-07-08', // Villa availability date
          booked: false, // Booking status
        },
        {
          id: 2,
          thumbnail: require('@/assets/image2.jpg'),
          location: 'Islamabad',
          price: '$1500',
          capacity: '8 guests',
          facilities: 'Private Beach, Gym, Game Room',
          date: '2023-07-08', // Villa availability date
          booked: false, // Booking status
        },
        {
          id: 2,
          thumbnail: require('@/assets/image2.jpg'),
          location: 'Islamabad',
          price: '$1500',
          capacity: '8 guests',
          facilities: 'Private Beach, Gym, Game Room',
          date: '2023-07-08', // Villa availability date
          booked: false, // Booking status
        },
        {
          id: 3,
          thumbnail: require('@/assets/image2.jpg'),
          location: 'Lahore',
          price: '$1500',
          capacity: '8 guests',
          facilities: 'Private Beach, Gym, Game Room',
          date: '2023-07-08', // Villa availability date
          booked: false, // Booking status
        },
        {
          id: 4,
          thumbnail: require('@/assets/image2.jpg'),
          location: 'Abu Dhabi',
          price: '$1500',
          capacity: '8 guests',
          facilities: 'Private Beach, Gym, Game Room',
          date: '2023-07-09', // Villa availability date
          booked: false, // Booking status
        },
        {
          id: 5,
          thumbnail: require('@/assets/image2.jpg'),
          location: 'Berlin',
          price: '$1500',
          capacity: '8 guests',
          facilities: 'Private Beach, Gym, Game Room',
          date: '2023-07-10', // Villa availability date
          booked: false, // Booking status
        },
        {
          id: 6,
          thumbnail: require('@/assets/image2.jpg'),
          location: 'Paris',
          price: '$1500',
          capacity: '8 guests',
          facilities: 'Private Beach, Gym, Game Room',
          date: '2023-07-10', // Villa availability date
          booked: false, // Booking status
        },
        {
          id: 7,
          thumbnail: require('@/assets/image2.jpg'),
          location: 'Delhi',
          price: '$1500',
          capacity: '8 guests',
          facilities: 'Private Beach, Gym, Game Room',
          date: '2023-07-10', // Villa availability date
          booked: false, // Booking status
        },
        {
          id: 8,
          thumbnail: require('@/assets/image2.jpg'),
          location: 'Gujranwala',
          price: '$1500',
          capacity: '8 guests',
          facilities: 'Private Beach, Gym, Game Room',
          date: '2023-07-10', // Villa availability date
          booked: false, // Booking status
        },
        {
          id: 9,
          thumbnail: require('@/assets/image2.jpg'),
          location: 'London',
          price: '$1500',
          capacity: '8 guests',
          facilities: 'Private Beach, Gym, Game Room',
          date: '2023-07-10', // Villa availability date
          booked: false, // Booking status
        },
        {
          id: 10,
          thumbnail: require('@/assets/image2.jpg'),
          location: 'Rome',
          price: '$1500',
          capacity: '8 guests',
          facilities: 'Private Beach, Gym, Game Room',
          date: '2023-07-10', // Villa availability date
          booked: false, // Booking status
        },
      ],

      visibleVillasCount: 3, // Number of villas to display initially
      showConfirmationModal: false, // Flag to control the visibility of the confirmation modal
      selectedVilla: null, // Villa selected for booking
    };
  },
  computed: {
    showLoadMoreButton() {
      return this.visibleVillasCount < this.filteredVillas.length;
    },
    filteredVillas() {
      const selectedDate = new Date(this.selectedDate).toISOString().slice(0, 10);
      const sortedVillas = this.villas.filter((villa) => villa.date === selectedDate);
      sortedVillas.sort((a, b) => {
        if (a[this.sortBy] < b[this.sortBy]) return -1;
        if (a[this.sortBy] > b[this.sortBy]) return 1;
        return 0;
      });
      return sortedVillas;
    },
    displayedVillas() {
      return this.filteredVillas.slice(0, this.visibleVillasCount);
    },
  },
  methods: {
    filterVillasByDate() {
      this.visibleVillasCount = 3; // Reset the number of visible villas when filtering
    },
    loadMoreVillas() {
      this.visibleVillasCount += 3; // Increase the number of visible villas
    },
    openConfirmationModal(villa) {
      this.selectedVilla = villa;
      this.showConfirmationModal = true;
    },
    closeConfirmationModal() {
      this.selectedVilla = null;
      this.showConfirmationModal = false;
    },
    goToVillaDetail(villa) {
      // Navigate to villa detail screen
      this.$router.push(`/villa/${villa.id}`);
    },
    confirmBooking() {
      if (this.selectedVilla) {
        // Perform booking logic
        const index = this.villas.findIndex((villa) => villa.id === this.selectedVilla.id);
        if (index !== -1) {
          this.villas[index].booked = true; // Update the booking status
        }
        this.closeConfirmationModal();
      }
    },
  },
  mounted() {
    this.filterVillasByDate(); // Initial filtering by selected date
  },
};
</script>

<style scoped>
.villa-display {
  padding: 20px;
}

.villa-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
}

.filter-container,
.sort-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.filter-container label,
.sort-container label {
  margin-right: 10px;
}

#date,
#sort {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.villa-list {
  list-style-type: none;
  padding: 0;
}

.villa-item {
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #f5f5f5;
  cursor: pointer;
}

.villa-thumbnail img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 4px;
}

.villa-details {
  flex-grow: 1;
}

.villa-location {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.villa-price,
.villa-capacity,
.villa-facilities {
  margin: 0;
}

.villa-buttons {
  display: flex;
  gap: 10px;
}

.villa-book-button,
.villa-status,
.villa-detail-button {
  background-color: #3490dc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.villa-book-button:hover,
.villa-status:hover,
.villa-detail-button:hover {
  background-color: #267dbb;
}

.villa-book-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.villa-status {
  background-color: #ccc;
}

.villa-status-booked {
  background-color: red;
}
.cancel-button {
  display: block;
  margin-top: 10px;
  width: 100%;
  background-color: red;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.confirm-button {
  display: block;
  margin-top: 10px;
  width: 100%;
  background-color: green;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.load-more-button {
  display: block;
  margin: 0 auto;
  background-color: #3490dc;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.load-more-button:hover {
  background-color: #267dbb;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}
</style>
