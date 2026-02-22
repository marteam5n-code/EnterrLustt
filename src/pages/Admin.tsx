import { useState } from "react";
import { useStore } from "../contexts/StoreContext";

export function Admin(){

  const { addProduct, products, deleteProduct } = useStore();

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [image,setImage] = useState("");

  function handleAdd(){

    if(!name || !price || !image){
      alert("Completa todos los campos 👑");
      return;
    }

    addProduct({
      id: Date.now().toString(),
      name,
      price: Number(price),
      description: "Producto agregado desde admin",
      images:[image],
      category:"General",
      sizes:["S","M","L"],
      stock:10,
      onSale:false,
      featured:false,
      visible:true
    });

    setName("");
    setPrice("");
    setImage("");
  }

  return(
    <div className="p-6">

      <h2 className="text-2xl mb-4">👑 Panel Admin</h2>

      <div className="flex flex-col gap-2 max-w-md">

        <input
          placeholder="Nombre producto"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

        <input
          placeholder="Precio"
          value={price}
          onChange={e=>setPrice(e.target.value)}
        />

        <input
          placeholder="URL imagen"
          value={image}
          onChange={e=>setImage(e.target.value)}
        />

        <button onClick={handleAdd}>
          Agregar producto
        </button>

      </div>

      <h3 className="mt-6 text-xl">Productos existentes</h3>

      {products.map((p:any)=>(
        <div key={p.id} className="border p-3 mt-2">

          <p>{p.name}</p>
          <p>${p.price}</p>

          <button
            onClick={()=>deleteProduct(p.id)}
            className="bg-red-500 text-white px-3 py-1"
          >
            Eliminar
          </button>

        </div>
      ))}

    </div>
  );
}