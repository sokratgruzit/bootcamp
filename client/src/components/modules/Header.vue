<template>
  <transition name="fade" mode="out-in">
    <header id="header" :key="$route.path">
      <div class="header-wrap">
        <router-link :to="'/'" class="logo">
          <Logo/>
        </router-link>
        <div class="right">
          <nav class="menu">
            <ul>
              <li>
                <router-link :to="{ name: 'History' }">
                  <span>History</span>
                </router-link>
              </li>
              <li class="back" v-if="$route.name != 'Home'">
                <router-link :to="'/'">
                  <span>Back</span>
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="side">
            <nav class="navigation" v-if="$route.name === 'Home'">
              <ul>
                <li class="remove-on-resp">
                  <router-link :to="{ query: {section: 'About'} }" @click.native="handleClick('About')">
                    <span>{{ $t("about") }}</span>
                  </router-link>
                </li>
                <li class="remove-on-resp">
                  <router-link :to="{ query: {section: 'Focus'} }" @click.native="handleClick('Focus')">
                    <span>{{ $t("focus") }}</span>
                  </router-link>
                </li>
                <li class="remove-on-resp">
                  <router-link :to="{ name: 'Work' }">
                    <span>{{ $t("work") }}</span>
                  </router-link>
                </li>
                <li class="remove-on-resp">
                  <router-link :to="{ name: 'Team' }">
                    <span>{{ $t("team") }}</span>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ query: {section: 'Contact'} }" @click.native="handleClick('Contact')">
                    <span>{{ $t("contact") }}</span>
                  </router-link>
                </li>
              </ul>
            </nav>
           <!--  <LocaleSwitcher /> -->
          </div>
        </div>
      </div>
    </header>
  </transition>
</template>
<script>
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Logo from "@/components/parts/Logo";
export default {
  name: "Header",
  components: {
    LocaleSwitcher,
    Logo
  },
  methods:{
    handleClick(to){
      this.$store.commit('scrollTo', to);
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  max-width: 1920px;
  z-index: 99;
  mix-blend-mode: difference;

  opacity: 1;
  transform: translate(-50%, 0px);
}
header.scrolled{
  transition: .9s;
  transform: translate(-50%, -100%);
  opacity: 0;
}
header.scrolled.show{
   transform: translate(-50%, 0%);
  opacity: 1;
}
.header-wrap {
  padding: 50px 56px 34px;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.right{
  display: flex;
}
.menu{
  padding-top: 18px;

  ul{
    display: flex;

    li{
      display: flex;
      margin-right: 24px;
    }
    li:last-child{
      margin-right: 0;
    }
    li.back{
      display: flex;
      border-left: 1px solid #fff;
      padding-left: 12px;
    }
    a {
      position: relative;
      display: inline-flex;
      padding-left: 12px;
      span {
        line-height: 18px;
        text-transform: uppercase;
        mix-blend-mode: difference;
        color: white;
      }
      &:before{
        content: url("data:image/svg+xml,%3Csvg width='7' height='8' viewBox='0 0 7 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.57227 4.2085L0.572265 7.6726L0.572266 0.744394L6.57227 4.2085Z' fill='white'/%3E%3C/svg%3E%0A");
        position: absolute;
        left: 0;
        top: -4px;
        transition: .4s;
        opacity: 0;
        transform: translateX(-100%);
      }
      &.router-link-active:before{
        opacity: 1;
        transform: translateX(0%);
      }

      &:hover:before{
        opacity: 1;
        transform: translateX(0%);
      }
    }
    li.back a.router-link-active:before{
      opacity: 0;
      transform: translateX(-100%);
    }
    li.back a:hover:before{
      opacity: 1;
      transform: translateX(0%);
    }
  }
}
.side {
  height: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.navigation {
  margin-left: 100px;
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    li {
      display: inline-flex;
      text-align: right;
    }
  }
  a {
    position: relative;
    display: inline-flex;
    padding-left: 12px;
    span {
      line-height: 18px;
      text-transform: uppercase;
      mix-blend-mode: difference;
      color: white;
    }
    &:before{
      content: url("data:image/svg+xml,%3Csvg width='7' height='8' viewBox='0 0 7 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.57227 4.2085L0.572265 7.6726L0.572266 0.744394L6.57227 4.2085Z' fill='white'/%3E%3C/svg%3E%0A");
      position: absolute;
      left: 0;
      top: -4px;
      transition: .4s;
      opacity: 0;
      transform: translateX(-100%);
    }
    &.router-link-exact-active:before{
      opacity: 1;
      transform: translateX(0%);
    }
    &:hover:before{
      opacity: 1;
      transform: translateX(0%);
    }
  }
}

.lang-wrap {
  align-self: flex-end;
  margin-top: 34px;
  margin-right: 5px;
}

@media(max-width: 1023px){
  .header-wrap{
    padding: 34px;
  }
  .lang-wrap{
    margin-top: 21px;
  }
  .side{
    align-self: center;
  }
  .navigation .remove-on-resp{
    display: none;
  }
}
@media(max-width: 767px){
  .header-wrap{
    padding: 34px 16px;
  }
  .right{
    flex-direction: column;
  }
  .menu{
    padding-top: 0;
    padding-bottom: 12px;
    ul{
      flex-direction: column;
      align-items: flex-end;
        li{
          margin-right: 0;
          margin-bottom: 12px;
        }
        li.back{
          padding-left: 0;
          border-left: none;
        }
        li:last-child{
          margin-bottom: 0;
        }
    }
  }
  .navigation{
    margin-left: 12px;
  }
}
</style>
