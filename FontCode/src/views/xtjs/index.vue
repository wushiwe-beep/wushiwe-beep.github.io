<template>
    <div>系统介绍
        <el-button @click="test">测试</el-button>
    </div>
</template>
<script>
export default {
    nameL:"xtjs",
    data() {
        return {

        }
    },
    methods:{
        test() {
            console.log(this.$router.options.routes)
        }
    }
}
</script>