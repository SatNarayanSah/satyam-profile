export interface ProfileData {
    name: string;
    nickname: string
    avatar: string;
    bannerImages: string;
    title: string;
    subtitles: string[];
    socialLinks: { icon: string; url: string }[];
    buttons: { text: string; url: string; icon: string }[];
  }

  export interface ResumeData {
    ResumeTitle: string;
    experiences: {
      title: string;
      company: string;
      duration: string;
      description: string;
      logo?: string; // Optional field for the company logo
    }[];
    educations: {
      institution: string;
      Field: string;
      duration: string;
      description: string; // Fixed typo: "desciption" -> "description"
    }[];
    skills: {
      name: string;
      icon?: string; // Optional field for skill icon
      percent: number; // Changed "level" to "percent" to match your JSON
    }[];
    knowledge: {
      name: string;
    }[];
    languages: {
      name: string;
      level: number; // Kept "level" as it matches your JSON
    }[];
  }
  
  export interface Skills{
    name: string;
    icon: string;
    percent: number;
  }
  
  export interface Language {
    name: string;
    level: number; // Percentage (0-100)
  }
  export interface ProjectButton {
    text: string;
    url: string;
    icon: string;
  }
  

  export interface Project {
    id: number;
    image: string;
    alt: string;
    title: string;
    githubLink: string;
    livePreviewLink: string;
    tags: string[];
    buttons: ProjectButton[];
  }
  