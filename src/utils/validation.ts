import { FolioConfig } from '../types/folioConfig'

export function validateEmail (email: string) {
  if (email.length === 0) {
    return true
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export function validateURL (url: string) {
  if (url.length === 0) {
    return true
  }
  const re = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/i
  return re.test(String(url).toLowerCase())
}

export function validateImageURL (url: string) {
  if (url.length === 0) {
    return true
  }
  if (!validateURL(url)) {
    return false
  }
  const re = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i
  return re.test(String(url).toLowerCase())
}

export function validatePersonalInformation (currentConfig: FolioConfig): {
  isValid: boolean
  message: string
} {
  if (!currentConfig) {
    return {
      isValid: false,
      message: 'Craftbench cannot be empty!'
    }
  }
  const { 
    name,
    email,
    githubLink,
    linkedinLink,
    twitterLink,
    resumeLink
   } =
    currentConfig.personalInformation

  let errorMessage = ''
  if (!name || name.length === 0) {
    errorMessage = 'Name is required.'
  }
  if (!email || email.length === 0 || !validateEmail(email)) {
    errorMessage += 'Email is required and must be valid'
  }
  if (
    (githubLink && !validateURL(githubLink)) ||
    (linkedinLink && !validateURL(linkedinLink)) ||
    (twitterLink && !validateURL(twitterLink)) ||
    (resumeLink && !validateURL(resumeLink))
  ) {
    errorMessage += 'All links must be valid URLs.'
  }

  if (errorMessage.length > 0) {
    return {
      isValid: false,
      message: errorMessage
    }
  }
  return {
    isValid: true,
    message: 'Proceed to Skills'
  }
}

export function validateExperience (currentConfig: FolioConfig): {
  isValid: boolean
  message: string
} {
  if (!currentConfig) {
    return {
      isValid: false,
      message: 'Craftbench cannot be empty!'
    }
  }
  const { workExperience } = currentConfig
  for (const experience of workExperience) {
    if (!experience.role || experience.role.length === 0) {
      return {
        isValid: false,
        message: 'Role in Work Experience cannot be empty!'
      }
    }
    if (!experience.company || experience.company.length === 0) {
      return {
        isValid: false,
        message: 'Company in Work Experience cannot be empty!'
      }
    }
  }

  return {
    isValid: true,
    message: 'Proceed to Projects'
  }
}

export function validateProjects (currentConfig: FolioConfig) {
  if (!currentConfig) {
    return {
      isValid: false,
      message: 'Craftbench cannot be empty!'
    }
  }
  const { projects } = currentConfig

  for (const project of projects) {
    if (!project.title || project.title.length === 0) {
      return {
        isValid: false,
        message: 'Title in Project cannot be empty!'
      }
    }
    if (!project.image || !validateImageURL(project.image)) {
      return {
        isValid: false,
        message: 'Image URL in Project must be a valid image URL!'
      }
    }
  }
  return {
    isValid: true,
    message: 'Proceed to Education'
  }
}
