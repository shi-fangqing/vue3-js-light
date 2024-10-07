export const SysSetting = {
    title: import.meta.env.VITE_APP_TITLE,
    // 是否可以对布局进行设置
    showSetting: true,
    // 是否固定头部
    isFixedHeader: true,
    // 是否动态显示网页标题
    showDynamicTitle: false,
    // 是否显示标签页
    showTabView: true,
    // 是否显示面包屑
    showBreadCrumb: true,
    // 主题色
    themeColor: '#00babd'
}

export const Constants = {
    // xs 屏幕宽度(单位：px)
    XS_WIDTH: 768,
    // 面包屑高度(单位：rem)
    Breadcrumb_Height: 2.5,
    // 标签栏高度(单位：rem)
    Tabview_Height: 1.88,
    // 首页uri
    Index_Path: '/home',
    // 登录uri
    Login_Path: '/login'
}
