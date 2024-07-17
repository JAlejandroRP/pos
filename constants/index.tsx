import { Home, Box, User, Users, Receipt, Landmark, PackageSearch, Microscope, UserSquare, ClipboardPlus, } from 'lucide-react';

export const MIN_PAGE = 1
export const MAX_RESULTS = 9999
export const EMPTY_QUERY = ''

export enum analysisStatus {
  in_progress = 'in_progress',
  received = 'received',
  canceled = 'canceled',
  completed = 'completed',
  collection_pending = 'collection_pending',
  other = 'other',
}

export const navLinks = {
  customer: [
    {
      label: 'Home',
      route: '/',
      icon: <Home className='h-4 w-4' />,
    },
    {
      label: 'Analysis',
      route: '/analysis',
      icon: <Microscope className='h-4 w-4' />,
    },
    // {
    //   label: 'Products',
    //   route: '/products',
    //   icon: <Box className='h-4 w-4' />,
    // },
    {
      label: 'My Analysis',
      route: '/my-analysis',
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
    //   label: 'Analysis',
    //   route: '/Analysis',
    //   icon: <Microscope className='h-4 w-4' />,
    // },
    {
      label: 'Customers',
      route: '/customers',
      icon: <Users className='h-4 w-4' />,
    },
    {
      label: 'Analysis Admin',
      route: '/analysis-admin',
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
  { title: 'Process new Analysis', route: '/customers/add' },
  { title: 'Sales Per Month', route: '#' },
  { title: 'Pending Analysis', route: '#' },
  { title: 'Analysis Completed Today', route: '#' },
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