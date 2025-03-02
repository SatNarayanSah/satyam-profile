export interface ProfileData {
    name: string;
    avatar: string;
    bannerImages: string;
    title: string;
    subtitles: string[];
    socialLinks: { icon: string; url: string }[];
    buttons: { text: string; url: string; icon: string }[];
  }