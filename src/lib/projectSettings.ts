import { db } from "./firebase";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";

export interface ProjectSettings {
    countries: string[];
    regions: string[];
    technologies: string[];
    statuses: string[];
    locations: string[];
}

const SETTINGS_DOC_ID = "project-config";
const SETTINGS_COLLECTION = "settings";

export const getProjectSettings = async (): Promise<ProjectSettings> => {
    const africanCountries = [
        "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo (Congo-Brazzaville)", "Democratic Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sahrawi Arab Democratic Republic", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
    ];

    const defaults: ProjectSettings = {
        countries: africanCountries,
        regions: ["West Africa", "East Africa", "Southern Africa", "Central Africa", "North Africa"],
        technologies: ["Solar PV", "Wind", "Hydro", "BESS", "Hybrid"],
        statuses: [
            "Completed",
            "Under Development",
            "Planned",
            "Operations & Maintenance",
            "Under Construction",
            "EPC Completed - Operations & Maintenance Ongoing",
        ],
        locations: []
    };

    try {
        const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Merge existing data with defaults to handle missing fields (migration)
            const merged = {
                ...defaults,
                ...data
            } as ProjectSettings;
            const statusAlias: Record<string, string> = {
                "Operation & Maintenance": "Operations & Maintenance",
                "EPC Completed Q & M Ongoing": "EPC Completed - Operations & Maintenance Ongoing",
                "EPC Completed — O&M Ongoing": "EPC Completed - Operations & Maintenance Ongoing",
                "EPC Completed - Operation & Maintenance Ongoing": "EPC Completed - Operations & Maintenance Ongoing",
            };
            merged.statuses = Array.from(
                new Set(
                    [...defaults.statuses, ...(data.statuses || [])].map(
                        (status) => statusAlias[status] || status
                    )
                )
            );
            return merged;
        } else {
            await setDoc(docRef, defaults);
            return defaults;
        }
    } catch (error) {
        console.error("Error fetching project settings:", error);
        return defaults;
    }
};

export const addSettingOption = async (category: keyof ProjectSettings, value: string) => {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    return await updateDoc(docRef, {
        [category]: arrayUnion(value)
    });
};

export const removeSettingOption = async (category: keyof ProjectSettings, value: string) => {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    return await updateDoc(docRef, {
        [category]: arrayRemove(value)
    });
};

export const seedAfricanCountries = async () => {
    const africanCountries = [
        "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo (Congo-Brazzaville)", "Democratic Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sahrawi Arab Democratic Republic", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
    ];

    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    return await updateDoc(docRef, {
        countries: africanCountries
    });
};
