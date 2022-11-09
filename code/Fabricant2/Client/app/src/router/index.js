import { createRouter, createWebHistory } from 'vue-router';
import listes from '@/components/listes.vue'
import ListPropositions from '@/components/ListPropositions.vue'
import PanelContreProp from '@/components/PanelContreProp.vue'


const routes = [
    {
        name: 'liste',
        path: '/liste/:id',
        component: listes,
    },
    {
        name: 'offreListe',
        path: '/',
        component: ListPropositions,
    },
    {
        name: 'contreProp',
        path: '/contreProp/:id',
        component: PanelContreProp,

    }
    //Ajouter la route
];

const router = createRouter({
        history: createWebHistory(),
        routes
    }
)

export default router;