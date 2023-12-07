import React from 'react'
import action1 from '../assets/action1.png';
import { Link  } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { publicRequest } from "../publicRequest";


const Content = () => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    const getLocaion = async () => {
      try  {
        const res = await axios.get(`${publicRequest}/post`);
        setContent(res.data);
      } catch (err) {}
    };
    getLocaion();
  }, []);
  return (
    <div className='content-ctn'>
        <div className="content">
            {content.map((item) => (               
                <div className="card">
                    <img src={item.img} alt="" />
                    <h1>{item.action}</h1>
                    <Link to={`/action/${item._id}`} >
                        <button>คลิกเพื่อดูรายละเอียด</button>
                    </Link>            
                </div>
            ))}          
        </div>
    </div>
  )
}

export default Content