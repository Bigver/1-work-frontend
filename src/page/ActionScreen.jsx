import React from 'react'
import action1 from '../assets/action1.png';
import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store.jsx';
import { publicRequest } from "../publicRequest.js";
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ActionScreen = () => {
  const params = useParams();
  const { id } = params;
  const [content, setContent] = useState([]);
  useEffect(() => {
    const getLocaion = async () => {
      try  {
        const res = await axios.get(`${publicRequest}/post/${id}`);
        setContent(res.data);
      } catch (err) {}
    };
    getLocaion();
  }, []);
    const { state, dispatch: ctxDispatch } = useContext(Store);

  console.log(content)

  return (
    <div className='action-ctn'>
      <div className="img">        
        <img src={content.img} alt="" />
      </div>
        <div className="details">
            <div className="text">
                <h1>{content.action}</h1>
                <h2>{content.detail}</h2>
                <h1 className='d-1'>การฝึกปฎิบัติ</h1>
                <h2>{content.practice}</h2>
            </div>
            <iframe width="700" height="500"
             src={content.vdo}>
            </iframe>
        </div>
    </div>
  )
}

export default ActionScreen