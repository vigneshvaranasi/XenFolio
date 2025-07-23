export interface Person{
    name: string,
    avatar: string
}

type FolioCardProps = {
    folio: {
        folioName: string,
        folioPreviewImage: string,
        creators: {
            developers: Person[],
            designers: Person[]
        },
        likes: Array<string>
    }
}

const FolioCard = ({ folio }: FolioCardProps) => {
    return (
        <div className={
            `md:w-full  rounded-lg 
            text-neutral-300 bg-[#68686811]
            hover:backdrop-brightness-75 hover:bg-[#68686811] hover:border-[#53535380]
            border border-[#242424]
            transition-all-ease-in-out duration-300
            `
        }>
            <div className="hover:backdrop-brightness-75"
            >

                <img className="rounded-t-lg h-[220px] object-cover w-full" src={folio.folioPreviewImage} alt={folio.folioName} />
            </div>

            <div className="px-2 flex justify-between items-center">
                {/* ToDo: Add Badged ToolTip for Credits */}
                <h2 className="text-xl my-2">{folio.folioName}</h2>
                <div className="flex gap-2 ">
                    
                </div>
            </div>
        </div>
    )
}
export default FolioCard