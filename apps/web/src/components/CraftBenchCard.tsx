import githubLogo from '../assets/githubLogo.svg'
type CraftBenchCardProps = {
    bench: {
        benchName: string,
        folioName: string,
        repoName: string,
        status: string,
        folioAvatar: string
    }
    username: string
}

function CraftBenchCard(benchData: CraftBenchCardProps) {
    return (
        <div
            className={
                ` craftBenchCard
                bg-[#68686815] rounded-lg text-neutral-300                  
                hover:bg-[#68686811] hover:border-[#53535380]
                flex items-start justify-between w-full md:w-[49%]
                border border-[#242424] p-2
                transition-all-ease-in-out duration-300
                `
            }
        >
            <div className="flex items-center">
                <div className='flex flex-col'>
                    <div className='flex items-center'>
                        <img src={benchData.bench.folioAvatar} className="w-8 h-8 rounded-full mr-3" alt="" />
                        <div className="flex flex-col">
                            <h1 className="text-xl text-[#e6edf3]">{benchData.bench.benchName}</h1>
                            <h2 className="text-sm text-[#e6edf3]">{benchData.bench.folioName}</h2>
                        </div>
                    </div>
                    <div  className='mt-2 rounded-full bg-[#1A1A1A] w-fit drop-shadow-[0_0_10px_#1A1A1A12] font-sans font-semibold'>
                        <a href={`https://github.com/${benchData.username}/${benchData.bench.repoName}`}>
                            <div className='flex items-center  px-2 py-1'>                                <img src={githubLogo} className='w-4 h-4' alt="" />
                                <p className='ml-1 lowercase text-sm'>
                                    {benchData.username}/{benchData.bench.repoName}
                                </p>
                            </div>
                        </a>
                    </div>
                </div>

            </div>
            <div className="flex flex-col items-end"> 
                {
                    benchData.bench.status === 'published' ?
                        <h2 className="bg-[#2c583f] rounded-full px-2 text-[#050e05] flex justify-evenly items-center text-sm"> 
                            <span className='bg-[#289d65] w-3 h-3 rounded-full border border-[#289d659a] mr-1'></span>
                            {benchData.bench.status}
                        </h2>
                        :
                        <h2 className="bg-[#8a622d] rounded-full px-2 text-[#0c0801] flex justify-evenly items-center text-sm">
                            <span className='bg-[#cf8e1c] w-3 h-3 rounded-full border border-[#cf8e1c9a] mr-1'></span>
                            {benchData.bench.status}
                        </h2>
                }
                {/* <button>...</button> */}
            </div>
        </div>
    )
}

export default CraftBenchCard