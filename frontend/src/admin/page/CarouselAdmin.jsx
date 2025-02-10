import { Link } from "react-router-dom"

const CarouselAdmin = () => {
  return (
    <div className="flex items-center justify-center gap-5">
      <Link to="/admin/upload-carousel" className="text-white cursor-pointer px-5 py-4 rounded-xl bg-green-400 hover:bg-green-500">Upload Image</Link>
      <Link to="/view" className="text-white cursor-pointer px-5 py-4 rounded-xl bg-green-400 hover:bg-green-500">View Image</Link>
    </div>
  )
}
export default CarouselAdmin