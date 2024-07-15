import OptionsCard from '@/components/shared/OptionsCard'
import React from 'react'
import { mainPageOptions } from '@/constants'


const HomePage = () => {
  return (
    <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
      {mainPageOptions.map(option => (
        <OptionsCard
          title={option.title}
          href={option.route}
        />
      ))}

    </div>
  )
}

export default HomePage