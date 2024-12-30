import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import pallete from "../assets/palleteBordered.svg"
import codeBordered from "../assets/codeBordered.svg";
const FolioViewPage = () => {
  const { folioName } = useParams<{ folioName: string }>();

  console.log("Hello, folioName:", folioName);

  return (
    <div className="md:pt-6">
      <div className="flex flex-row justify-between w-full mb-8">
        <div className="flex flex-col">
          <h1 className=' text-3xl md:text-4xl mb-2'>
            <Link to='/folios'>Folios </Link>
            / {folioName}
          </h1>

          <div className="flex gap-2">
            <Button text="Get This" variant="secondary" className="text-white" />
            <Button text="Preview" variant="secondary" className="text-white" />
          </div>

        </div>

        <div className="flex flex-col text-xl">
          <p>🎨</p>
          <p>👨‍💻</p>
        </div>

      </div>

      <div className="w-full bg-slate-400 h-[100vh] rounded-t-lg">

      </div>

    </div>
  );
};

export default FolioViewPage;
