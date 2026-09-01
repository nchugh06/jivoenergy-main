import { db, storage } from "./firebase";
import {
    collection,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    writeBatch,
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

export const isProjectDeleted = (project: { deletedAt?: string | null }): boolean =>
    Boolean(project.deletedAt);

const mapProjectDoc = (snapshot: { id: string; data: () => Record<string, any> }): Project => {
    const data = snapshot.data();
    const orderRaw = data.order;
    const order =
        orderRaw === undefined || orderRaw === null || orderRaw === ''
            ? undefined
            : Number(orderRaw);
    return {
        id: snapshot.id,
        ...data,
        order: order !== undefined && !Number.isNaN(order) ? order : undefined,
        deletedAt: data.deletedAt || null,
    } as Project;
};

export const getProjects = async (options?: { deletedOnly?: boolean }): Promise<Project[]> => {
    try {
        const q = query(collection(db, COLLECTION_NAME));
        const querySnapshot = await getDocs(q);
        const deletedOnly = options?.deletedOnly === true;
        // Client-side sort so docs without `order` still appear (missing → end).
        // Coerce with Number() in case older docs stored order as a string.
        return querySnapshot.docs
            .map((snapshot) => mapProjectDoc(snapshot))
            .filter((project) => deletedOnly ? isProjectDeleted(project) : !isProjectDeleted(project))
            .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

export const getProjectById = async (
    id: string,
    options?: { includeDeleted?: boolean }
): Promise<Project | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const project = mapProjectDoc(docSnap);
            if (isProjectDeleted(project) && !options?.includeDeleted) return null;
            return project;
        }
        return null;
    } catch (error) {
        console.error("Error fetching project by id:", error);
        return null;
    }
};

export const getProjectBySlugOrId = async (slugOrId: string): Promise<Project | null> => {
    const bySlug = await getProjectBySlug(slugOrId);
    if (bySlug) return bySlug;
    return getProjectById(slugOrId);
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("slug", "==", slug),
            limit(5)
        );
        const querySnapshot = await getDocs(q);
        const live = querySnapshot.docs
            .map((snapshot) => mapProjectDoc(snapshot))
            .find((project) => !isProjectDeleted(project));
        return live || null;
    } catch (error) {
        console.error("Error fetching project by slug:", error);
        return null;
    }
};

export const getProjectsByBusinessArea = async (businessArea: string): Promise<Project[]> => {
    try {
        const allProjects = await getProjects();

        const normalizeText = (value?: string) =>
            (value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

        const matchesAnyAlias = (value: string, aliases: string[]) => {
            const normalizedValue = normalizeText(value);
            return aliases.some(alias => normalizedValue.includes(normalizeText(alias)));
        };

        // Solar PV should show only the curated projects requested for this page.
        const solarPvProjectAliases = [
            'nkonge solar plant',
            'kabulasoke',
            'kabulasoke solar power plant',
            'pepsi bottling plant',
            'santo amaro solar pv plant',
            'santo amaro solar power plant'
        ];

        // BESS should show only the single curated project for this page.
        const bessProjectAliases = [
            'grid-forming bess project',
            'grid forming bess project',
            'bess project',
            'grid-forming bss project'
        ];

        // Hybrid Energy should show only the two curated projects for this page.
        const hybridProjectAliases = [
            'solar pv + bess hybrid systems for health facilities',
            'solar pv & storage for unops',
            'solar pv and storage',
            'solar pv + bess hybrid systems',
            'solar pv + bess hybrid',
            'moyamba solar pv + bess hybrid mini-grid',
            'solar pv + bess hybrid mini-grid',
            '7 Mini Grids',
            '7 Mini Grids Ethiopia'
        ];

        // Map business area slugs to technology keywords
        const technologyMap: { [key: string]: string[] } = {
            'solar-pv': ['solar', 'pv', 'photovoltaic'],
            'bess': ['battery', 'bess', 'energy storage', 'storage system'],
            'transmission-distribution': ['transmission', 'distribution', 't&d', 'substation'],
            'hybrid-energy': ['hybrid'],
            'biogas-biomethane': ['biogas', 'biomethane'],
            'waste-management': ['waste', 'waste-to-energy', 'wte']
        };

        if (businessArea === 'solar-pv') {
            return allProjects.filter(project => {
                if (project.businessArea === 'solar-pv') return true;

                const title = normalizeText(project.title);
                const location = normalizeText(project.location);
                return matchesAnyAlias(title, solarPvProjectAliases) || matchesAnyAlias(location, solarPvProjectAliases);
            });
        }

        if (businessArea === 'bess') {
            return allProjects.filter(project => {
                if (project.businessArea === 'bess') return true;

                const title = normalizeText(project.title);
                const location = normalizeText(project.location);
                const tech = normalizeText(project.technology);
                return [title, location, tech].some(value =>
                    matchesAnyAlias(value, bessProjectAliases)
                );
            });
        }

        if (businessArea === 'hybrid-energy') {
            return allProjects.filter(project => {
                if (project.businessArea === 'hybrid-energy') return true;

                const title = normalizeText(project.title);
                const location = normalizeText(project.location);
                const tech = normalizeText(project.technology);
                return [title, location, tech].some(value =>
                    matchesAnyAlias(value, hybridProjectAliases)
                );
            });
        }

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
        deletedAt: null,
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
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, {
        deletedAt: new Date().toISOString(),
        updatedAt: serverTimestamp(),
    });
};

export const restoreProject = async (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, {
        deletedAt: null,
        updatedAt: serverTimestamp(),
    });
};

export const reorderProjects = async (items: Array<{ id: string; order: number }>) => {
    const batch = writeBatch(db);
    for (const item of items) {
        if (!item.id) continue;
        batch.update(doc(db, COLLECTION_NAME, item.id), {
            order: item.order,
            updatedAt: serverTimestamp(),
        });
    }
    await batch.commit();
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
