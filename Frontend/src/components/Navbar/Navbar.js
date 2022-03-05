import React from 'react'
import "styled-components/macro";
import { logout } from '../../Pages/Input/input.slice';
import {useDispatch} from 'react-redux'
const Navbar = () => {
 const dispatch = useDispatch()
    return (
        <div
        css={`
          display: flex;
          justify-content: space-between;
          background: #343d44;
          flex-direction: row;
          padding: 10px;
          align-items: center;
          & a {
            cursor: pointer;
            color:white !important;
          }
        `}
      >
        <h1>Solo Leveling</h1>
        <a  onClick={()=>{dispatch(logout())}}>logout</a>
      </div>
    )
}

export default Navbar

