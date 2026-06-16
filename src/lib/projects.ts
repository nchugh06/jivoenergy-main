import { db, storage } from "./firebase";
import {
    collection,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    Timestamp,
    serverTimestamp,
    query,
    orderBy,
    where,
    limit
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Project } from "@/types/project";

const COLLECTION_NAME = "projects";

export const getProjects = async (): Promise<Project[]> => {
    try {
        const q = query(collection(db, COLLECTION_NAME)); // Add orderBy when we have field
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Project));
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Project;
        }
        return null;
    } catch (error) {
        console.error("Error fetching project by id:", error);
        return null;
    }
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("slug", "==", slug),
            limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() } as Project;
        }
        return null;
    } catch (error) {
        console.error("Error fetching project by slug:", error);
        return null;
    }
};

export const getProjectsByBusinessArea = async (businessArea: string): Promise<Project[]> => {
    try {
        const allProjects = await getProjects();
        
        // Map business area slugs to technology keywords
        const technologyMap: { [key: string]: string[] } = {
            'solar-pv': ['solar', 'pv', 'photovoltaic'],
            'bess': ['battery', 'bess', 'energy storage', 'storage system'],
            'transmission-distribution': ['transmission', 'distribution', 't&d', 'substation'],
            'hybrid-energy': ['hybrid'],
            'biogas-biomethane': ['biogas', 'biomethane'],
            'waste-management': ['waste', 'waste-to-energy', 'wte']
        };
        
        const keywords = technologyMap[businessArea] || [];
        
        // Filter projects by matching technology with keywords
        const filteredProjects = allProjects.filter(project => {
            if (!project.technology) return false;
            const tech = project.technology.toLowerCase();
            return keywords.some(keyword => tech.includes(keyword.toLowerCase()));
        });
        
        return filteredProjects;
    } catch (error) {
        console.error("Error fetching projects by business area:", error);
        return [];
    }
};

export const addProject = async (data: Omit<Project, 'id'>) => {
    return await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
};

export const updateProject = async (id: string, data: Partial<Project>) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
    });
};

export const deleteProject = async (id: string) => {
    return await deleteDoc(doc(db, COLLECTION_NAME, id));
};

export const uploadProjectImage = async (file: File, path: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.url;
};

export const uploadProjectImages = async (files: File[], basePath: string): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
        const path = `${basePath}/${Date.now()}_${file.name}`;
        return uploadProjectImage(file, path);
    });
    return Promise.all(uploadPromises);
};
