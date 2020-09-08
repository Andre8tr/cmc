import React, { useState, useCallback } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(null)
  const [registro, setRegistro] = useState(true)

  const procesarDatos = e => {
    e.preventDefault()
    if(!email.trim()){
      setError('Por favor, ingrese un correo valido');
      return
    }

    if(!pass.trim()){
      setError('Por favor, ingrese una contraseña');
      return
    }

    if(pass.length < 6){
      setError('La contraseña debe de ser mayor a 6 caracteres');
      return
    }
    setError(null)
    if(registro){
      registrar()
    }else if(!registro){
      ingresar()
    }
  }

  const registrar = useCallback(async() => {
    try {
      await auth.createUserWithEmailAndPassword(email, pass)
      props.history.push('/admin')
      limpiar()
    } catch (e) {
      console.log(e);
      if(e.code === 'auth/invalid-email'){
        setError('El formato del correo no es el correcto, revisa que tenga un @ y termine en un dominio valido')
      }else if (e.code === 'auth/email-already-in-use'){
        setError('El correo ingresado ya esta en uso, por favor utiliza uno diferente')
      }
    } finally {
      //limpiar()
    }
  },[email, pass, props.history])

  const ingresar = useCallback(async() => {
    try {
      await auth.signInWithEmailAndPassword(email, pass)
      props.history.push('/admin')
    } catch (e) {
      console.log(e);
      if(e.code === 'auth/wrong-password'){
        setError('Tu contraseña no es valida, por favor revisa tus datos')
      }else if (e.code === 'auth/user-not-found'){
        setError('El correo no existe, por favor revisa tus datos')
      } else if(e.code === 'auth/invalid-email'){
        setError('El formato del correo no es el correcto, revisa que tenga un @ y termine en un dominio valido')
      }
    } finally {
      limpiar()
    }
  }, [email, pass, props.history])

  const limpiar = () => {
    setEmail('')
    setPass('')
    setError(null)
    setRegistro(true)
  }
  return(
    <div className = "mt-5">
      <h3 className = "text-center">{registro ? 'Registro nuevo usuario' : 'Acceder'}</h3>
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
            <input type="password"
                     className="form-control mb-2"
                     placeholder="Ingrese una contraseña"
                     onChange = {e => setPass(e.target.value)}
                     value = {pass}
              />
            <button className = "btn btn-success btn-lg btn-block" type="submit">
              {registro ? "Registrarse" : 'Ingresar'}
            </button>
            <button className = "btn btn-info btn-lg btn-block"
                    onClick = {() => setRegistro(!registro)}
                    type="button"
                    >
              {registro ? '¿Ya tienes una cuenta?' : 'Registrarme'}
            </button>
            {
              !registro ? (<button className = "btn btn-danger btn-sm mt-2"
                      onClick = {() => props.history.push('/reset')}
                      type="button"
                      >
                Recuperar contraseña
              </button>) : null
            }

          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login)
