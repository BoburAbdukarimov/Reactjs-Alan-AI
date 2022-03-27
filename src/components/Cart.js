import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import alanBtn from '@alan-ai/alan-sdk-web';

const Cart = () => {

    const [mainCart, setMainCart] = useState([]);
    const [card, setCard] = useState([]);
    const [ismodal, setIsmodal] = useState(false)

const addCardHandler = (item)=>{
    setCard((prev) => {
        return[...prev, item];
    });
    toast.dark("add card correct😲");
};

const modalHandler = ()=>{
    setIsmodal(!ismodal)
}

    useEffect(()=>{
        alanBtn({
            key: '52bbbbcaeaecaa3eae8bed7ce7e361452e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                if(commandData.command === "getMenu"){
                    setMainCart(commandData.data)
                }else if(commandData.command === "showCart"){
                    addCardHandler(commandData.data);
                }
            }
        });
    }, [])

    console.log(mainCart);
    return (
        <div className='album py-5 bg-light'>
        <div className='container'>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {mainCart.map(item=>(
                    <div key={item.id} className='col'>
                        <div className='card shadow-sm p-3 'style={{minHeight:"500px"}}>
                        <div className='card-title'>
                            <h4 className='text-muted text-center'>Product # {item.id}</h4>
                        </div>
                        <img 
                        src={item.image} 
                        alt={item.title} 
                        className='bg-placeholder card-img-top'
                        width='100%'
                        height='400px'
                        />
                        <div className='card-body'>
                            <p className='card-text'>{item.title.slice(0, 20)}</p>
                            <p className='card-text fw-lighter'>{item.description.slice(0, 100)}</p>
                        </div>
                        <div className='card-footer d-flex justify-content-between align-items-center'>
                            <div>
                                <span>{item.category}</span>
                            </div>
                            <span className='text-muted'>${item.price}</span>
                        </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
        <div className='fixed-top m-3'>
        <button onClick={modalHandler} type="button" className="btn btn-primary position-relative">
            Card
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {card.length}
                <span className="visually-hidden">unread messages</span>
            </span>
        </button>
        </div>
        {ismodal && (
                <div className="modal" style={{display: 'block', background: "rgba(0,0,0, .8)" }}>
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">Cart</h5>
                    <button onClick={modalHandler} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    {card.map(item =>(
                        <div className='card mb-3'>
                            <div className='row g-0'>
                                <div className='col-md-4'>
                                    <img src={item.image} alt={item.title} className="img-fluid rounded-start"/>
                                </div>
                                <div className='col-md-8'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{item.tite}</h5>
                                        <p className='card-text text-muted'>
                                            {item.description.slice(0, 100)}
                                        </p>
                                        <p className='card-text'>
                                            <small className='text-muted'>${item.price}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="modal-footer">
                    <button onClick={modalHandler} type="button" className="btn btn-primary">Close</button>
                    </div>
                </div>
                </div>
            </div>
        )}
        </div>
    );
};

export default Cart;