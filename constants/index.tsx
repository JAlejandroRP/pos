import { Home } from 'lucide-react';
import { Box } from 'lucide-react';
import { User } from 'lucide-react';

export const navLinks = [
  {
    label: 'Home',
    route: '/',
    icon: <Home  className='mr-2 h-4 w-4' />
  },
  {
    label: 'Products',
    route: '/products',
    icon: <Box  className='mr-2 h-4 w-4' />
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: <User  className='mr-2 h-4 w-4' />
  },
]