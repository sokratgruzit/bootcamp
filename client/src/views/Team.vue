<template>
  <div class="team-container">
    <div class="container">
      <div class="top">
        <h1>Team</h1>
        <div class="top-item">
          <BecomeMember />
        </div>
      </div>
    </div>
    <div class="cover">
      <img
        src="https://www.shutterstock.com/image-illustration/triangle-solid-black-golden-illustration-260nw-1862937556.jpg"
        alt="cover photo"
      />
    </div>
    <div class="container">
      <div class="bottom">
        <div class="switcher-outer">
          <p>All</p>
          <p>Chief</p>
          <p>Developers</p>
          <p>Desingers</p>
        </div>
        <div class="team-members">
          <router-link class="member" to="/team/xui">
            <img
              src="https://storage.prompt-hunt.workers.dev/clejbtpon0005jt08qqamc5nk_1"
              alt="team member"
            />
            <div class="brush">
              <Tassel />
            </div>
            <div class="member-inner">
              <div class="row">
                <a target="_blank" href="https://github.com">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99976 0.246094C7.62519 0.246041 5.32809 1.09098 3.51952 2.6297C1.71096 4.16842 0.508963 6.30051 0.128635 8.64442C-0.251693 10.9883 0.214468 13.3911 1.4437 15.4227C2.67293 17.4544 4.585 18.9823 6.83776 19.7331C7.33776 19.8211 7.52476 19.5211 7.52476 19.2581C7.52476 19.0211 7.51276 18.2331 7.51276 17.3961C4.99976 17.8581 4.34976 16.7831 4.14976 16.2211C3.9279 15.6738 3.57609 15.1889 3.12476 14.8081C2.77476 14.6211 2.27476 14.1581 3.11176 14.1461C3.43164 14.1807 3.73845 14.2919 4.00619 14.4704C4.27393 14.6488 4.49469 14.8892 4.64976 15.1711C4.78649 15.4168 4.97035 15.6331 5.19082 15.8075C5.41129 15.982 5.66402 16.1113 5.93454 16.1879C6.20506 16.2646 6.48804 16.2871 6.76727 16.2542C7.04649 16.2212 7.31648 16.1335 7.56176 15.9961C7.60507 15.4875 7.83182 15.0119 8.19976 14.6581C5.97476 14.4081 3.64976 13.5461 3.64976 9.72109C3.63559 8.72707 4.00233 7.7653 4.67476 7.03309C4.36907 6.16931 4.40484 5.22138 4.77476 4.38309C4.77476 4.38309 5.61176 4.12109 7.52476 5.40809C9.16104 4.95804 10.8885 4.95804 12.5248 5.40809C14.4368 4.10809 15.2748 4.38309 15.2748 4.38309C15.6448 5.22136 15.6805 6.16933 15.3748 7.03309C16.0492 7.76404 16.4163 8.72665 16.3998 9.72109C16.3998 13.5581 14.0618 14.4081 11.8368 14.6581C12.0754 14.9 12.2592 15.1904 12.3757 15.5096C12.4922 15.8288 12.5386 16.1694 12.5118 16.5081C12.5118 17.8461 12.4998 18.9211 12.4998 19.2581C12.4998 19.5211 12.6868 19.8331 13.1868 19.7331C15.4354 18.976 17.3417 17.4445 18.5656 15.4118C19.7894 13.3792 20.2511 10.9778 19.8681 8.63628C19.4852 6.29475 18.2826 4.16552 16.475 2.62867C14.6673 1.09182 12.3724 0.247384 9.99976 0.246094Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a href="https://linkedin.com">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.004 5.0008H2.975C2.66795 5.02 2.36024 4.97559 2.07114 4.87036C1.78204 4.76513 1.51778 4.60135 1.2949 4.38927C1.07203 4.17719 0.895337 3.92138 0.775896 3.63786C0.656455 3.35433 0.596834 3.0492 0.600769 2.74158C0.604703 2.43395 0.672107 2.13044 0.79876 1.85007C0.925413 1.56969 1.10859 1.31848 1.33681 1.11217C1.56504 0.905864 1.8334 0.748894 2.1251 0.651093C2.41679 0.553292 2.72554 0.516767 3.032 0.543804C3.33906 0.522354 3.64724 0.564561 3.93723 0.66778C4.22722 0.770999 4.49275 0.933005 4.7172 1.14364C4.94165 1.35428 5.12017 1.60901 5.24157 1.89187C5.36298 2.17472 5.42464 2.47961 5.42271 2.78741C5.42078 3.09521 5.35528 3.3993 5.23034 3.68061C5.10539 3.96192 4.92368 4.21438 4.69661 4.42218C4.46953 4.62999 4.20198 4.78864 3.91072 4.88821C3.61946 4.98778 3.31077 5.02611 3.004 5.0008Z"
                      fill="white"
                    />
                    <path d="M1.01807 8H5.01807V20H1.01807V8Z" fill="white" />
                    <path
                      d="M15.5181 8C14.8441 8.00182 14.1792 8.15594 13.5731 8.45084C12.967 8.74574 12.4355 9.17378 12.0181 9.703V8H8.01807V20H12.0181V14.5C12.0181 13.9696 12.2288 13.4609 12.6039 13.0858C12.9789 12.7107 13.4876 12.5 14.0181 12.5C14.5485 12.5 15.0572 12.7107 15.4323 13.0858C15.8074 13.4609 16.0181 13.9696 16.0181 14.5V20H20.0181V12.5C20.0181 11.3065 19.544 10.1619 18.7 9.31802C17.8561 8.47411 16.7115 8 15.5181 8Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
              <div class="tags">
                <p>Vue</p>
                <p>React</p>
                <p>Node</p>
                <p>Git</p>
                <p>Figma</p>
                <p>Vue</p>
              </div>
              <div class="text">
                <p>Sergo Shishmanidze</p>
                <p class="text-tags">
                  <span>CTO,</span><span>CEO,</span><span>Full Stack Dev.</span>
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="contact">
      <ContactBox />
    </div>
  </div>
