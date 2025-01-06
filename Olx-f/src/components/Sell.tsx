import {useState} from 'react'
import {db , storage} from '../firebase/setUp'
import {addDoc , collection} from 'firebase/firestore'
import {ref , uploadBytes , getDownloadURL} from 'firebase/storage'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Sell = () => {

  const [title , setTitle] = useState('')
  const [category , setCategory] = useState('')
  const [description , setDescription] = useState('')
  const [price , setPrice] = useState<number | undefined>(undefined)
  const [image , setImage] = useState<File | null>(null)
  const [error , setError] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault()

    if(!title || !category || !description || !price || !image){
      setError('Please fill all fields')
      return;;
    }

    try {
      const imageRef = ref(storage, `products/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db,'products'),{
        title,
        category,
        description,
        price,
        imageUrl,
        createdAt:new Date()
      })

      setTitle("");
      setCategory("");
      setDescription("");
      setPrice(undefined);
      setImage(null);
      setError("");

      toast.success('Product submitted Successfuly...',{
        position:'top-right',
        autoClose:3000
      })
      setTimeout(() => {
        navigate('/')
      }, 2000);

      
    } catch (error) {
      console.error("error adding document:",error)
      setError('Failed to submit Product . Please try again')
    }
  }


  return (
    <div>
        <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Sell Your Product</h1>
      <form onSubmit={handleSubmit}  className="space-y-6">
      {error && <p className="text-red-900 text-center font-semibold text-lg">{error}</p>}
      <div>
          <label className="block text-sm font-medium text-gray-600">Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea 
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Price</label>
          <input 
            type="number" 
            value={price || ''}
            onChange={(e)=>setPrice(parseFloat(e.target.value))}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Image</label>
          <input 
            type="file" 
            onChange={(e)=>setImage(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  )
}

export default Sell
