import { Link } from "react-router-dom"
import FolioCard from "../components/ui/FolioCard"
import { useEffect, useState } from "react"
import { getAllFolios } from "../handler/folioHandlers"
import { Folio } from "../types/folioConfig";


const FoliosPage = () => {
  const [foliosData, setFoliosData] = useState<Folio[]>([]);
  useEffect(()=>{
    getAllFolios().then((data)=>{
      if(data && data.length > 0) {
        setFoliosData(data)
      }
    })
  },[])
  
  return (
    <div className="flex flex-col justify-center pt-4 md:pt-6">
      <h1 className='text-xl md:text-4xl mb-8'>Folios</h1>
      <div className={
        `flex flex-col md:flex-row w-full flex-wrap
        gap-4 
         `
      }>
        {
          foliosData && foliosData.map((folio, index) => {
            return (
              <Link className=" md:w-[48%]" to={`/folios/${folio.folioName.split(' ').join('')}`} key={index} >
                <FolioCard key={folio._id} folio={folio} />
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default FoliosPage