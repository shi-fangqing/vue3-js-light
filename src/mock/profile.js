import Mock from "@/mock/index.js";

Mock.onPut('/mock/profile').reply(function (config) {
    return [200, {code: 200, data: 'success'}]
})
