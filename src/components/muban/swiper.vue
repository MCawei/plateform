<template>
  <div class="container">
    <div class="main-wrapper">
      <div class="main-header">代码练习</div>
      <div class="main-content">
        <div class="my-swiper">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="row in splitGrounp(equipList)">
                <div class="item" v-for="item in row">
                  <div class="equip-img"><img src="../../assets/images/web1.png" alt=""></div>
                  <p>{{item.equipName}}</p>
                  <p>{{item.number}}</p>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>

        <div class="img-contain">
          <img :src="imgUrl" alt="">
          <img :src="imgUrl1" alt="">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    data(){
      return {
        equipList:[
          {id:'S01',number: '24',rate:'76'},
          {id:'S02',number: '22',rate:'86'},
          {id:'S03',number: '4',rate:'66'},
          {id:'S05',number: '56',rate:'92'},
          {id:'S06',number: '67',rate:'96'},
          {id:'S07',number: '8',rate:'91'},
          {id:'S08',number: '9',rate:'86'},
          {id:'S09',number: '12',rate:'87'},
          {id:'S10',number: '14',rate:'76'}
        ],
        equipType: [
          {type:'S01',equipName:'智能烟感'},
          {type:'S02',equipName:'智能井盖'},
          {type:'S03',equipName:'停车地磁'},
          {type:'S05',equipName:'守护宝'},
          {type:'S06',equipName:'电器灭弧'},
          {type:'S07',equipName:'智慧电梯'},
          {type:'S08',equipName:'二次供水'},
          {type:'S09',equipName:'末端水压'},
          {type:'S10',equipName:'人脸识别'}
        ],
        imgUrl: '/static/images/web01.jpg',
        imgUrl1: '../assets/images/web1.png'
      }
    },
    created(){
      this.getEquipInfo();
      // console.log(this.splitGrounp(this.equipList));
    },
    mounted(){
      //轮播
      new Swiper('.swiper-container', {
        autoplay:true,
        loop: false,
        observer:true,  // 解决滑动的问题
        pagination: {
          el:'.swiper-pagination',
          clickable :true,
        }
      });
    },
    methods: {
      getEquipInfo(){// 数据合并
        this.equipType.map( (v1,id)=> {
          this.equipList.map( (v2,d)=> {
            if(v1.type===v2.id){
              v2.equipName = v1.equipName
            }
          })
        })
        // console.log(this.equipList);
      },

      splitGrounp(json) {  // 数据分组
        var index = 0;
        var jsonArr = [];
        var sectionCount = 5; // 一组展示的个数
        for (var i = 0; i < json.length; i++) {
          index = parseInt(i / sectionCount);
          if (jsonArr.length <= index) {
            jsonArr.push([]);
          }
          jsonArr[index].push(json[i]);
        }
        return jsonArr;
      }

    }
  }
</script>

<style scoped lang="scss">
  .my-swiper {
    .swiper-slide {
      display: flex;
      justify-content: space-around;
    }
    .item {
      width: 200px;
      height: 180px;
      background-color: #ff9800;
      color: #fff;
      font-size: 18px;
      text-align: center;
      .equip-img {
        img {
          width: 100%;
        }
      }
    }
  }
  .img-contain {margin-top: 30px;}
</style>
