export const reduxUtil = {
    getUserEmail: ({ auth }) => auth.user.email,
    getReduxAccToken: state => state.auth.accessToken,
    getCurrentAuthInfo: state => state.auth,
    getCurrentUserInfo: state => state.auth.user,
    getPromotionsList: ({ promotions }) => promotions.promotions_list,
    getCurrentPromo: ({ promotions }) => promotions.promo_details,
    getEditing: ({ promotions }) => promotions.id_editing_completed_promo,
}
