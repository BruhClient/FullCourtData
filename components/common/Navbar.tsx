"use client"

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'
import useSessionUser from '@/hooks/use-session-user'
import UserProfile from '../auth/UserProfile'

const Navbar = () => {

  const user = useSessionUser()

  
  return (
    <div className='flex w-full justify-between py-3 px-3 items-center'>
        <div className='text-2xl font-bold'>
            Full<span className='text-primary'>Court</span>Data
        </div>
        <div className="flex gap-3 items-center">
            

            {user ? <UserProfile /> : <><ModeToggle /><Button asChild><Link href={"/signup"}>Get Started</Link></Button>
            <Button variant={"outline"} className='hidden lg:block' asChild><Link href={"/signin"}>Sign in</Link></Button></>}
            
      </div>
      
    </div>
  )
}

export default Navbar
