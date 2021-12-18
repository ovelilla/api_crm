import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Alerta } from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup
            .string()
            .min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),
        empresa: Yup
            .string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup
            .string()
            .email('Email no válido')
            .required('El email es obligatorio'),
        telefono: Yup
            .number()
            .integer('Número no válido')
            .positive('Número no válido')
            .typeError('Número no válido'),
    });

    const handleSubmit = async (valores) => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/${cliente.id ?? ''}`;
            const respuesta = await fetch(url, {
                    method: cliente.id ? 'PUT' : 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            await respuesta.json();
            navigate('/clientes');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        cargando ? <Spinner /> :
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h2 className="text-gray-600 font-blod text-xl uppercase text-center">{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h2>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form className='mt-10'>
                                <div className='mb-4'>
                                    <label
                                        htmlFor='nombre'
                                        className='text-gray-800'
                                    >Nombre:</label>
                                    <Field
                                        type='text'
                                        name='nombre'
                                        id='nombre'
                                        className='mt-2 block w-full p-3 bg-gray-100'
                                        placeholder='Nombre del cliente'
                                    />
                                    {errors.nombre && touched.nombre && <Alerta>{errors.nombre}</Alerta>}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='empresa'
                                        className='text-gray-800'
                                    >Empresa:</label>
                                    <Field
                                        type='text'
                                        name='empresa'
                                        id='empresa'
                                        className='mt-2 block w-full p-3 bg-gray-100'
                                        placeholder='Empresa del cliente'
                                    />
                                    {errors.empresa && touched.empresa && <Alerta>{errors.empresa}</Alerta>}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='email'
                                        className='text-gray-800'
                                    >Email:</label>
                                    <Field
                                        type='email'
                                        name='email'
                                        id='email'
                                        className='mt-2 block w-full p-3 bg-gray-100'
                                        placeholder='Email del cliente'
                                    />
                                    {errors.email && touched.email && <Alerta>{errors.email}</Alerta>}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='telefono'
                                        className='text-gray-800'
                                    >Teléfono:</label>
                                    <Field
                                        type='telefono'
                                        name='telefono'
                                        id='tel'
                                        className='mt-2 block w-full p-3 bg-gray-100'
                                        placeholder='Teléfono del cliente'
                                    />
                                    {errors.telefono && touched.telefono && <Alerta>{errors.telefono}</Alerta>}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='notas'
                                        className='text-gray-800'
                                    >Notas:</label>
                                    <Field
                                        as='textarea'
                                        type='notas'
                                        name='notas'
                                        id='text'
                                        className='mt-2 block w-full p-3 bg-gray-100'
                                        placeholder='Notas del cliente'
                                    />
                                    {errors.notas && touched.notas && <Alerta>{errors.notas}</Alerta>}
                                </div>

                                <input
                                    type='submit'
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded-md hover:bg-blue-900 transition-all cursor-pointer'
                                />

                            </Form>
                        )
                    }}
                </Formik>
            </div>
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario
