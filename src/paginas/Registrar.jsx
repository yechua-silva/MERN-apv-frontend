import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'


const Registrar = () => {
    // USESTATE
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, sePassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

    const [ alerta, setAlerta ] = useState({})

    // FUNCIONES
    // Validacion de campos
    const handleSubmit = async e => {
        e.preventDefault()

        // Validar campos vacios
        if( [ nombre, email, password, repetirPassword ].includes('') ) {
            setAlerta({ msg: 'Hay campos vacios', error: true });
            return
        } 

        // Validar password = repetirPassword
        if( password!== repetirPassword ) {
            setAlerta({ msg: 'Las contraseñas no coinciden', error: true });
            return
        }

        // Validar logitud de password
        if( password.length < 6 ) {
            setAlerta({ msg: 'La contraseña debe tener al menos 6 caracteres', error: true });
            return
        }

        setAlerta({})

        // Crearcion de usuario en API
        try {
            await clienteAxios.post(`/veterinarios`, { nombre, email, password })

            setAlerta({
                msg: 'Creado, revisa tu email. Verifica spam si no lo ves',
                error: false
            })

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    // Verirficar el mensaje de error
    const { msg } = alerta

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu Cuenta y Administra tus
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>

            <div 
                className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'
            >

                { msg && <Alerta 
                    alerta = {alerta}
                />}

                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input 
                            type="text" 
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            placeholder="Crea tu Contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={(e) => sePassword(e.target.value)}
                        />
                    </div >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Repetir Contraseña
                        </label>
                        <input 
                            type="password" 
                            placeholder="Repite tu Contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={(e) => setRepetirPassword(e.target.value)}
                        />
                    </div >
                    <input 
                        type="submit"
                        value="Crear tu Cuenta"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/">¿Ya tienes una cuenta? Inicia Sesion
                    </Link>
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/olvide-password">Olvide mi Contraseña
                    </Link>
                </nav>
            </div>
        </>
    )
}


export default Registrar;