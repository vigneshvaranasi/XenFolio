import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Avatars from "../components/ui/Avatars";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/ui/Modal";
import InputBox from "../components/ui/InputBox";
import { useUserContext } from "../hooks/useUserContext";
import { useCraftBenchContext } from "../hooks/useCraftBenchContext";
import { useNavigate } from "react-router-dom";
import { getAvatarByUsername, getFolioByName } from "../handler/folioHandlers";
import { Folio } from "../types/folioConfig";
import toast from "react-hot-toast";
import { createCraftBench } from "../handler/craftBenchHandler";
import { BACKEND_URL } from "../config";

const FolioViewPage = () => {
  const { folioName } = useParams<{ folioName: string }>();
  const [currFolio, setCurrFolio] = useState<Folio | null>(null);
  const [creators, setCreators] = useState<
    {
      githubUsername: string;
      avatarUrl: string;
    }[]
  >([]);
  const craftBenchNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!folioName) {
      console.error("Folio name is not provided");
      return;
    } else {
      getFolioByName(folioName).then((folio) => {
        setCurrFolio(folio);
        let creatorAvatars = folio.creator.developedBy.map((user: any) =>
          getAvatarByUsername(user.githubUsername)
        );
        Promise.all(creatorAvatars).then((avatars) => {
          setCreators(
            avatars.map((avatar, index) => ({
              githubUsername: folio.creator.developedBy[index].githubUsername,
              avatarUrl: avatar,
            }))
          );
        });
      });
    }
  }, [folioName]);

  const [getThisModal, setGetThisModal] = useState(false);

  const { user,accessToken } = useUserContext();
  const { setMeta } = useCraftBenchContext();
  const navigate = useNavigate();


  async function isCraftBenchNameAvailable(name:string){
    if (!name || name.trim() === "") {
      toast.error("Craft Bench name cannot be empty");
      return false;
    }
    if(name.split(" ").length > 1){
      toast.error("Craft Bench name cannot contain spaces");
      return false;
    }
    try{
      let header= new Headers();
      header.append("Content-Type", "application/json");
      header.append("token", `${accessToken}`);
      
      const isAvailable= await fetch(`${BACKEND_URL}/craftBench/check/${name}`,{
        headers:header
      });
      if (!isAvailable.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await isAvailable.json();
      if (!data.exists) {
        return true;
      } else {
        toast.error("Craft Bench name is already taken");
        return false;
      }
    }catch(err:any){
      toast.error("Error checking Craft Bench name availability");
      console.error("Error checking Craft Bench name availability:", err);
      return false;
    }
  }

  async function handleCreateCraftBench() {
    if (craftBenchNameRef.current) {
      const craftBenchName = craftBenchNameRef.current.value.trim();
      const isAvailable = await isCraftBenchNameAvailable(craftBenchName);
      if (!isAvailable) {
        return;
      }
      setMeta({
        folioName: currFolio?.folioName || folioName || "",
        folioAvatar: currFolio?.folioAvatar || "",
        craftName: craftBenchName,
        status: "inProgress",
        folioId: currFolio?._id || "",
      });
      setGetThisModal(false);
      navigate(
        `/craftbench/${craftBenchNameRef.current.value.split(" ").join("")}`
      );
    }
  }

  async function handleUseRecentConfig() {
    if (craftBenchNameRef.current) {
      const craftBenchName = craftBenchNameRef.current.value.trim();
      const isAvailable = await isCraftBenchNameAvailable(craftBenchName);
      if (!isAvailable) {
        return;
      }

      let newMeta = {
        folioName: currFolio?.folioName || folioName || "",
        folioAvatar: currFolio?.folioAvatar || "",
        craftName: craftBenchName,
        status: "inProgress" as "inProgress",
        folioId: currFolio?._id || "",
      };
      setMeta(newMeta);

      try {
        console.log("Finish button clicked");
        const finishCraftBench = await createCraftBench(newMeta, null, true);
        if (finishCraftBench) {
          setMeta((pre: any) => ({
            ...pre,
            craftId: finishCraftBench.craftId,
          }));
          toast.success("Hurray! Your Craft Bench has been created.");
          navigate(`/myspace`)
        }
      } catch (err: any) {
        toast.error("Error creating Craft Bench");
      }

      setGetThisModal(false);
    }
  }


  return (
    <>
      <div className="pt-4 md:pt-6">
        <div className="flex flex-row justify-between w-full mb-2">
          <div className="flex flex-col">
            <p className="text-xl md:text-2xl mb-2">
              <Link className="font-light" to="/folios">
                Folios{" "}
              </Link>
              <span className="font-light text-gray-500">/</span>
              <span className="pl-2 font-medium">{folioName}</span>
            </p>
            <div className="flex gap-2">
              <Button
                text="Get This"
                variant="secondary"
                className="text-white"
                onClick={() => {
                  if (user) {
                    setGetThisModal(true);
                  } else {
                    toast("Please log in to use this template");
                  }
                }}
              />
              <Button
                text="Preview"
                variant="secondary"
                className="text-white"
                onClick={() => {
                  if (folioName) {
                    window.open(`/folios/${folioName}.html`, "_blank", "noopener,noreferrer");
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex md:justify-end text-lg mb-2">
          <Avatars creators={creators} variant="elastic" />
        </div>
        <iframe
          className="w-full bg-white h-[60vh] md:h-[65vh] rounded-t-lg overflow-hidden"
          src={`/folios/${folioName}.html`}
        ></iframe>
      </div>
      <Modal isOpen={getThisModal} onClose={() => setGetThisModal(false)}>
        <InputBox
          key={"folioName"}
          ref={craftBenchNameRef}
          label="Craft Bench Name"
        />
        <div className="flex justify-between mt-2">
          <Button
            text="Create New"
            variant="secondary"
            className="text-white"
            onClick={() => {
              handleCreateCraftBench();
            }}
          />
          {user?.isRecentConfig && (
            <Button
              text="Use Recent Config"
              variant="secondary"
              className="text-white"
              onClick={() => handleUseRecentConfig()}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default FolioViewPage;
