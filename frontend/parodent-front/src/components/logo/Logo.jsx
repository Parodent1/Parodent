import React from 'react'
import './logo.css'
import { Link } from 'react-router-dom'

function Logo() {
return (
<Link className='LogoContentBody' to='/dailySchedule'>
<h1 className='logoContentText mainContentLetter'>pa</h1>
    <h1 className='logoContentText'>ro</h1>
    <h1 className='logoContentText'>de</h1>
    <h1 className='logoContentText'>nt</h1>
</Link>

)
}

export default Logo