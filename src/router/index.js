import { createRouter, createWebHistory } from 'vue-router';
import MapPage from '../components/MapPage.vue';
import AdvancedSearchPage from '../components/AdvancedSearchPage.vue';
import ContactUS from "@/components/ContactUS";

const routes = [
    {
        path: '/',
        name: 'MapPage',
        component: MapPage,
    },
    {
        path: '/advanced-search',
        name: 'AdvancedSearchPage',
        component: AdvancedSearchPage,
    },
    {
        path: '/contact',
        name: 'ContactUS',
        component: ContactUS,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
