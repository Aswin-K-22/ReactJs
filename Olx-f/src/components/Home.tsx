import {Link} from 'react-router-dom'

type productsProp = {
    products:any,
    search:any,
    menu:any
}

const Home = (props:productsProp) => {
  return (
    <div className="grid grid-cols-4">
      {props?.products?.filter((data:any)=>data?.title?.toLowerCase().includes(props?.search.toLowerCase() ? props?.search : props?.menu)).map((data:any)=>{
        return  <Link to='/details' state={{data:data}}><div className="border border-spacing-1 p-2">
            <img src={data?.image} className="w-60 h-48" alt="" />
            <h1>${data?.price}</h1>
            <h1>{data.title}</h1>
            <h1>{data.category}</h1>
        </div></Link>
      })}
    </div>
  )
}

export default Home
