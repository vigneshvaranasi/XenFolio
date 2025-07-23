export type folioConfig = {
    personalInformation:{
        name:string;
        email:string;
        bio:string;
        about:string;
        githubLink:string;
        linkedinLink:string;
        twitterLink: string;
        resumeLink:string;
    }
    skills:{
        languages?: string[];
        tools?: string[];
        frameworks?: string[];
    }
    projects?:[
        {
            title: string;
            description: string;
            techStack: string[];
            image: string;
            repoLink: string;
            liveLink: string;
        }
    ],
    workExperience?: [
        {
            role: string;
            company: string;
            techStack: string[];
            description: string;
        }
    ],
    meta:{
        folioName: string;
        folioId: string;
        craftName:string;
        craftId:string;
        repoLink?:string;
        status: 'inProgress'|'published';
        createdAt?: string;
        updatedAt?: string;
    }
}