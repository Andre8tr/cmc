import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { auth } from '../firebase'

const Navbar = (props) => {
  const cerrarSesion = () => {
    auth.signOut()
        .then(() => {
          props.history.push('/login')
        })
  }
  return(
    <div className = "navbar navbar-dark bg-success">
      <Link className = "navbar-brand" to="/">
        CMC
      </Link>
      <div>
        <div className = "d-flex">
          <NavLink className = "btn btn-success mr-2" to ="/" exact>
            Inicio
          </NavLink>
          {
            props.firebaseUser !== null ?
            (<NavLink className = "btn btn-success mr-2" to ="/admin" exact>
              Admin
            </NavLink>) : null

          }
          {
            props.firebaseUser !== null ?
            (<button className = "btn btn-success mr-2"
                     onClick={() => cerrarSesion()}
            >Cerrar sesion</button>) :
             (<NavLink className = "btn btn-success mr-2" to ="/login" exact>
              Login
            </NavLink>)
          }

        </div>
      </div>
    </div>
  )
}

export default withRouter(Navbar)
