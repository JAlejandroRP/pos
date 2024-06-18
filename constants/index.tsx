import { Home } from 'lucide-react';
import { Box } from 'lucide-react';
import { User } from 'lucide-react';

export const adminNavLinks = [
  {
    label: 'Home',
    route: '/',
    icon: <Home  className='h-4 w-4' />
  },
  {
    label: 'Products',
    route: '/products',
    icon: <Box  className='h-4 w-4' />
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: <User  className='h-4 w-4' />
  },
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