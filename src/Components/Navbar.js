import React, { Component } from 'react'
import {Link} from "react-router-dom";
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:"flex", background:"lightblue",padding:"1rem",justifyContent:"center",alignItems:"center"}}>
      <Link to="/" style={{textDecoration:"none"}}><h1>Movies App</h1></Link>
       <Link to="/fav" style={{textDecoration:'none'}}> <h1 style={{marginLeft:'2rem'}}>Favorite App</h1></Link>
      </div>
    )
  }
}
