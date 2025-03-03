import ProfileCard from "./ProfileCard";
import data from "../../data/data.json";

export default function Profile() {
    const { name, nickname, avatar, bannerImages, title, socialLinks, buttons } = data;

    // Create a profile object to pass to the ProfileCard component
    const profile = {
        name,
        nickname,
        avatar,
        bannerImages,
        title,
        socialLinks,
        buttons
    };

    return (
        <div className="w-full px-4 lg:px-0 lg:w-96 flex items-center justify-center">
            <ProfileCard profile={profile} />
        </div>
    );
}