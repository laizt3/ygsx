<template>
  <div id="home">
    <!-- 开始的遮罩层 -->
    <!-- <van-overlay :show="show" @click="show = false" z-index="10">
      <div class="wrapper" @click="show = false">
        <div class="block" @click.stop>
          <van-icon name="close" size="0.32rem" color="rgb(170, 162, 162)" @click="show = false" />
          <img :src="showImg" alt />
        </div>
      </div>
    </van-overlay>-->

    <!-- 组件懒加载 -->
    <lazy-component>
      <!-- swipe轮播图 -->
      <div class="swipe" v-if="this.banners">
        <van-swipe :autoplay="3000" width="100%" height="2.18rem">
          <van-swipe-item v-for="(image, index) in banners" :key="index">
            <!-- <a :href="image.hrefValue"> -->
            <img v-lazy="image.pictureUrl" />
            <!-- </a> -->
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 菜单栏 -->
      <div class="menu" v-if="this.menus">
        <van-grid :gutter="10" :border="false">
          <van-grid-item
            v-for="item in menus"
            :key="item.navIndex"
            :icon="item.pictureUrl"
            :text="item.navName"
            @click="toUrl(item.hrefValue)"
          />
        </van-grid>
      </div>

      <!-- 餐馆名菜在家做 -->
      <div class="goodFood">
        <van-image
          width="100%"
          height="100%"
          src="https://img11.yiguoimg.com/d/items/2020/200331/9288740194363519_1125x344.jpg?w=1125&h=344"
        />
      </div>

      <!-- 易果快报 -->
      <div class="news" v-if="this.news">
        <van-row>
          <van-col span="6">
            <img src="//img06.yiguoimg.com/e/web/161222/018522/134216/news.png" />
          </van-col>
          <van-col span="18">
            <div class="slider-content">
              <van-swipe style="height: 100%;" :autoplay="3000" :show-indicators="false" vertical>
                <van-swipe-item v-for="item in news" :key="item.fastReportId">
                  <span class="slider-text">{{item.fastReportTitle}}</span>
                </van-swipe-item>
              </van-swipe>
            </div>
          </van-col>
        </van-row>
      </div>

      <!-- 重磅推荐 -->
      <div class="tuijian" v-if="this.tuijian">
        <van-row>
          <van-col span="24">
            <van-image
              v-for="item in tuijian"
              :key="item.adPictures.adPictureId"
              width="100%"
              lazy-load
              :src="item.adPictures.pictureUrl"
            />
          </van-col>
        </van-row>
      </div>

      <!-- 一口好锅 -->
      <div class="group-floor">
        <div class="floor-img">
          <img
            src="https://img12.yiguoimg.com/d/items/2020/200306/9288740052740198_1125x652.jpg?w=1125&h=652"
            alt
          />
        </div>
        <div class="floor-list" v-if="this.haoguo">
          <div class="lists" v-for="(item,index) in haoguo" :key="index">
            <div class="lists-img">
              <van-image width="124" height="124" :src="item.pictureUrl" />
            </div>
            <div class="lists-info">
              <span class="info-title">{{item.commodityName}}</span>
              <p class="jiaqian">
                <span class="price red">
                  <i>￥</i>
                  {{item.commodityPrice}}
                </span>
                <span class="info-cart">
                  <van-icon name="cart-o" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="fail" :style="{'fontSize':'12px'}" v-else>图片加载失败</div>
      </div>

      <!-- NEW AND HOT -->
      <div class="two-image" v-if="this.twoImage">
        <van-image
          height="100%"
          lazy-load
          v-for="(item,index) in twoImage"
          :key="index"
          :src="item.pictureUrl"
        />
      </div>

      <!-- 热销商品 -->
      <div class="hotGoods" v-if="this.hotGoods">
        <van-card
          v-for="(item) in hotGoods"
          :key="item.commodityCode"
          :price="item.commodityPrice"
          :desc="item.subTitle"
          :title="item.commodityName"
          :thumb="item.pictureUrl"
        >
          <template #tags>
            <van-tag round plain type="success">{{item.saleSlogan}}</van-tag>
          </template>
          <template #footer>
            <van-button size="mini">
              <van-icon name="cart-o" />
            </van-button>
          </template>
        </van-card>
      </div>

      <!-- 商品列表 -->
      <div class="Goodlists" v-for="(item,index) in Goodlists" :key="index">
        <van-divider>{{item.componentBase.customComponentName}}</van-divider>
        <van-row type="flex">
          <van-col
            span="12"
            v-for="goods in item.commoditysComponentList"
            :key="goods.commodityComponentId"
          >
            <div class="Goodlist-item">
              <div class="item-img">
                <van-image width="167" height="167" :src="goods.pictureUrl" />
                <van-tag
                  mark
                  type="danger"
                  v-show="goods.saleSlogan"
                >{{goods.saleSlogan ? goods.saleSlogan : goods.saleSlogan=false}}</van-tag>
              </div>
              <div class="item-info">
                <p class="info-title">{{goods.commodityName}}</p>
                <p class="info-price">
                  <span class="money">
                    <i>￥</i>
                    {{goods.commodityPrice}}
                    <i class="weigth">{{goods.commoditySpec}}</i>
                  </span>
                  <span class="info-cart">
                    <van-button size="mini">
                      <van-icon name="cart-o" @click="addCar(index,goods)"/>
                    </van-button>
                  </span>
                </p>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </lazy-component>
  </div>
