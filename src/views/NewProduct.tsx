import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";
export async function action({request}: ActionFunctionArgs){
   const data = Object.fromEntries(await request.formData());
   let error = ''
   if(Object.values(data).includes('')){
      error = 'Todos los campos son obligatorios'
   }
   if(error.length){
      return error
   }
   await addProduct(data)
   return redirect('/')
   // en esta version de react router dom con request y actions tienes que retornar siempre algo a la pantalla o rediccionar al usurario
}
export default function NewProduct() {
   
   const error = useActionData() as string
   // para obtener el 'return' de una funcion aparte, en este caso el de action
   return (
      <>
         <div className=" flex justify-between">
            <h2 className=" text-4xl font-black text-slate-500">
               Registrar Productos
            </h2>
            <Link
               to="/"
               className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
            >
               Volver a Productos
            </Link>
         </div>
         {error && <ErrorMessage>{error}</ErrorMessage>}
         <Form className="mt-10"
         method="POST"
         >
            <ProductForm/>
            <input
               type="submit"
               className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
               value="Registrar Producto"
            />
         </Form>
      </>
   );
}
