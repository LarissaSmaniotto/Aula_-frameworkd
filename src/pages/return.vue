<template>
    <v-container>
        <v-container>
            <v-row>
                <v-col>
                    <h1>Devolução de Equipamentos</h1>
                    <p>Itens aguardando devolução</p>
                    <p>Selecione o item que deseja Devolver</p>
                </v-col>
            </v-row>
  
            <v-divider class="my-4"></v-divider>
            <v-row>
                <v-col cols="12" md="4" v-for="resource in resources" :key="resource.patrimony">
                    <v-card>
                        <v-img :src="resource.photo" height="200px" cover></v-img>
                        <v-card-title>{{ resource.name }}</v-card-title>
                        <v-card-subtitle>Patrimônio: {{ resource.patrimony }}</v-card-subtitle>
                        <v-card-subtitle>{{ resource.location }}</v-card-subtitle>
                        <v-card-text>
                            <v-divider class="my-2"></v-divider>
                            <p class="text-h6 mb-3 text-success">Reserva nº {{ resource.reservationNumber }}</p>
                            <p>Reservado em {{ resource.reservedDate }} às {{ resource.reservedTime }}</p>
                            <p>Retirado em {{ resource.withdrawDate }} às {{ resource.withdrawTime }}</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" block>Devolver</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const resources = ref([
      {
          name: 'Notebook Dell',
          photo: '/src/assets/dell2.png',
          patrimony: '123456',
          location: 'Sala 09 - Gaveta 1',
          reservationNumber: '123456',
          reservedDate: '17/05/2024',
          reservedTime: '09:15h',
          withdrawDate: '17/05/2024',
          withdrawTime: '14:30h'
      },
      {
          name: 'Notebook HP',
          photo: '/src/assets/imgNotebookHP.WEBP',
          patrimony: '654321',
          location: 'Gaveta 2',
          reservationNumber: '654321',
          reservedDate: '18/05/2024',
          reservedTime: '10:00h',
          withdrawDate: '18/05/2024',
          withdrawTime: '15:00h'
      },
      {
          name: 'Projetor Epson',
          photo: '/src/assets/imgProjetorEpson.WEBP',
          patrimony: '456789',
          location: 'Gaveta 3',
          reservationNumber: '456789',
          reservedDate: '19/05/2024',
          reservedTime: '08:45h',
          withdrawDate: '19/05/2024',
          withdrawTime: '13:20h'
      }
  ]);
  </script>
  
  <style scoped>
  .v-card {
      background: #121212;
      color: white;
  }
  </style>
  