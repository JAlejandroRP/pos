"use client"
import React, { useEffect, useState } from 'react'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const ViewSelector = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [ver, setVer] = useState('analysis')

  const handleChange = () => {
    const params = new URLSearchParams(searchParams);

    if (ver === 'analysis') {
      params.set('type', ver);
    } else {
      params.set('type', ver);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    // handleChange()
  }, [ver])

  return (
    <div className='flex flex-row justify-between'>
      <Switch id="ver"
        onClick={() => {
          setVer((prev) => prev === 'analysis' ? 'perfils' : 'analysis')
          handleChange()
        }}
      />
      <Label
        className='m-auto'
        htmlFor="ver">Viendo: {ver === 'analysis' ? 'Analisis' : 'Perfiles'}</Label>
    </div>
  )
}

export default ViewSelector