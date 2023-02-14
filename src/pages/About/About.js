import React from "react";
import './About.scss'
import AboutImg from '../../Assets/AboutImg.png'
import arrow from '../../Assets/arrow.png'
import clock from '../../Assets/clock.png'
import cedi from '../../Assets/cedi.png'
import { Link } from "react-router-dom";





const data = [
  {
    id: 1,
    img: cedi,
    title:'Bypass hidden charges',
    hook: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`
  },
  {
    id: 2,
    img:clock,
    title:'Your time is precious',
    hook: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`
  },
  {
    id: 3,
    img:arrow,
    title:'Search with accuracy',
    hook: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`
  }
]

const About = () => {
  return (
    <div className="container padding about">
      <div className="col-md-12">
        <div className="row mx-0">
         <div className="col-md-6 text-left">
          <div className="text-start">
          <div className="about-headline">Find the <span>property</span> you need to <span>rent</span> with ease!</div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Quibusdam omnis, libero tenetur porro ipsa odit impedit 
            molestias dignissimos laborum aliquam natus nulla adipisci.
            </p>
            <Link to={'/blogs'}>
              <button className=" btn cta">Search for a property</button>
            </Link>
            </div>
         </div>
         <div className="col-md-6 image-right">
           <div className="circle"></div>
          <div className="img-container">
           
            <img src={AboutImg} alt="" />
          </div>
         </div>
        </div>
      </div>
      <div className="col-md-12 down-content">
          <div className="row mx-0 content-wrapper">
        {data.map((info=>(
          <div key={info.id} className="col-md-4 item">
          <span className="icon">
            <img src={info.img} alt="" />
          </span>
          <h3>{info.title}</h3>
          <p>{info.hook}</p>
          </div>
        )))}
        </div>
      </div>
      <div className="col-md-12 bottom-cta">
        <Link to={'/create'}>
         <button className=" btn cta">List your property</button>
        </Link>
         
      </div>
    </div>
  );
};

export default About;
