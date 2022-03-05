import React from 'react'
import "styled-components/macro";
import { logout } from '../../Pages/Input/input.slice';
import {useDispatch,useSelector} from 'react-redux'
const Navbar = () => {
 const dispatch = useDispatch()
 const { userInfo } = useSelector((state) => state.input);

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
      {userInfo &&  <a  onClick={()=>{dispatch(logout())}}>logout</a>}
      </div>
    )
}

export default Navbar

