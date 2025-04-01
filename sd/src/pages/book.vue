<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Reserva de Equipamentos</h1>
                <p>Itens aguardando reserva</p>
                <p>Selecione o item desejado para reservar</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4" v-for="resource, i in resources" :key="resource.patrimony">
                <v-card>
                    <v-img :src="resource.photo" max-height="150" cover></v-img>
                    <v-card-title>{{ resource.name }}</v-card-title>
                    <v-card-subtitle>Patrimônio:{{ resource.patrimony }}</v-card-subtitle>
                    <v-card-text>
                        {{ resource.location }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-dialog max-width="400" v-model="dialog[i]">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" color="primary" block variant="tonal">Reservar</v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <v-card>
                                    <v-card-title class="bg-primary">Reservar {{ resource.name }}</v-card-title>
                                    <v-card-text>
                                        <v-window v-model="step[i]">
                                            <v-window-item :value="1">
                                                <v-date-picker class="mx-auto" title="Selecione a data da reserva"
                                                    hide-header multiple color="primary" scrollable
                                                    v-model="resource.booking.date"></v-date-picker>
                                                <v-select prepend-icon="mdi-clock"
                                                    v-for="(date, index) in resource.booking.date" :key="index"
                                                    clearable chips closable-chips
                                                    :label="`Horários em ${date.toLocaleDateString('en-GB')}`"
                                                    :items="timeRanges" multiple item-text="name" item-value="value"
                                                    v-model="resource.booking.time[index]"
                                                    variant="underlined"></v-select>
                                            </v-window-item>
                                            <v-window-item :value="2">
                                                <h3 class="text-uppercase">
                                                    <v-icon class="mr-2">mdi-check-circle</v-icon>
                                                    Confirmação de reserva
                                                </h3>
                                                <v-divider class="my-4"></v-divider>
                                                <v-card>
                                                    <div class="d-flex flex-no-wrap justify-space-between">
                                                        <div>
                                                            <v-card-title>
                                                                {{ resource.name }}
                                                            </v-card-title>
                                                            <v-card-subtitle>Patrimônio {{ resource.patrimony
                                                                }}</v-card-subtitle>
                                                            <v-card-subtitle>{{ resource.location }}</v-card-subtitle>
                                                        </div>
                                                        <v-img :src="resource.photo"></v-img>
                                                    </div>
                                                    <v-divider class="my-4"></v-divider>
                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col cols="12"
                                                                v-for="(date, index) in resource.booking.date"
                                                                :key="index">
                                                                <h4>
                                                                    <v-icon class="mr-2">mdi-calendar-check</v-icon>
                                                                    {{ date.toLocaleDateString('en-GB') }}
                                                                </h4>
                                                                <v-chip-group>
                                                                    <v-chip readonly
                                                                        v-for="(time, i) in resource.booking.time[index]"
                                                                        :key="i">
                                                                        {{ time }}
                                                                    </v-chip>
                                                                </v-chip-group>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                    <v-divider class="my-4"></v-divider>
                                                </v-card>
                                            </v-window-item>
                                            <!-- Reserva efetuada com sucesso! -->
                                            <v-window-item :value="3">
                                                <h3 class="text-uppercase text-orange">
                                                    <v-icon class="mr-2">mdi-check-circle</v-icon>
                                                    Reserva efetuada!
                                                </h3>
                                                <v-divider class="my-4"></v-divider>
                                                <!-- protocolo de reserva -->
                                                <v-card>
                                                    <v-card-title>
                                                        Protocolo de Reserva
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <p class="mx-5 my-2 text-h6 text-success"
                                                            prepend-icon="mdi-file-document">Reserva nº 123456</p>
                                                        <p class="mx-5 my-2">
                                                            Reservado em 17/05/2024 às 09:15h por {{ userStore.displayName }}
                                                        </p>
                                                        <v-divider class="my-4"></v-divider>
                                                    </v-card-text>
                                                </v-card>
                                                <v-alert type="success" outlined>
                                                    <v-icon class="mr-2">mdi-email-check</v-icon>
                                                    Comprovante de reserva enviado por email
                                                </v-alert>
                                            </v-window-item>
                                        </v-window>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn v-if="step[i] == 1" color="warning" variant="text">Cancelar</v-btn>
                                        <v-btn v-else-if="!booked[i]" color="white" @click="step[i]--">Anterior</v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn v-if="step[i] == 1" @click="step[i]++" color="white"
                                            variant="text">Próximo</v-btn>
                                        <v-btn v-else-if="!booked[i]" color="success"
                                            @click="step[i]++; booked[i] = true">Confirmar</v-btn>
                                        <!-- close dialog -->
                                        <v-btn v-else color="success" block @click="finish(i)">Finalizar</v-btn>
                                        
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const dialog = ref([false]);
const bookedResources = ref([]);
const step = ref([1]);
const timeRanges = ref([])
const bookingDateTime = ref({});
const booked = ref([false]);

const date = new Date();
bookingDateTime.value.date = date.toLocaleDateString('en-GB');
bookingDateTime.value.time = date.toLocaleTimeString('en-GB');

// set timerange from 6 to 23 hour
for (let i = 6; i < 24; i++) {
    timeRanges.value.push(`${i}:00`);
}

const resources = ref(
    [
        {
            name: 'Notebook Dell',
            photo: '/src/assets/dell2.png',
            patrimony: '123456',
            description: 'Notebook Dell Inspiron 15 3000',
            location: 'Sala O9 - Gaveta 1',
            booking: {
                date: [],
                time: []
            }
        },
        {
            name: 'Notebook HP',
            photo: '/src/assets/imgNotebookHP.WEBP',
            patrimony: '654321',
            description: 'Notebook HP Pavilion 15',
            location: 'Gaveta 2',
            booking: {
                date: [],
                time: []
            }
        },
        {
            name: 'Projetor Epson',
            photo: '/src/assets/imgProjetorEpson.WEBP',
            patrimony: '456789',
            description: 'Projetor Epson PowerLite S41+',
            location: 'Gaveta 3',
            booking: {
                date: [],
                time: []
            }
        },
        {
            name: 'Câmera Canon',
            photo: '/src/assets/imgCâmeraCanon.WEBP',
            patrimony: '987654',
            description: 'Câmera Canon EOS Rebel T7',
            location: 'Gaveta 4',
            booking: {
                date: [],
                time: []
            }
        },
        {
            name: 'Impressora 3D Creality',
            photo: '/src/assets/imgimpressora3DCreality.WEBP',
            patrimony: '789456',
            description: 'Impressora 3D Creality Ender 3',
            location: 'Gaveta 5',
            booking: {
                date: [],
                time: []
            }
        },
        {
            name: 'Arduino Uno',
            photo: '/src/assets/imgArduinoUno.WEBP',
            patrimony: '654987',
            description: 'Arduino Uno R3',
            location: 'Gaveta 6',
            booking: {
                date: [],
                time: []
            }
        }
    ]);
const finish = (i) => {
    bookedResources.value.push(resources.value);
    booked.value[i] = false;
    step.value[i] = 1;
    dialog.value[i]  = false;
}
</script>