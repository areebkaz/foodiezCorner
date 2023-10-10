import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

const Home = () => {
    const [foodItems, setFoodItems] = useState([])
    const [foodCategory, setFoodCategory] = useState([])
    const [search,setSearch] = useState('')

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        response = await response.json()
        // console.log(response[0],response[1]);
        setFoodItems(response[0])
        setFoodCategory(response[1])
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-caption" style={{ "zIndex": "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control bg-light me-2" value={search} onChange={(e)=> setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/300x300/?burger" className="d-block w-100" style={{"filter":"opacity(50%)", "maxHeight":"450px"}} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300x300/?pizza" className="d-block w-100" style={{"filter":"opacity(50%)", "maxHeight":"450px"}} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/300x300/?pastries" className="d-block w-100" style={{"filter":"opacity(50%)", "maxHeight":"450px"}} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='bg-light px-5'>
                {
                    foodCategory != [] ?
                        foodCategory.map((data) => {
                            return (
                                <div className='row pb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodItems != [] ?
                                            foodItems.filter((items) => items.CategoryName === data.CategoryName && (items.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map((filteredItems) => {
                                                return (
                                                    <div key={filteredItems._id} className='col-12 col-md-6 col-lg-3 mt-3 mb-5'>
                                                        <Card foodItem = {filteredItems}
                                                            options={filteredItems.options[0]}
                                                        />
                                                    </div>
                                                )
                                            })
                                            : <div>No such data found</div>
                                    }
                                </div>
                            )
                        }) : ""
                }
            </div>
            <Footer />
        </>
    )
}

export default Home
