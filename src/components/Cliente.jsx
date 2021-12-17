import { useNavigate } from 'react-router-dom';

const Cliente = ({ cliente, handleEliminar }) => {
    const { id, nombre, empresa, email, telefono, notas } = cliente;

    const navigate = useNavigate();

    return (
        <tr className="border-b hover:bg-gray-50 transition-all">
            <td className="p-3">{nombre}</td>
            <td className="p-3">
                <p><span className="text-grey-80 uppercase font-bold">Email: </span>{email}</p>
                <p><span className="text-grey-80 uppercase font-bold">Tel: </span>{telefono}</p>
            </td>
            <td className="p-3">{empresa}</td>
            <td className="p-3">
                <button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 block transition-all w-full text-white text-xs p-2 uppercase font-bold rounded-md"
                    onClick={() => navigate(`/clientes/${id}`)}
                >Ver</button>
                <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 block mt-2 transition-all w-full text-white text-xs p-2 uppercase font-bold rounded-md"
                    onClick={() => navigate(`/clientes/editar/${id}`)}
                >Editar</button>
                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 block mt-2 transition-all w-full text-white text-xs p-2 uppercase font-bold rounded-md"
                    onClick={() => handleEliminar(id)}
                >Eliminar</button>
            </td>
        </tr>
    )
}

export default Cliente
