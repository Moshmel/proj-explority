<template>
    <section>
        <!-- <div class="header"></div> -->
        <div class="items-list">
            <div class="experiences-category grid">
                <div class="experience-name">
                    <img src="https://via.placeholder.com/150" alt="">
                     <div class="experience-name">
                        <div class="title"><span>Culture</span></div>
                    </div>
                </div>    
                <div class="experience-name">
                    <img src="https://via.placeholder.com/150" alt="">
                     <div class="experience-name">
                        <div class="title"><span>Food</span></div>
                    </div>
                </div>
                <div class="experience-name">
                    <img src="https://via.placeholder.com/150" alt="">
                     <div class="experience-name">
                        <div class="title"><span>Nature</span></div>
                    </div>
                </div>
                <div class="experience-name">
                    <img src="https://via.placeholder.com/150" alt="">
                    <div class="experience-name">
                        <div class="title"><span>Family</span></div>
                    </div>
                </div>
                <div class="experience-name">
                    <img src="https://via.placeholder.com/150" alt="">
                    <div class="experience-name">
                        <div class="title"><span>Night Clubs</span></div>
                    </div>
                </div>
            </div>
            <div class="experiences">

            </div>
        </div>
        <div class="footer"></div>
    </section>
</template>
<script>
export default {
    "experiences-list" : [
        {
             'experiences-name':'Culture',
        },
        {
             'experiences-name':'Food',
        },
        {
             'experiences-name':'Nature',
        },
        {
            'experiences-name':'Family',
        },
         {
            'experiences-name':'Night clubs',
        },
        ]
    ,
    data(){
        return{}
    },
};
</script>
<style scoped>
.experiences-category {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 840px;
    height: 200px;
    text-align: center;
    padding: 10px 5px;
    grid-column-gap: 1em;
    margin: 0 auto;
}
</style>

