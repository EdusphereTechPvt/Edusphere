export const getHelpRecordsByType = async (type) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/helpcenter/type/${type}`);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to fetch help center articles by type');
        }
        return result;
    }
    catch (error) {
        console.error('Error fetching help center articles by type:', error);
        throw error;
    }
};

export const searchHelpRecords = async (query) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/helpcenter/all`);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to fetch help center articles');
        }
        const filtered = result.data.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) || 
            item.description.toLowerCase().includes(query.toLowerCase())
        );
        return { ...result, data: filtered };
    }
    catch (error) {
        console.error('Error searching help center articles:', error);
        throw error;
    }
};

export const updateViews = async (id) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/helpcenter/view/${id}`, {
            method: 'PUT',
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to update views');
        }
        return result;
    }
    catch (error) {
        console.error('Error updating views:', error);
        throw error;
    }
};

export const updateLikes = async (id, action) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/helpcenter/${action}/${id}`, {
            method: 'PUT',
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to update likes/dislikes');
        }
        return result;
    }
    catch (error) {
        console.error('Error updating likes/dislikes:', error);
        throw error;
    }
};