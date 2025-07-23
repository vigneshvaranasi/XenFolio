import { Link } from "react-router-dom"
import FolioCard from "../components/ui/FolioCard"

let foliosData = [
  {
    folioName: 'Folio 1',
    folioPreviewImage: 'https://vigneshvaranasi.in/assets/trackcode-BwNHWpi-.png',
    creators: {
      developers: [
        {
          name: "Developer 1",
          avatar: "https://avatars.githubusercontent.com/u/134832213?v=4"
        },
        {
          name: "Developer 2",
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
        },
        {
          name: "Developer 3",
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
        }
      ],
      designers: [
        {
          name: "Designer 1",
          avatar: "https://avatars.githubusercontent.com/u/134832213?v=4"
        },
        {
          name: "Designer 2",
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
        },
        {
          name: "Designer 3",
          avatar: "https://avatars.githubusercontent.com/u/134832213?v=4"
        }
      ],
    },
    likes: ['user 1 ', 'user 2', 'user 3']
  },
  {
    folioName: 'Folio 2',
    folioPreviewImage: 'https://pavanc.me/_next/static/media/xenKitPreview.804810cb.gif',
    creators: {
      developers: [
        {
          name: "Developer 1",
          avatar: "https://avatars.githubusercontent.com/u/134832213?v=4"
        },
        {
          name: "Developer 2",
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
        },
        {
          name: "Developer 3",
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
        }
      ],
      designers: [
        {
          name: "Designer 1",
          avatar: "https://avatars.githubusercontent.com/u/134832213?v=4"
        },
        {
          name: "Designer 2",
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
        },
        {
          name: "Designer 3",
          avatar: "https://avatars.githubusercontent.com/u/134832213?v=4"
        }
      ],
    },
    likes: ['user 1 ', 'user 2', 'user 3']
  },
  {
    folioName: 'Folio 3',
    folioPreviewImage: 'https://pavanc.me/_next/static/media/askItPreview.de769a9d.gif',
    creators: {
      developers: [
        {
          name: "Developer 1",
          avatar: "https://avatars.githubusercontent.com/u/134832213?v=4"
        },
        {
          name: "Developer 2",
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
        },
        {
          name: "Developer 3",
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
        }
      ],
      designers: [
        {
          name: "Designer 1",
          avatar: "https://avatars.githubusercontent.com/u/134832213?v=4"
        },
        {
          name: "Designer 2",
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
        },
        {
          name: "Designer 3",
          avatar: "https://avatars.githubusercontent.com/u/134832213?v=4"
        }
      ],
    },
    likes: ['user 1 ', 'user 2', 'user 3']
  }
]

const FoliosPage = () => {
  // useContext to get foliosData

  return (
    <div className="flex flex-col justify-center pt-4 md:pt-6">
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