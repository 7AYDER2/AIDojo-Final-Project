import Home from '@/views/Home.vue';
import Details from '@/views/Details.vue';
import NotFound from '@/views/NotFound.vue';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';
import OverView from '@/views/OverView.vue';
import Favourite from '@/views/Favourite.vue';
import Profile from '@/views/Profile.vue';
import AdminPanle from '../views/AdminPanle.vue'
const routes = [
    {
        path: '/',
        name: 'overview',
        component: OverView
    },
    {
        path: "/Homepage",
        name: "Homepage",
        component: Home
    },
    {
        path: "/Details/:id",
        name: "Details",
        component: Details
    },
    {
        path: "/Favourite",
        name: "Favourite",
        component: Favourite
    },
    {
        path: "/Login",
        name: "Login",
        component: Login
    },
    {
        path: "/SignUp",
        name: "SignUp",
        component: SignUp
    },
    {
        path: "/Profile",
        name: "Profile",
        component: Profile
    },
    {
        path: "/AdminPanle",
        name: "AdminPanle",
        component: AdminPanle,
        meta: { requiresAdmin: true }

    },
    //redirect
    {
        path: "/",
        redirect: "/",
    },
    {
        path: "/:catchAll(.*)",
        name: "Not Found",
        component: NotFound
    }
]
export default routes;