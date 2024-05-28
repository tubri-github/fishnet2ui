<template>
  <el-container>
    <el-main>
      <h2>Contact Us</h2>
      <el-row :gutter="20">
        <el-col :span="12" v-for="contact in contacts" :key="contact.name">
          <el-card class="contact-card">
            <el-row>
              <el-col :span="6">
                <img :src="contact.image" alt="contact image" class="contact-image" />
              </el-col>
              <el-col :span="18">
                <h3>{{ contact.name }}</h3>
                <p>{{ contact.title }}</p>
                <p>{{ contact.institution }}</p>
                <p><a :href="'mailto:' + contact.email">{{ contact.email }}</a></p>
                <p>Phone: {{ contact.phone }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-footer class="special-thanks">
        <h3>Special Thanks</h3>
        <p>Special thanks to Francine Abe, University of Kansas Graduate Research Assistant...</p>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'ContactUS',
  setup() {
    const contacts = ref([
      {
        name: "Henry L. (Hank) Bart, Jr.",
        title: "FishNet PI",
        institution: "Tulane University",
        email: "hbartjr@tulane.edu",
        phone: "504.394.1711",
        image: new URL('@/assets/profile/bart.jpg', import.meta.url).href // 假设你有图片
      },
      {
        name: "Yasin Bakis",
        title: "FishNet Co-PI, Data Manager",
        institution: "Tulane University",
        email: "ybakis@tulane.edu",
        phone: "504.394.1711",
        image: new URL('@/assets/profile/yasin.jpg', import.meta.url).href // 假设你有图片
      },
      {
        name: "Xiaojun Wang",
        title: "Research Software Developer",
        institution: "Tulane University",
        email: "xwang48@tulane.edu",
        phone: "504.394.1711",
        image: new URL('@/assets/profile/xiaojun.jpg', import.meta.url).href // 假设你有图片
      },
      {
        name: "Shannon B Cruz",
        title: "Information Coordinator, Primary Contact",
        institution: "Tulane University",
        email: "scruz2@tulane.edu",
        phone: "504.394.1711",
        image: new URL('@/assets/profile/shannon.jpg', import.meta.url).href // 假设你有图片
      },
      {
        name: "Ed Wiley",
        title: "FishNet PI",
        institution: "University of Kansas",
        email: "ewiley@ku.edu",
        phone: "785.864.4038",
        image: new URL('@/assets/profile/ewiley.jpg', import.meta.url).href // 假设你有图片
      },
      {
        name: "Dave Vieglais",
        title: "FishNet Co-PI",
        institution: "University of Kansas",
        email: "vieglais@ku.edu",
        phone: "785.979.0530",
        image: new URL('@/assets/profile/who.jpg', import.meta.url).href // 假设你有图片
      },
      {
        name: "Andy Bentley",
        title: "Evaluation, Testing & Outreach",
        institution: "University of Kansas",
        email: "abentley@ku.edu",
        phone: "785.864.3863",
        image: new URL('@/assets/profile/abentley.jpg', import.meta.url).href // 假设你有图片
      },
      {
        name: "Laura Russell",
        title: "VertNet Programmer",
        institution: "University of Kansas",
        email: "larussell@ku.edu",
        phone: "785.864.4681",
        image: new URL('@/assets/profile/who.jpg', import.meta.url).href // 假设你有图片
      }
    ]);

    return {contacts}
  }
}
</script>

<style scoped>
.el-main {
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-family: 'Open Sans', sans-serif;
}

.contact-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.contact-image {
  width: 100px; /* 固定宽度 */
  height: 100px; /* 固定高度 */
  border-radius: 50%; /* 圆形 */
  object-fit: cover; /* 确保图片不变形 */
}

h3 {
  margin: 0;
  color: #333;
  font-family: 'Open Sans', sans-serif;
}

p {
  margin: 5px 0;
  color: #555;
  font-family: 'Open Sans', sans-serif;
}

.special-thanks {
  text-align: center;
  margin-top: 20px;
  font-family: 'Open Sans', sans-serif;
}

.special-thanks h3 {
  margin-bottom: 10px;
  color: #333;
}
</style>
