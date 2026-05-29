<template>

  <div class="container">

    <!-- HEADER -->
    <div class="header">

      <div>

        <h1>
          Ekstrakurikuler SMK Tunas Harapan Pati
        </h1>

        <h2>
          Temukan minat dan bakat terbaikmu 🚀
        </h2>

      </div>

      <!-- SEARCH EKSKUL -->
      <input
        type="text"
        placeholder="Cari Ekstrakulikuler..."
        v-model="search"
      >

    </div>

    <!-- CARD -->
    <div class="cards">

      <div
        class="card"
        v-for="(item,index) in filteredEkskul"
        :key="index"
      >

        <!-- IMAGE -->
        <img
          :src="item.image"
          alt=""
        >

        <!-- CONTENT -->
        <div class="content">

          <h2>
            {{ item.nama }}
          </h2>

          <p>
            {{ item.deskripsi }}
          </p>

          <button
            @click="openModal(item)"
          >
            Lihat Detail
          </button>

        </div>

      </div>

    </div>

    <!-- MODAL -->
    <div
      class="modal-overlay"
      v-if="showModal"
    >

      <div class="modal">

        <img
          :src="selectedEkskul.image"
          alt=""
        >

        <h2>
          {{ selectedEkskul.nama }}
        </h2>

        <p>
          {{ selectedEkskul.deskripsi }}
        </p>

        <button @click="closeModal">
          Tutup
        </button>

      </div>

    </div>

  </div>

</template>

<script setup>

import { ref, computed } from 'vue'

/* SEARCH */
const search = ref('')

/* MODAL */
const showModal = ref(false)

const selectedEkskul = ref({})

/* DATA */
const ekskul = ref([

  {
    nama: 'Futsal',
    deskripsi:
      'Ekskul olahraga yang melatih teamwork dan sportivitas.',
    image: '/src/assets/Futsal THP.webp'
  },

  {
    nama: 'Pramuka',
    deskripsi:
      'Ekskul pembentukan karakter dan kepemimpinan.',
    image: '/src/assets/Pramuka.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },
  

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

    {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

    {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

    {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  },

  {
    nama: 'PMR',
    deskripsi:
      'Belajar kesehatan dan pertolongan pertama.',
    image: '/src/assets/PMR.png'
  }

])

/* FILTER */
const filteredEkskul = computed(() => {

  return ekskul.value.filter(item =>
    item.nama.toLowerCase()
    .includes(search.value.toLowerCase())
  )

})

/* OPEN MODAL */
const openModal = (item) => {

  selectedEkskul.value = item

  showModal.value = true

}

/* CLOSE */
const closeModal = () => {

  showModal.value = false

}

</script>

<style scoped>

.container {
  padding: 35px;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 45px;
}

.header p {
  margin-top: 10px;
  color: gray;
}

/* SEARCH */
input {
  width: 300px;

  padding: 15px;

  border-radius: 15px;
  border: 1px solid #ddd;

  outline: none;
}

/* CARDS */
.cards {
  margin-top: 35px;

  display: grid;
  grid-template-columns: repeat(3,1fr);

  gap: 25px;
}

/* CARD */
.card {
  background: white;

  border-radius: 25px;

  overflow: hidden;

  box-shadow: 0 10px 30px rgba(0,0,0,.08);

  transition: .3s;
}

.card:hover {
  transform: translateY(-5px);
}

/* IMAGE */
.card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

/* CONTENT */
.content {
  padding: 25px;
}

.content h2 {
  color: #1E3A8A;
}

.content p {
  margin-top: 12px;

  color: gray;

  line-height: 1.8;
}

/* BUTTON */
button {
  margin-top: 20px;

  width: 100%;

  padding: 14px;

  border: none;

  border-radius: 14px;

  background: linear-gradient(
    135deg,
    #1E3A8A,
    #F97316
  );

  color: white;

  cursor: pointer;
}

/* MODAL */
.modal-overlay {
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0,0,0,.4);

  display: flex;
  justify-content: center;
  align-items: center;
}

/* MODAL */
.modal {
  width: 450px;

  background: white;

  border-radius: 25px;

  overflow: hidden;
}

.modal img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.modal h2 {
  padding: 20px 25px 0;
}

.modal p {
  padding: 15px 25px;

  line-height: 1.8;
  color: gray;
}

.modal button {
  margin: 20px;
  width: calc(100% - 40px);
}

/* RESPONSIVE */
@media(max-width:1000px){

  .cards{
    grid-template-columns: 1fr;
  }

}

</style>