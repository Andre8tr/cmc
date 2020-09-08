import React, { useState, useCallback } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Reset = (props) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const procesarDatos = e => {
    e.preventDefault()
    if(!email.trim()){
      setError('Por favor, ingrese un correo valido');
      return
    }
    setError(null)
    restablecer()
  }

  const restablecer = useCallback(async() => {
    try {
      await auth.sendPasswordResetEmail(email)
      console.log('Correo enviado');
      props.history.push('/login')
    } catch (e) {
      setError(e)
    } finally {

    }
  },[email, props.history])
  return(
    <div className = "mt-5">
      <h3 className = "text-center">Restablecer contraseña</h3>
      <hr />
      <div className = "row justify-content-center">
        <div className = "col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <form onSubmit = {procesarDatos}>
            {
              error && (
                <div className = "alert alert-danger">
                  {error}
                </div>
              )
            }
            <input type="email"
                   className="form-control mb-2"
                   placeholder="Ingrese un email"
                   onChange = {e => setEmail(e.target.value)}
                   value = {email}
              />
            <button className = "btn btn-primary btn-lg btn-block" type="submit">
              Reiniciar contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Reset)
