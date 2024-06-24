import { Home, Box, User, Users , Receipt, Landmark, PackageSearch, SquareUser, UserSquare} from 'lucide-react';

export const navLinks = {
  customer: [
    {
      label: 'Home',
      route: '/',
      icon: <Home className='h-4 w-4' />,
    },
    {
      label: 'Products',
      route: '/products',
      icon: <Box className='h-4 w-4' />,
    },
    {
      label: 'My Orders',
      route: '/my-orders',
      icon: <Receipt className='h-4 w-4' />,
    },
    {
      label: 'Profile',
      route: '/profile',
      icon: <User className='h-4 w-4' />,
    },
  ],
  admin: [
    {
      label: 'Orders',
      route: '/orders',
      icon: <Landmark className='h-4 w-4' />,
    },
    {
      label: 'Customers',
      route: '/customers',
      icon: <Users className='h-4 w-4' />,
    },
    {
      label: 'Products Admin',
      route: '/products-admin',
      icon: <PackageSearch className='h-4 w-4' />,
    },
    {
      label: 'Profile Admin',
      route: '/profile-admin',
      icon: <UserSquare className='h-4 w-4' />,
    },
  ]
}

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