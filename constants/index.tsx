import { Home, Box, User, Users, Receipt, Landmark, PackageSearch, Microscope, UserSquare, ClipboardPlus, Users2, } from 'lucide-react';

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
      label: 'Inicio',
      route: '/',
      icon: <Home className='h-4 w-4' />,
    },
    {
      label: 'Estado Pruebas',
      route: '/analysis-status',
      icon: <Microscope className='h-4 w-4' />,
    },
    {
      label: 'Perfiles',
      route: '/perfils',
      icon: <PackageSearch className='h-4 w-4' />,
    },
    // {
    //   label: 'My Analysis',
    //   route: '/my-analysis',
    //   icon: <ClipboardPlus className='h-4 w-4' />,
    // },
    // {
    //   label: 'Profile',
    //   route: '/profile',
    //   icon: <User className='h-4 w-4' />,
    // },
  ],
  admin: [
    {
      label: 'Pacientes',
      route: '/patients',
      icon: <Users className='h-4 w-4' />,
    },
    {
      label: 'Particulares',
      route: '/particulars',
      icon: <Users2 className='h-4 w-4' />,
    },
    {
      label: 'Analisis',
      route: '/analysis-admin',
      icon: <PackageSearch className='h-4 w-4' />,
    },
    // {
    //   label: 'Perfil Admin',
    //   route: '/perfil-admin',
    //   icon: <PackageSearch className='h-4 w-4' />,
    // },
    // {
    //   label: 'Profile Admin',
    //   route: '/profile-admin',
    //   icon: <UserSquare className='h-4 w-4' />,
    // },
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

export const Roles = {
  client: 'client',
  admin: 'admin'
}

export const ItemsCategories = [
  'Clothing',
  'Electronics',
  'Sports',
  'Toys',
  'Home',
]