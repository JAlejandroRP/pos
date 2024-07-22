import OptionsCard from '@/components/shared/OptionsCard'
import React from 'react'
import { mainPageOptions } from '@/constants'
import { Button } from '@/components/ui/button'

const clientJSON = process.env.GDRIVE_CLIENT_JSON

const HomePage = () => {
  return (
    <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
      <Button>Subir archivo</Button>

    </div>
  )
}

export default HomePage