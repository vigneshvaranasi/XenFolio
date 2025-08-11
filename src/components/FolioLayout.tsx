import { Outlet } from "react-router-dom"
const FolioLayout = () => {

    return (
        <div className="flex flex-col justify-center pt-6">
            {/* <h1 className='text-3xl md:text-4xl mb-8'>Folios</h1> */}
            <Outlet/>
        </div>
    )
}

export default FolioLayout