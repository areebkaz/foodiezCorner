import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-secondary'>
            <footer className="d-flex justify-content-center py-3 border-top">
                <div>
                    <Link to="/" className="mb-3 mb-md-0 text-decoration-none text-white lh-1">
                        FoodiezCorner
                    </Link>
                    <span className="text-white">© 2023 AK, Inc</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer
