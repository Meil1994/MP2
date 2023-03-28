import './Content.css'
import BoostedData from '../../../db/BoostedData.json'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState, useEffect } from 'react'

const ContentRight = () => {
  const [currentSlide, setcurrentSlide] = useState(0);
  const slideLength = BoostedData.length;
  const [empdata, empdatachange] = useState(null);

  const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () =>{
        setcurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
        console.log(nextSlide)
    }
    const prevSlide = () => {
        setcurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
        console.log(prevSlide)
      };
    function auto() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(()=>{
        setcurrentSlide(0);
    },[]);
    useEffect(() => {
        if (autoScroll) {
          auto();
        }
        return () => clearInterval(slideInterval);
      }, [currentSlide]);

      useEffect(() => {
        fetch("http://localhost:3200/profile").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

  return (
    <div>
      <div>
        { empdata &&
           empdata.map( address =>(
              <div className='box3' key={address.id}>
                <div className='contacts'>
                    <h6><i class='fa-regular fa-address-card'></i> Delivery Address:</h6>
                    <p>House number {address.housenumber}, {address.street}, {address.brgy}, {address.city}, {address.province}, {address.postcode}</p>
                    <h6><i class='fa-sharp fa-solid fa-mobile-retro'></i> Phone Number:</h6>
                    <p>{address.contact}</p>
                </div>
              </div>
           ))
        }   
      </div>

      <div className='box3-1'>
        <h1>ITEMS YOU MAY LIKE!</h1>
        <div className='slider'>
            <div className='buttons'>
                <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide}/>
                <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/>
            </div>
            {
                BoostedData.map((slide, index)=>{
                    return(
                        <div className={ index === currentSlide ? 'slide current' : 'slide'} key={slide.id}>
                                {index === currentSlide && (
                                    <div>
                                    <img src={slide.icon} alt='slide' className='image'/>
                                    <div className='content'>
                                        <p>ON SALE!</p>
                                        <h2>{slide.title}</h2>
                                        <h4>PHP {slide.price}</h4>
                                        <button>CLICK TO CHECK</button>
                                    </div>
                                    </div>  
                                )}
                        </div>  
                    )
                })
            }
        </div>
      </div>
      
      


    </div>
  )
}

export default ContentRight