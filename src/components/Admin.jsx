import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'


const Admin = (props) => {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  useEffect(() => {
    if(auth.currentUser){
      console.log('Log');
      setUser(auth.currentUser)
    }else{
      console.log('Err');
      props.history.push('/login')
    }
  }, [props.history])
  return(
    <div>
      {
        user && (
          <h3>  </h3>
        )
      }
      <div className = "row">
        <div className = "col-sm-12 col-sm-12 col-md-6 col-lg-6">
          <h2>Ingresar articulo</h2>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Nombre</label>
              <input type="text" className="form-control" id="name" placeholder="Ingrese el nombre del articulo" onChange = {e => setName(e.target.value)} value = {name}/>
            </div>
            <div className="form-group">
             <label htmlFor="exampleFormControlTextarea1">Descripción</label>
             <textarea className="form-control" id="description" rows="3" onChange = {e => setDescription(e.target.value)} value = {description}></textarea>
           </div>
           <div className="form-group">
             <label htmlFor="exampleInputEmail1">Categoría</label>
             <input type="text" className="form-control" id="category" placeholder="Seleccione la categoría del articulo" onChange = {e => setCategory(e.target.value)} value = {category}/>
           </div>
           <div className="form-group">
             <label htmlFor="exampleInputEmail1">Precio</label>
             <input type="number" className="form-control" id="category" placeholder="Ingrese el precio del articulo" onChange = {e => setPrice(e.target.value)} value = {price} />
           </div>
            <button type="submit" className="btn btn-success">Guardar</button>
          </form>
        </div>
        <div className = "col-sm-12 col-sm-12 col-md-6 col-lg-6">
          <h2>Listado articulos</h2>
        </div>
      </div>

    </div>
  )
}

export default withRouter(Admin)
