import { useState, useEffect } from "react";
import type { ProfileData } from "~/types/types";
import ProfileCard from "./ProfileCard";

export default function Profile() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data asynchronously
        const fetchData = async () => {
            try {
                const response = await fetch("/data/data.json"); // Adjust the path if needed
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = (await response.json()) as ProfileData;
                setProfile(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    if (error) {
        return <div className="text-white">Error: {error}</div>;
    }

    if (!profile) {
        return <div className="text-white">No profile data available.</div>;
    }

    return (
        <div className=" flex items-center justify-center">
            <ProfileCard profile={profile} />
        </div>
    );
}