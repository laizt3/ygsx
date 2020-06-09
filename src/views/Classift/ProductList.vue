<template>
  <div class="list">
    <div class="topbar line-bottom">
      <ul>
        <li
          v-for="data in topbarList"
          :key="data"
          @click="topbarChange(data)"
          :class="{ active: data === current }"
        >
          {{ data }}
        </li>
      </ul>
    </div>
    <div class="itemlist" v-if="productList">
      <div
        class="product bottom-line"
        v-for="(data, index) in productList"
        :key="data.CommodityCode"
      >
        <div>
          <img :src="data.SmallPic" alt="" />
        </div>
        <div class="info">
          <p>{{ data.CommodityName }}</p>
          <p class="text">{{ data.SubTitle }}</p>
          <p class="price">
            <span class="num">￥{{ data.SellPrice }}</span>
            <span class="standard">{{ data.Spec }}</span>
            <span
              ><i class="add" @click="addCar(index, data.CommodityCode)"></i
            ></span>
          </p>
        </div>
      </div>
    </div>
    <div v-if="!productList" class="message">
      <img
        src="//img07.yiguoimg.com/d/web/180315/013111/212501/noting@3x.png"
        alt=""
      />
      <p>抱歉没有找到您想要的商品</p>
    </div>
    <div class="car" @click="test">
      <i>{{ CarNum }}</i>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getClassiftList } from "@/api/JsonRequest";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

export default {
  data() {
    return {
      topbarList: ["销量", "新品", "价格"],
      data: "销量",
      current: "销量",
      productList: null,
      productCarList: [],
    };
  },
  props: ["id", "index"],
  computed: {
    ...mapState("ProductCar", ["CarNum"]),
  },
  methods: {
    ...mapMutations("BotbarMod", ["BotShow", "BotHide"]),
    ...mapMutations("TopbarMod", ["TopShow", "TopHide"]),
    ...mapMutations("ProductCar", ["addProduct"]),
    topbarChange(data) {
      this.current = data;
    },

    addCar(index, id) {
      let exits = this.productCarList.some((item) => {
        return item.CommodityCode === id;
      });

      if (exits) {
        let _this = this;

        this.productCarList.map(function(item) {
          if (item.CommodityCode === id) {
             _this.$set(item, "Number", item.Number+=1);
            // console.log(item.Number++);
            
          }
        });
      } else {
        this.$set(this.productList[index], "Number", 1);

        this.productCarList.push(this.productList[index]);
        console.log(this.productList[index]);
      }

      console.log(this.productCarList[0]);

      this.addProduct(this.productCarList);
      Toast("添加成功");
    },
    test() {
      this.$router.push("/cart");
    },
  },
  created() {
    this.BotHide();
    this.TopHide();

    getClassiftList().then((res) => {
      this.productList =
        res.data[0].Data.CategoryList[this.id].Childs[this.index].Childs;
    });
  },
  destroyed() {
    this.BotShow();
    this.TopShow();
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.list {
  .topbar {
    position: fixed;
    left: 0;
    right: 0px;
    background-color: #fff;
    z-index: 9;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        font-size: 15px;
        width: 33.33%;
        text-align: center;
        padding: 10px 0;
      }
    }
    .active {
      border-bottom: 2px solid #11b57c;
      box-sizing: border-box;
      color: #11b57c;
    }
  }
  .line-bottom:after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: #ddd;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
  }

  .itemlist {
    position: relative;
    top: 37px;

    .product {
      display: flex;
      padding: 15px 10px;
      height: 104px;
      border-bottom: 1px solid #ddd;
      img {
        width: 104px;
        height: 104px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        p {
          font-size: 15px;
        }
        .text {
          font-size: 12px;
          color: #808080;
        }
        .price {
          display: flex;
          justify-content: space-between;

          .num {
            font-size: 14px;
            color: #fd3d3d;
          }
          .standard {
            font-size: 12px;
            color: #808080;
          }
          .add {
            z-index: 100;
            position: absolute;
            right: 20px;
            top: 85px;
            width: 24px;
            height: 24px;
            background: url("//img05.yiguoimg.com/d/web/180508/01311/150610/add.png")
              no-repeat;
            background-size: 100% 100%;
          }
        }
        span {
          font-size: 15px;
        }
      }
    }
  }
  .message {
    position: relative;
    top: 100px;
    text-align: center;
    img {
      width: 108px;
      height: 108px;
    }
    p {
      font-size: 15px;
      color: #808080;
    }
  }
  .car {
    background: url("http://img05.yiguoimg.com/d/web/180508/01311/150610/cart1.png")
      no-repeat;
    z-index: 100;
    position: relative;
    display: block;
    width: 34px;
    height: 34px;
    background-size: 100%;
    position: fixed;
    bottom: 140px;
    right: 30px;
    i {
      font-size: 12px;
      text-align: center;
      line-height: 18px;
      font-style: normal;
      border-radius: 50%;
      background-color: #ff6353;
      display: inline-block;
      position: absolute;
      width: 18px;
      height: 18px;
      top: -8px;
      right: -8px;
      color: #fff;
    }
  }
}
</style>
