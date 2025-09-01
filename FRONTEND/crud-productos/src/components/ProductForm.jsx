import { useEffect, useState } from 'react'
import { createProduct, getProduct, updateProduct } from '../Api/products'
import { useNavigate, useParams } from "react-router"
import { toast } from "react-hot-toast"


export default function ProductForm(){

    const [product, setProducts] = useState({
        nombre: '',
        precio: 0,
        descripcion: ''
    })

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const loadProduct = async () => {
            if(params.id){
                const response = await getProduct(params.id)
                setProducts(response.data)
            }
        }
        loadProduct()
    }, [params.id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(params.id){
            await updateProduct(params.id, product)
            toast.success('Producto modificado correctamente')
        }else{
            await createProduct(product)
            toast.success('Producto creado correctamente')
        }
        
        navigate('/')
    }
    console.log(params.id)

    return(
        <div>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Nombre</label>
                <input
                    value={product.nombre}
                    type="text"
                    onChange={(e) => setProducts({ ...product, nombre: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
                </div>

        
                <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Precio</label>
                <input
                    value={product.precio}
                    type="number"
                    onChange={(e) => setProducts({ ...product, precio: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
                </div>

        
                <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Descripción</label>
                <textarea
                    value={product.descripcion}
                    onChange={(e) => setProducts({ ...product, descripcion: e.target.value })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                ></textarea>
                </div>

        
                <div className="mt-4">
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg">Guardar</button>
                <button className="bg-red-700 text-white py-2 px-4 rounded-lg ml-2">Cancelar</button>
                </div>
            </form>
        </div>
    )
}