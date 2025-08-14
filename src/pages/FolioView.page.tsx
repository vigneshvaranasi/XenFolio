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
import { createCraftBench, downloadCode, publishFolio } from "../handler/craftBenchHandler";

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
  const [finishCraftBenchModal, setFinishCraftBenchModal] =
    useState<boolean>(false);

  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const [publishLoading, setPublishLoading] = useState<boolean>(false);

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

  const { user } = useUserContext();
  const { setMeta, meta } = useCraftBenchContext();
  const navigate = useNavigate();

  function handleCreateCraftBench() {
    if (craftBenchNameRef.current) {
      if (craftBenchNameRef.current.value.trim() === "") {
        toast.error("Please give a nice name to your Craft Bench");
        return;
      }
      setMeta({
        folioName: currFolio?.folioName || folioName || "",
        folioAvatar: currFolio?.folioAvatar || "",
        craftName: craftBenchNameRef.current.value,
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
      if (craftBenchNameRef.current.value.trim() === "") {
        toast.error("Please give a nice name to your Craft Bench");
        return;
      }

      let newMeta = {
        folioName: currFolio?.folioName || folioName || "",
        folioAvatar: currFolio?.folioAvatar || "",
        craftName: craftBenchNameRef.current.value,
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
          setFinishCraftBenchModal(true);
        }
      } catch (err: any) {
        toast.error("Error creating Craft Bench");
      }

      setGetThisModal(false);
    }
  }

  const handleDownloadCode = async () => {
    setDownloadLoading(true);
    try {
      if (meta?.craftId) {
        const folioCode = await downloadCode(meta.craftId);
        if (typeof folioCode !== "string") {
          console.error(
            "folioCode is not a string, received:",
            typeof folioCode
          );
          return;
        }
        const blob = new Blob([folioCode], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${meta.craftName}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Code downloaded successfully");
      } else {
        throw new Error("craftId is undefined, cannot download code.");
      }
    } catch (err: any) {
      toast.error("Oh-oh! The Craft Bench could not be downloaded.");
      console.error("Error downloading code:", err);
    } finally {
      setDownloadLoading(false);
    }
  };

  const handlePublishToGitHub = async () => {
    setPublishLoading(true);
    try {
      if (meta?.craftId === undefined) {
        console.error("craftId is undefined, cannot publish to GitHub.");
        throw new Error("No Craft Id, Restart CraftBench");
      }
      const publishStatus = await publishFolio(meta?.craftId);
      if (publishStatus.error) {
        console.error("Error publishing to GitHub:", publishStatus.message);
        throw new Error(publishStatus.message);
      } else {
        toast.success("Your Folio is live at " + publishStatus.folioUrl);
        console.log(publishStatus);
      }
    } catch (err: any) {
      toast.error("Oh-oh! There was an error publishing to GitHub.");
      console.error("Error publishing to GitHub:", err);
    } finally {
      setPublishLoading(false);
      setFinishCraftBenchModal(false);
    }
  };

  return (
    <>
      <div className="pt-4 md:pt-6">
        <div className="flex flex-row justify-between w-full mb-2">
          <div className="flex flex-col">
            <p className="text-3xl md:text-2xl mb-2">
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
          className="w-full bg-white h-[60vh] md:h-[65vh] rounded-t-lg"
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
      {finishCraftBenchModal && (
        <Modal
          isOpen={finishCraftBenchModal}
          onClose={() => setFinishCraftBenchModal(false)}
          title="Craft Bench Created"
        >
          <div className="flex gap-4">
            <Button
              text="Download Code"
              variant="primary"
              onClick={() => {
                handleDownloadCode();
              }}
              loading={downloadLoading}
            />
            <Button
              text="Publish to GitHub"
              variant="warning"
              onClick={() => {
                handlePublishToGitHub();
              }}
              loading={publishLoading}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default FolioViewPage;
