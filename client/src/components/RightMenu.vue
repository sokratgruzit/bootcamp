<template>
  <ul class="nav container">
    <li v-for="(link, i) in links" :key="i" class="nav-item">
      <router-link to="#">
        <svg
          width="7"
          height="8"
          viewBox="0 0 7 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5625 4L0.5625 7.4641L0.5625 0.535898L6.5625 4Z"
            fill="#1A1E25"
          />
        </svg>

        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: "How we started",
        },
        {
          title: "bootcamp",
        },
        {
          title: "Our team",
        },
        {
          title: "entertain",
        },
        {
          title: "outside",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  z-index: 99;
  max-width: 334px !important;
  margin-top: 80px !important;
  @media (max-width: 1599px) {
    max-width: 280px !important;
  }
  @media (max-width: 1023px) {
    max-width: 240px !important;
  }
  @media (max-width: 767px) {
    max-width: 180px !important;
  }
  &-item {
    a {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      color: #737373;
      transition: 0.6s;
      &.router-link-active {
        color: #1a1e25;
        svg {
          opacity: 1;
        }
      }
      svg {
        margin-top: -2px;
        margin-right: 3px;
        opacity: 0;
        transition: 0.6s;
      }
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &:hover {
      svg {
        opacity: 1;
      }
      a {
        color: #1a1e25;
      }
    }
  }
}
</style>
