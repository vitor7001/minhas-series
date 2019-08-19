import React, { useState} from 'react'
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
}  from 'reactstrap';


import {
  Link
}  from 'react-router-dom';

function Header(){
  const [open, setOpen] = useState(false)
const toggle = () =>{
  setOpen(!open)
}

return (
     <Navbar color='light' light expand='md'>
       <div className='container'>
              <NavbarBrand tag={Link} to='/'
               className='menu' > Minhas Séries </NavbarBrand>
              <NavbarToggler onClick={toggle}/>
                <Collapse  isOpen={open} navbar>
                   <Nav className='ml-auto'>
                      <NavItem>
                        <NavLink tag={Link} to='/series' className='opc'>
                          Séries
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={Link} to='/generos' className='opc'>
                          Genêros
                        </NavLink>
                      </NavItem>
                   </Nav>
                </Collapse>
        </div>
     </Navbar>
  )
}

export default Header