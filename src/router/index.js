import { createRouter, createWebHistory } from 'vue-router';
import MapPage from '../components/MapPage.vue';
import AdvancedSearchPage from '../components/AdvancedSearchPage.vue';
import ContactUS from "@/components/ContactUS";
import PartnerList from "@/components/About/PartnerList.vue";
import AboutFishnet from "@/components/About/AboutFishnet";
import DataPolicy from "@/components/About/DataPolicy";
import FundingPage from "@/components/About/FundingPage";
import JoinUs from "@/components/JoinUs";
import GeoReferencing from "@/components/GeoReferencing";
import ServicesDoc from "@/components/ServicesDoc";

const routes = [
    {
        path: '/',
        name: 'MapPage',
        component: MapPage,
    },
    {
        path: '/searchresult',
        name: 'SearchResultPage',
        component: MapPage,
        props: route => ({ query: route.query })
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
    {
        path: '/about',
        name: 'AboutFishnet',
        component: AboutFishnet,
    },
    {
        path: '/datapolicy',
        name: 'DataPolicy',
        component: DataPolicy,
    },
    {
        path: '/funding',
        name: 'Funding',
        component: FundingPage,
    },
    {
        path: '/partners',
        name: 'Partners',
        component: PartnerList,
    },
    {
        path: '/joinus',
        name: 'JoinUs',
        component: JoinUs,
    },
    {
        path: '/georef',
        name: 'GeoReference',
        component: GeoReferencing,
    },
    {
        path: '/services',
        name: 'ServicesDoc',
        component: ServicesDoc,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
