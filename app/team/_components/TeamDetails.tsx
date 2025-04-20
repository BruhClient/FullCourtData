import FallbackImage from '@/components/FallbackImage'
import React from 'react'

const TeamHeader = async ({logo ,name,conference,division} : {logo : string , name : string , conference : string , division : string}) => {
    
  return (
    <div className='flex items-center gap-3'>
                <FallbackImage src={logo} alt='logo' fallbackSrc='/default-profile.png' width={100} height={100}/>
                <div className='flex flex-col'>
                    <div className='text-3xl font-bold '>
                        {name}
                    </div>
                    <div className='flex flex-col ext-muted-foreground text-sm'>
                        <div>
                            {conference}ern conference
                        </div>
                        <div>
                        {division} division
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
  )
}

export default TeamHeader
