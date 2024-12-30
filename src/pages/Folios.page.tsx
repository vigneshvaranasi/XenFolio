import { Link } from "react-router-dom"
import FolioCard from "../components/ui/FolioCard"
import { Outlet } from "react-router-dom"

let foliosData = [
  {
    folioName: 'Folio 1',
    folioAvatar: 'https://vigneshvaranasi.in/assets/TrackCode-B1EeffBo.png',
    creators: {
      developerName: ['Developer 1', 'Developer 2', 'Developer 3'],
      designerName: ['Designer 1', 'Designer 2', 'Designer 3'],
    },
    likes:['user 1 ', 'user 2', 'user 3']
  },
  {
    folioName: 'Folio 2',
    folioAvatar: 'https://vigneshvaranasi.in/assets/TrackCode-B1EeffBo.png',
    creators: {
      developerName: ['Developer 1', 'Developer 2', 'Developer 3'],
      designerName: ['Designer 1', 'Designer 2', 'Designer 3'],
    },
    likes:['user 1 ', 'user 2', 'user 3']
  },
  {
    folioName: 'FolioName',
    folioAvatar: 'https://vigneshvaranasi.in/assets/TrackCode-B1EeffBo.png',
    creators: {
      developerName: ['Developer 1', 'Developer 2', 'Developer 3'],
      designerName: ['Designer 1', 'Designer 2', 'Designer 3'],
    },
    likes:['user 1 ', 'user 2', 'user 3']
  }
]

const FoliosPage = () => {

  return (
    <div className="flex flex-col justify-center md:pt-6">
      <h1 className='text-3xl md:text-4xl mb-8'>Folios</h1>
      <div className={
        `flex flex-col md:flex-row w-full flex-wrap
        gap-4 
         `
      }>
        {
          foliosData.map((folio, index) => {
            return (
              <Link className=" md:w-[48%]" to={`/folios/${folio.folioName.split(' ').join('')}`} key={index}>
                <FolioCard key={index} folio={folio} />
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default FoliosPage