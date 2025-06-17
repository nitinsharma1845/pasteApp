
import { Link} from "react-router";

const NotFound = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
        <h1 className='text-5xl mb-3'>
            404 NOT FOUND 
        </h1>
        <h2 className='text-xl'>Are you lost ? Go to </h2>
        <Link className="text-blue-500 border-b text-xl" to={'/'}>Home</Link>
        
    </div>
  )
}

export default NotFound