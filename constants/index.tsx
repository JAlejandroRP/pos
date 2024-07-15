import { Home, Box, User, Users, Receipt, Landmark, PackageSearch, Microscope, UserSquare, ClipboardPlus, } from 'lucide-react';

export const MIN_PAGE = 1
export const MAX_RESULTS = 9999
export const EMPTY_QUERY = ''

export const navLinks = {
  customer: [
    {
      label: 'Home',
      route: '/',
      icon: <Home className='h-4 w-4' />,
    },
    {
      label: 'Analisis',
      route: '/analisis',
      icon: <Microscope className='h-4 w-4' />,
    },
    // {
    //   label: 'Products',
    //   route: '/products',
    //   icon: <Box className='h-4 w-4' />,
    // },
    {
      label: 'My Analisis',
      route: '/my-analisis',
      icon: <ClipboardPlus className='h-4 w-4' />,
    },
    {
      label: 'Profile',
      route: '/profile',
      icon: <User className='h-4 w-4' />,
    },
  ],
  admin: [
    // {
    //   label: 'Analisis',
    //   route: '/analisis',
    //   icon: <Microscope className='h-4 w-4' />,
    // },
    {
      label: 'Customers',
      route: '/customers',
      icon: <Users className='h-4 w-4' />,
    },
    {
      label: 'Analisis Admin',
      route: '/analisis-admin',
      icon: <PackageSearch className='h-4 w-4' />,
    },
    {
      label: 'Perfil Admin',
      route: '/perfil-admin',
      icon: <PackageSearch className='h-4 w-4' />,
    },
    {
      label: 'Profile Admin',
      route: '/profile-admin',
      icon: <UserSquare className='h-4 w-4' />,
    },
  ]
}

export const mainPageOptions = [
  { title: 'Process new Analisis', route: '/customers/add' },
  { title: 'Sales Per Month', route: '#' },
  { title: 'Pending Analisis', route: '#' },
  { title: 'Analisis Completed Today', route: '#' },
]

export const AddProductDefaultValues = {
  name: '',
  image: '',
  price: 0,
  initial_stock: '',
  category: '',
  details: ''
}

export const ItemsCategories = [
  'Clothing',
  'Electronics',
  'Sports',
  'Toys',
  'Home',
]