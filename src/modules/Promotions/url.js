import baseURL from '../api/url'

export const createPromoURL = `${baseURL.CONFIG_URL}/catalogadmin/promotions/create`
export const getPromosURL = `${baseURL.CONFIG_URL}/catalogadmin/promotions/fetch`
export const updateMarketingURL = `${baseURL.CONFIG_URL}/catalogadmin/promotions/update`
export const deletePromoURL = `${baseURL.CONFIG_URL}/catalogadmin/promotions/delete`
export const getUsersURL = `${baseURL.CONFIG_URL}/catalogadmin/promotions/suggest/users`
export const getPromoConflicts = `${baseURL.CONFIG_URL}/catalogadmin/promotions/conflicts`
export const getCategoriesListURL = `${baseURL.CONFIG_URL}/catalogadmin/promotions/categories/get`
export const getProductsListURL = `${baseURL.CONFIG_URL}/catalogadmin/promotions/products/get`
export const publishContentURL = `${baseURL.CONFIG_URL}/catalogadmin/promotions/publish`