</template>

<script>
import ContactBox from "../components/ContactBox.vue";
import Tassel from "../components/parts/Tassel-3.vue";
import BecomeMember from "../components/parts/BecomeMember.vue";
import items from "@/work.json";

export default {
  name: "Work",
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.items = items;
  },
  methods: {},
  components: { BecomeMember, ContactBox, Tassel },
};
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
}
.top h1 {
  /* font-size: 250px; */
  @extend %largest;
  letter-spacing: 30px;
  opacity: 0.2;
  text-transform: uppercase;
}
.cover {
  margin-top: 120px;
  position: relative;
  width: 100%;
  padding-top: 45%;
  overflow: hidden;
}
.cover img {
  position: absolute;
  width: 100%;
  height: 120%;
  top: -10%;
  left: 0px;
  -o-object-fit: cover;
  object-fit: cover;
}

.bottom {
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.switcher-outer {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
}
.switcher-outer p {
  color: #1a1e25;
  opacity: 0.6;
  text-transform: uppercase;
  cursor: pointer;
  @extend %smallest;
  transition: cubic-bezier(0.6, -0.28, 0.735, 0.045);
  transition-delay: 0.3s;
}
.switcher-outer p:hover {
  opacity: 1;
  transition: cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.team-members {
  margin-top: 60px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 30px;
}
.member {
  position: relative;
  display: flex;
  width: calc((100% - 90px) / 4);
  padding-top: 17%;
  transition: 0.5s;
  overflow: hidden;
}

.member:hover {
  mix-blend-mode: multiply;
}
.member:hover .tags,
.member:hover .row {
  opacity: 1;
}
.member:hover .text {
  background-color: #1a1e25;
  padding: 10px;
}
.member:hover .text p,
.member:hover .text span {
  color: #c62828;
}
.member:hover .brush {
  opacity: 1;
}
.member img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}

.brush {
  position: absolute;
  bottom: 35px;
  right: -30px;
  z-index: 1;
  opacity: 0;
}

.member-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1;
  width: 100%;
}
.row {
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #ffffff1c;
  padding: 0px 15px 15px 15px;
  width: 100%;
  opacity: 0;
  z-index: 3;
}
.row svg {
  cursor: pointer;
  transition: 0.5s;
}

.row svg:hover {
  opacity: 0.5;
}
.tags {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 15px 15px 0px 15px;
  opacity: 0;
}
.tags p {
  color: #fff;
  font-size: 13px;
  border: 1px solid #5e5e5e60;
  padding: 3px 6px;
  background: rgba(26, 30, 37, 0.8);
  border-radius: 44px;
  transition: 0.5s;
  cursor: pointer;
}
.text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  background-color: #f5f5f5;
  z-index: 2;
  flex-wrap: wrap;
  padding: 10px 0px;
}
.text p,
.text span {
  color: #000;
  font-size: 14px;
}
.text p {
  text-transform: uppercase;
}
.text-tags {
  display: flex;
  align-items: center;
  gap: 6px;
}
@media (max-width: 1900px) {
  .team-container {
    margin-top: 50px;
  }
}
@media (max-width: 1600px) {
}
@media (max-width: 1300px) {
  .member {
    width: calc((100% - 60px) / 3);
  }
}
@media (max-width: 1023px) {
  .member {
    width: calc((100% - 30px) / 2);
  }
  .top {
    width: 100%;
  }
  .top-item {
    margin: -40px 100px 0px 0px;
  }
}
@media (max-width: 767px) {
  .member {
    width: 100%;
    padding-top: 45%;
  }
  .top {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .top-item {
    margin: 100px 0px 0px 0px;
  }

  .switcher-outer {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0;
  }
}
</style>
