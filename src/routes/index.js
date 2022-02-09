import async from '../components/async';

const Login = async(() => import('../containers/login'));
const Home = async(() => import('../containers/home'));

export const publicRoutes = [
  {
    path: '/login',
    name: 'Log In',
    component: Login,
  },
  {
    path:'/'
  }
];

export const privateRoutes = [
  {
    path: '/home',
    name:'Home',
    component: Home,
  },
];
