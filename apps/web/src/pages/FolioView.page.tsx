import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Avatars from "../components/ui/Avatars";


let foliosData = [
  {
    folioName: 'Folio 1',
    folioPreviewImage: 'https://vigneshvaranasi.in/assets/TrackCode-B1EeffBo.png',
    creators: {
      developers: [
        {
          name: "Developer 1",
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
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
    folioPreviewImage: 'https://vigneshvaranasi.in/assets/TrackCode-B1EeffBo.png',
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
          avatar: "https://avatars.githubusercontent.com/u/121240801?v=4"
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
    folioPreviewImage: 'https://vigneshvaranasi.in/assets/TrackCode-B1EeffBo.png',
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

let folioCreators: string[] = foliosData[0].creators.developers.map(folio=> folio.avatar);

const FolioViewPage = () => {
  const { folioName } = useParams<{ folioName: string }>();
  console.log('folioName: ', folioName);

  // useContext to get foliosData
  
  let currFolio = foliosData.find(folio=>{
    let currFolioName=folio.folioName.split(' ').join("");
    console.log(currFolioName);
    return currFolioName===folioName;
  })
  console.log('currFolio: ', currFolio);

  // console.log("Hello, folioName:", folioName);

  return (
    <div className="pt-4 md:pt-6">
      <div className="flex flex-row justify-between w-full mb-2">
        <div className="flex flex-col">
          <p className='text-3xl md:text-2xl mb-2'>
            <Link className="font-light" to='/folios'>Folios </Link>
            <span className="font-light text-gray-500">
            / 
            </span>
            <span className="pl-2 font-medium">
              {folioName}
            </span>
          </p>
          <div className="flex gap-2">
            <Button text="Get This" variant="secondary" className="text-white" />
            <Button text="Preview" variant="secondary" className="text-white" />
          </div>
        </div>
      </div>
      <div className="flex md:justify-end text-lg mb-2">
        <Avatars images={folioCreators} variant="elastic"/>
      </div>
      <iframe className="w-full bg-white h-[60vh] md:h-[65vh] rounded-t-lg" src="https://askitengine.centralindia.cloudapp.azure.com/" ></iframe>
    </div>
  );
};

export default FolioViewPage;
