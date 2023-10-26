import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   type: 'item',
  //   icon: 'home',
  //   role: ['Admin'],
  //   url: '/dashboard'
  // }
  {
    id: 'shop',
    title: 'Shop',
    translate: 'MENU.APPS.ECOMMERCE.SHOP',
    type: 'item',
    icon: 'shopping-bag',
    role: ['User', 'Admin','All'],
    url: '/shop'
  },
  {
    id: 'products',
    title: 'Products',
    type: 'item',
    exactMatch: true,
    icon: 'package',
    role: ['Admin'],
    url: '/products'
  },
  {
    id: 'details',
    title: 'Details',
    translate: 'MENU.APPS.ECOMMERCE.DETAIL',
    type: 'item',
    role: [''],
    icon: 'circle',
    url: '/details'
  },
  {
    id: 'wishList',
    title: 'Wish List',
    translate: 'MENU.APPS.ECOMMERCE.WISHLIST',
    type: 'item',
    icon: 'list',
    role: ['User'],
    url: '/wishlist'
  },
  {
    id: 'checkout',
    title: 'Checkout',
    translate: 'MENU.APPS.ECOMMERCE.CHECKOUT',
    type: 'item',
    icon: 'dollar-sign',
    role: ['User'],
    url: '/checkout'
  }
]
