const API_URLS = {
    categories: "api/v1/project/tags",
    project: (id: string) => `api/v1/project/${id}`,
    projects: "api/v1/project",
    refresh: "api/v1/user/refresh",
    profile: "api/v1/user/profile",
    otp: "api/v1/user/login",
    slider: "api/v1/common/homepage-sliders",
}

export default API_URLS
