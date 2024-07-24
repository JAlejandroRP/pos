'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { listFiles, uploadAnalysisStatus, uploadPdf } from '@/lib/actions/gdrive.actions'
import { Readable } from 'stream'

const HomePage = () => {
  return (
    <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
      <br />
      <Button
        onClick={async () => {
          await listFiles()
        }}
      >
        Lista
      </Button>

    </div>
  )
}

export default HomePage