export const createCreatorStats = (data = {}) => ({
    profileViews: 0,
    comments: 0,
    likes: 0,
    followers: 0,
    engagement: 0,
    ...data,
});

export const createUIComponent = (id, type, data, config) => ({
    id,
    type, // 'chart' | 'metric' | 'card'
    data,
    config,
});

export const createComponentConfig = (title, position, size, options = {}) => ({
    title,
    position, // { x, y }
    size, // { width, height }
    chartType: options.chartType || 'line',
    ...options,
});
