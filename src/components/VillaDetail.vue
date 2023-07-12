<template>
  <div class="villa-detail">
    <h1 class="villa-title">Villa Detail</h1>
    <div class="villa-slider">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="image in villa.images" :key="image.id">
          <img class="slider-image" :src="image.url" :alt="image.alt" />
        </swiper-slide>
        <div class="swiper-pagination"></div>
      </swiper>
    </div>
    <div class="villa-details-container">
      <div class="villa-details">
        <h3 class="villa-location">{{ villa.location }}</h3>
        <p class="villa-price">Price: {{ villa.price }}</p>
        <p class="villa-capacity">Capacity: {{ villa.capacity }}</p>
        <p class="villa-facilities">Facilities: {{ villa.facilities }}</p>
        <p class="villa-description">Description: {{ villa.description }}</p>
        <div class="villa-more-images">
          <h4>More Images</h4>
          <div class="villa-images">
            <img v-for="image in villa.moreImages" :src="image.url" :alt="image.alt" :key="image.id" />
          </div>
        </div>
      </div>
    </div>
    <button v-if="!villa.booked" @click="openConfirmationModal" class="villa-book-button">Book</button>
    <button v-else class="villa-status villa-status-booked">Booked</button>
    <button @click="$router.back()" class="back-button">Back</button>

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
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/components/pagination/pagination.min.css';

export default {
  name: 'VillaDetail',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
      },
      villa: {
        id: 1,
        location: 'Berlin',
        price: '$200',
        capacity: '6 guests',
        facilities: 'Swimming pool, Garden',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        booked: false,
        images: [
          {
            id: 1,
            url: require('@/assets/image1.jpg'),
            alt: 'Image 1',
          },
          {
            id: 2,
            url: require('@/assets/image2.jpg'),
            alt: 'Image 2',
          },
          {
            id: 3,
            url: require('@/assets/image3.jpg'),
            alt: 'Image 3',
          },
        ],
        moreImages: [
          {
            id: 4,
            url: require('@/assets/image4.jpg'),
            alt: 'Image 4',
          },
          {
            id: 5,
            url: require('@/assets/image4.jpg'),
            alt: 'Image 5',
          },
          {
            id: 6,
            url: require('@/assets/image1.jpg'),
            alt: 'Image 6',
          },
        ],
      },
      showConfirmationModal: false,
    };
  },
  methods: {
    openConfirmationModal() {
      this.showConfirmationModal = true;
    },
    closeConfirmationModal() {
      this.showConfirmationModal = false;
    },
    confirmBooking() {
      // Perform booking logic
      this.villa.booked = true;
      this.closeConfirmationModal();
    },
  },
};
</script>

<style scoped>
.villa-detail {
  padding: 20px;
}

.villa-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
}

.villa-slider {
  max-width: 600px;
  margin: 0 auto 20px;
}

.slider-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 400px;
  border-radius: 8px;
}

.villa-details-container {
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  background-color: #f7fafc;
}

.villa-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.villa-location {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.villa-price,
.villa-capacity,
.villa-facilities {
  margin: 0;
}

.villa-description {
  margin: 0;
}

.villa-more-images {
  margin-top: 20px;
}

.villa-more-images h4 {
  margin-bottom: 10px;
}

.villa-images {
  display: flex;
  gap: 10px;
}

.villa-images img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.villa-book-button,
.villa-status {
  display: block;
  margin-top: 10px;
  width: 100%;
  background-color: #3490dc;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
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

.villa-book-button:hover,
.villa-status:hover {
  background-color: #267dbb;
}

.villa-status-booked {
  background-color: red;
  cursor: not-allowed;
}

.back-button {
  display: block;
  margin-top: 10px;
  width: 100%;
  background-color: #ccc;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #999;
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

/* Responsive Styles */

@media (max-width: 768px) {
  .villa-slider {
    max-width: 400px;
  }
}

@media (max-width: 576px) {
  .villa-details-container {
    padding: 10px;
  }

  .villa-images img {
    width: 80px;
    height: 80px;
  }
}
</style>
