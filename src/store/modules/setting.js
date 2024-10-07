import {defineStore} from "pinia";
import {ref} from "vue";
import {SysSetting} from '@/setting.js'
import {useElementPlusTheme} from 'use-element-plus-theme'

export const useSettingStore = defineStore('settingStore', () => {
    const setting = ref(JSON.parse(localStorage.getItem('setting')) || SysSetting)

    function setSetting(newSetting) {
        // 应用主题色
        useElementPlusTheme(newSetting.themeColor)
        setting.value = {...setting.value, ...newSetting}
        localStorage.setItem('setting', JSON.stringify(setting.value))
        // 重新加载页面，使用最新的配置
        window.location.reload()
    }

    function resetSetting() {
        setSetting(SysSetting)
    }

    return {setting, setSetting, resetSetting}
})
