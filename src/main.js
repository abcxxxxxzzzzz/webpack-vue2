import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import store from '../store'
import 'element-ui/lib/theme-chalk/index.css';
import http from 'axios'


import { 
  Button, 
  Container,
  Main,
  Aside, 
  Header, 
  Menu, 
  Submenu, 
  MenuItemGroup, 
  MenuItem, 
  Dropdown, 
  DropdownMenu, 
  DropdownItem, 
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Input,
  Form,
  FormItem,
  Message,
  MessageBox,
  Dialog,
  Switch,
  Table,
  TableColumn,
  Popconfirm,
  Drawer,
  Pagination,
  Card,
  Loading,
  Select,
  Option,
  Tooltip,
} from 'element-ui';


Vue.use(Button);
Vue.use(Container);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Switch);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popconfirm);
Vue.use(Drawer);
Vue.use(Pagination);
Vue.use(Card);
Vue.use(Loading);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tooltip);





Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$message = Message
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
