/**
 * @constant ROUTES
 * @description All application route paths.
 *              Always use these constants — never hardcode paths.
 *
 * PUBLIC ROUTES (accessible without login)
 * @property {string} HOME              - / 
 * @property {string} SHOP              - /shop
 * @property {string} CATEGORIES        - /categories
 * @property {string} CATEGORY          - /shop/:category
 * @property {string} CUSTOM_DESIGN     - /custom-design
 * @property {string} PRODUCT           - /product/:id
 * @property {string} CART              - /cart
 * @property {string} CHECKOUT          - /checkout
 * @property {string} LOGIN             - /login
 * @property {string} TRACK_ORDER       - /track
 * @property {string} OFFERS            - /offers
 * @property {string} HELP              - /help
 * @property {string} WISHLIST          - /wishlist
 * @property {string} ORDER_SUCCESS     - /order-success/:id
 * @property {string} NOT_FOUND         - *
 *
 * PROTECTED ROUTES (login required)
 * @property {string} ACCOUNT           - /account
 * @property {string} ORDERS            - /account/orders
 * @property {string} PROFILE           - /account/profile
 * @property {string} ADDRESSES         - /account/addresses
 */
export const ROUTES = {
    HOME: '/',
    SHOP: '/shop',
    CATEGORIES: '/categories',
    CATEGORY: '/shop/:category',
    CUSTOM_DESIGN: '/custom-design',
    PRODUCT: '/product/:id',
    CART: '/cart',
    CHECKOUT: '/checkout',
    LOGIN: '/login',
    ACCOUNT: '/account',
    ORDERS: '/account/orders',
    PROFILE: '/account/profile',
    ADDRESSES: '/account/addresses',
    TRACK_ORDER: '/track',
    OFFERS: '/offers',
    HELP: '/help',
    WISHLIST: '/wishlist',
    ORDER_SUCCESS: '/order-success/:id',
    NOT_FOUND: '*'
};
