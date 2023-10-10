import { useEffect, useRef, useState } from "react"
import { useCart, useDispatch } from "./ContextReducer"

const Card = ({ options, foodItem }) => {
    let data = useCart()
    let dispatch = useDispatch()
    let priceOptions = Object.keys(options)
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const priceRef = useRef()

    const handleCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;
                break
            }
        }
        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                return;
            }
            else if (food.size != size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: foodItem.img })
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: foodItem.img })
    }
    let finalPrice = qty * parseInt((options[size]))

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div className="card" style={{ "width": "17rem", "maxHeight": "400px" }}>
                <img src={foodItem.img} className="card-img-top" style={{ 'maxHeight': '120px' }} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{foodItem.name}</h5>
                    <p className="card-text">{foodItem.description.slice(0, 50)}...</p>
                    <div className="container w-100">
                        <select className='ml-2 h-100 rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                priceOptions.map((quantity) => {
                                    return (
                                        <option key={quantity} value={quantity}>{quantity}</option>
                                    )
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-5'>Rs.{finalPrice}/-</div>
                    </div>
                    <hr />
                    <button className="btn btn-outline-secondary justify-center ms-2" onClick={handleCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card
