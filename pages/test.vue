<script lang='ts' setup>
import axios from 'axios'

axios.post('/api/completions', {
    type: 2,
    content: '王者荣耀',
}).then(({ data }) => {
    console.log(data);

})

</script>
<template></template>
<script lang='ts'>

export default {
    name: 'test',
}
</script>
<style lang='less' scoped></style>