</template>

<script>
import Vue from "vue";
import {mapMutations,mapState} from "vuex"
import { Toast, Overlay, Button, Icon, Swipe, SwipeItem, Lazyload, Grid, GridItem, Image, Card, Tag, Divider } from "vant";
import axios from "axios";
Vue.use(Toast).use(Overlay).use(Button).use(Icon).use(Swipe).use(SwipeItem).use(Grid).use(GridItem).use(Image).use(Card).use(Tag).use(Divider).use(Lazyload, { lazyComponent: true });

export default {
  computed:{
    ...mapState("ProductCar", ["CarNum"]),
  },
  methods: {
    ...mapMutations("ProductCar", ["addProduct"]),

    // toArr(lists) {
    //   if(lists){
    //     this.productCarList.push(lists);
    //   }
      
      
    //   this.addProduct(this.productCarList);
    //   console.log(this.productCarList)
    // }

    addCar(index, lists) {
      console.log(index,lists.commodityCode)
      // console.log(this.Goodlists[index])
      let exits = this.Goodlists[index].commoditysComponentList.filter((item)=>{
        return item.commodityCode === lists.commodityCode
      })
      
      this.productCarList = (exits)
      console.log(this.productCarList)
      // this.addProduct(this.productCarList);
    },
  },
  data() {
    return {
      show: true,
      banners: null,
      menus: null,
      news: null,
      tuijian: null,
      haoguo: null,
      twoImage: null,
      hotGoods: null,
      Goodlists: null,
      goodRed: true,
      productCarList:[],
      showImg:
        "https://img11.yiguoimg.com/d/items/2020/200331/9570215171106943_896x1086.png"
    };
  },
  async created() {
    await axios.get("/json/Home/homeGoods.json").then(res => {
      this.Goodlists = res.data.Data.templateComponentList;
      console.log(res.data.Data.templateComponentList)
    });

    // axios的get数据请求 并且赋值
    let { data } = await axios.get("/json/Home/home-bot.json");
    let datas = data.Data;
    // 一口好锅赋值
    this.haoguo = datas.templateComponentList[0].commoditysComponentList;
    this.twoImage = datas.templateComponentList[1].adPictures;
    this.hotGoods = datas.templateComponentList[3].commoditysComponentList;
    await axios.get("/json/Home/home-top.json").then(res => {
      let data = res.data[0];
      let pic = res.data[1];
      // banners赋值
      this.banners = data.carouselPictures;
      // menu赋值
      this.menus = data.navComponentList;
      // news开宝赋值
      this.news = data.fastReportsList;
      // tuijian赋值
      this.tuijian = pic;
      // console.log(this.tuijian);
    }) 
    Toast({
      message: "加载中...",
      icon: "https://img07.yiguoimg.com/e/web/170113/01851/110053/1.gif",
      duration: 500
    });
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 3rem;
  height: 3.6rem;
  position: relative;
  .van-icon-close {
    position: absolute;
    right: 0;
    top: -15px;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
// 轮播图
.swipe {
  width: 100%;
  height: 2.18rem;
  position: relative;
  img {
    width: 100%;
    height: 2.18rem;
  }
  ::v-deep {
    .van-swipe__indicators {
      bottom: 40px;
    }
  }
}
// 菜单栏
.menu {
  ::v-deep {
    .van-grid {
      padding-top: 10px;
      padding-bottom: 10px;
      .van-grid-item {
        padding-right: 0 !important;
        .van-grid-item__content {
          padding: 0;
          .van-grid-item__icon {
            width: 90px;
            height: 63px;
            text-align: center;
            img {
              width: 62px;
              height: 62px;
            }
          }
          .van-grid-item__text {
            margin-top: 0;
            color: rgb(51, 51, 51);
            font-size: 14px;
          }
        }
      }
    }
  }
}

// 餐馆名菜在家做
.goodFood {
  width: 100%;
  height: 1.15rem;
}

// 易果快报
.news {
  width: 100%;
  height: 0.33rem;
  border-top: 1px solid #f4f4f4;
  .van-row {
    width: 100%;
    height: 100%;
    .van-col {
      height: 100%;
      position: relative;
      img {
        position: absolute;
        width: 0.68rem;
        height: 0.13rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .van-col--6 {
      border-right: 1px solid #f4f4f4;
    }
    .van-col--18 {
      .slider-content {
        width: 100%;
        height: 100%;
        ::v-deep {
          .van-swipe__track {
            height: 100% !important;
            .slider-text {
              display: flex;
              width: 100%;
              height: 100%;
              font-size: 12px;
              margin-left: 10px;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
            }
          }
        }
      }
    }
  }
}

// 重磅推荐
.tuijian {
  width: 100%;
  height: 3.6rem;
  .van-row {
    .van-col {
      ::v-deep {
        .van-image {
          display: block;
        }
      }
    }
  }
}

// 一口好锅
.group-floor {
  width: 100%;
  height: 4rem;
  position: relative;
  .floor-img {
    width: 100%;
    height: 2.18rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .floor-list {
    width: 100%;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    .lists {
      margin-left: 15px;
      font-size: 11px;
      display: inline-block;
      background: #fff;
      border-radius: 0.05rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      vertical-align: middle;
      flex-shrink: 0;
      .lists-info {
        padding: 5px;
        .info-title {
          width: 1.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .jiaqian {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .price {
            font-weight: bold;
            color: #fb3d3d;
            margin-left: -5px;
            padding: 5px 0;
          }
          .info-cart {
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 50%;
            background-color: #01b27a;
            color: #ffffff;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    p {
      margin: 0;
      padding: 0;
    }
  }
}

// NEW AND HOT
.two-image {
  width: 100%;
  height: 2.34rem;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ::v-deep {
    .van-image {
      flex: 1;
    }
  }
}

// 热销商品
.hotGoods {
  width: 100%;

  .van-card {
    background-color: #fff !important;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 0.1rem;
    background: #fff;
    margin-bottom: 0.1rem;
    .van-card__thumb {
      width: 0.93rem;
      height: 0.93rem;
    }
    .van-card__content {
      .van-card__title {
        font-weight: 500;
        font-size: 14px;
      }
      .van-card__price {
        color: #fb3d3d;
        font-size: 16px;
        font-weight: bolder;
        :v-deep {
          .van-card__price-integer {
            font-size: 16px !important;
          }
        }
      }
    }
    .van-card__footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      .van-button {
        width: 0.3rem;
        height: 0.3rem;
        background: #01b27a;
        color: #fff;
        font-size: 16px;
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        .van-button__text {
          align-items: center;
        }
      }
      .van-button--mini {
        min-width: 0;
      }
    }
  }
}

// 商品列表
.Goodlists {
  width: 100%;
  position: relative;
  font-size: 12px;
  .van-divider {
    color: #5c5d5f;
    font-weight: bold;
    width: 50%;
    margin-left: 25%;
    border-color: #9ca4af;
  }
  .van-row {
    padding: 15px;
    flex-wrap: wrap;

    .van-col {
      margin-top: 5px;
      margin-bottom: 5px;
      // margin-right: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      text-align: left;
      border-radius: 0.05rem;
      background: #fff;
      .item-img {
        position: relative;
        .van-image {
          border: 0;
          display: block;
        }
        .van-tag {
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
      .item-info {
        .info-title {
          margin-left: 10px;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .info-price {
          margin-left: 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 12px;
          font-weight: bold;
          color: #fb3d3d;
          .weigth {
            color: #aaa;
            font-size: 10px;
            font-weight: 500;
          }
          .info-cart {
            .van-button {
              width: 0.3rem;
              height: 0.3rem;
              background: #01b27a;
              color: #fff;
              font-size: 16px;
              border-radius: 50%;
              display: flex;
              flex-direction: row;
              justify-content: center;
              margin: 5px;
            }
            .van-button--mini {
              min-width: 0;
            }
          }
        }
      }
    }
    .van-col-left {
      margin-left: 15px;
      margin-right: 5px;
    }
    .van-col-right {
      margin-left: 5px;
      margin-right: 15px;
    }
  }
}
</style>
