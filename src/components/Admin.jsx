import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'
import axios from 'axios'


const Admin = (props) => {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [edit, setEdit] = useState(false)
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [id, setId] = useState('')
  useEffect(() => {
    if(auth.currentUser){
      setUser(auth.currentUser)
      getArticle()

    }else{
      console.log('Err');
      props.history.push('/login')
    }
  }, [props.history])

  const saveArticle = async (e) => {
    e.preventDefault()
    try {
      console.log('Save');
      if (!name.trim()){
        setError('Escriba un nombre para el articulo')
        return
      }else if (!description.trim()){
        setError('Escriba una descripción para el artículo')
        return
      }else if (!category.trim()){
        setError('Eliga una categoría')
        return
      }else if (parseInt(price) <= 0){
        console.log(typeof(price));
        setError('Indique un precio valido')
        return
      }
      const newArticle = {
        name: name,
        description: description,
        category: category,
        price: price
      }
      console.log(newArticle);
      setError(null)
      if (!edit){
        console.log('Guardando');
        addArticle(newArticle)
      }else{
        console.log('Editando');
        editArticle(newArticle)
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  const addArticle = async(newArticle) => {
    try {
      const url = 'https://backendode.herokuapp.com/api/saveArticle'
      await axios.post(url, newArticle)
      limpiar()
    } catch (e) {
      console.log(e);
    } finally {
      await getArticle()

    }
  }

  const editArticle = async(newArticle) => {
    try {
      console.log('Funcion editar');
      const url =  `https://backendode.herokuapp.com/api/updateArticle/${id}`
      await axios.put(url, newArticle)
      limpiar()
    } catch (e) {
      console.log(e);
    } finally {
      await getArticle()

    }
  }

  const getArticle = async() => {
    try {
      const url = 'https://backendode.herokuapp.com/api/getArticles'
      const data = await axios.get(url)
      const articles = data.data.articles
      setArticles(articles)

    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  const aEdicion = (item) =>{
    console.log(item._id);
    setName(item.name)
    setDescription(item.description)
    setCategory(item.category)
    setPrice(item.price)
    setEdit(true)
    setId(item._id)
  }

  const eliminar = async(id) => {
    console.log(id);
    try {
      const url =  `https://backendode.herokuapp.com/api/deleteArticle/${id}`
      const res = await axios.delete(url)
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      await getArticle()
    }
  }

  const limpiar = () =>{
    setName('')
    setDescription('')
    setCategory('')
    setPrice('')
    setError(null)
    setEdit(false)
  }
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
          <form onSubmit={ saveArticle }>
            {
              error && (
                <div className = "alert alert-danger">
                  {error}
                </div>
              )
            }
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Nombre</label>
              <input type="text" className="form-control" id="name" placeholder="Ingrese el nombre del articulo" onChange = {e => setName(e.target.value)} value = {name}/>
            </div>
            <div className="form-group">
             <label htmlFor="exampleFormControlTextarea1">Descripción</label>
             <textarea className="form-control" id="description" rows="3" onChange = {e => setDescription(e.target.value)} value = {description}></textarea>
           </div>
           <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">Cateogira</label>
            <select  className="form-control" onChange={(e) => {
              setCategory(e.target.value)
            }}
            value = {category} >
              <option  hidden >Seleccione una opción...</option>
              <option>Accesorios</option>
              <option>Baños</option>
              <option>Decoracion</option>
              <option>Herramientas</option>
              <option>Juegos</option>
              <option>Otra</option>
            </select>
          </div>
           <div className="form-group">
             <label htmlFor="exampleInputEmail1">Precio</label>
             <input type="number" className="form-control" id="category" placeholder="Ingrese el precio del articulo" onChange = {e => setPrice(e.target.value)} value = {price} />
           </div>

            <button type="submit" className={edit ? 'btn btn-warning' : 'btn btn-success'}>{edit ? "Editar" : 'Guardar'}</button>
          </form>
        </div>
        <div className = "col-sm-12 col-sm-12 col-md-6 col-lg-6">
        <h2 className = "text-center">Listado de articulos</h2>
        <ul className = "list-groups">
          {
            articles.map(item => (
              <li className = "list-group-item mb-3" key={item._id}>
                Articulo: {item.name} <br />
                Descripción: {item.description} <br />
                Categoría: {item.category} <br />
                Precio: Q{item.price}
                  <button className = "btn btn-warning btn-sm float-right btn-sm mx-2"
                          onClick={() => aEdicion(item)}>Editar</button>
                  <button className = "btn btn-danger btn-sm float-right btn-sm mx-2"
                          onClick = {() => eliminar(item._id)}>Eliminar</button>
              </li>
            ))
          }
        </ul>
      </div>
      </div>

    </div>
  )
}

export default withRouter(Admin)
