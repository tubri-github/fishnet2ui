<template>
  <el-container class="funding-container">
    <el-main>
      <h2>Funding</h2>
      <section class="funding-section">
        <h3>FishNet 2 funding has received support from the following grants and institutions:</h3>
        <div class="funding-item">
          <img src="@/assets/funding/nsf1_100x101.gif" alt="NSF Logo" class="funding-logo">
          <div>
            <p>The <a href="#">National Science Foundation (NSF)</a></p>
            <ul>
              <li>Collaborative Research: CSBR: Natural History Collections: Georeferencing U.S. Fish Collections: a community-based model to georeference natural history collections
                <br> Award Numbers: <a href="#">DBI 1203120</a>, <a href="#">DBI 1203137</a>, <a href="#">DBI 1203453</a>, <a href="#">DBI 1202933</a>, <a href="#">DBI 1203462</a>, <a href="#">DBI 1202920</a>, <a href="#">DBI 1203106</a>, <a href="#">DBI 1203050</a>, <a href="#">DBI 1203032</a>, <a href="#">DBI 1202663</a>, <a href="#">DBI 1203382</a> and <a href="#">DBI 1203053</a>
              </li>
              <li>RAPID: Enhancement of Fishnet2 for Disaster Impact Assessment
                <br> Award Number: <a href="#">DBI 1045668</a>
              </li>
              <li>Collaborative Research: Building the Information Community Infrastructure - A Test Case Implementation for Ichthyological Collections
                <br> Award Numbers: <a href="#">DBI 0417001</a> and <a href="#">DBI 0415600</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="funding-item">
          <img src="@/assets/funding/Nbii_logo.gif" alt="NBII Logo" class="funding-logo">
          <p>The <a href="#">National Biological Information Infrastructure (NBII)</a></p>
        </div>
      </section>

      <section class="funding-section">
        <h3>The original FishNet project was supported by the following grants and institutions:</h3>
        <div class="funding-item">
          <img src="@/assets/funding/nsf1_100x101.gif" alt="NSF Logo" class="funding-logo">
          <div>
            <p>The <a href="#">National Science Foundation (NSF)</a></p>
            <ul>
              <li>(SGER) A Predictive Data Network for Fish Diversity: The FISHNET Prototype System
                <br> Award Number: <a href="#">DEB 9985737</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="funding-item">
          <img src="@/assets/funding/small-nopp-logo.gif" alt="Nopp Logo" class="funding-logo">
          <p><a href="#">The National Oceanographic Partnership Program</a></p>
        </div>
        <div class="funding-item">
          <img src="@/assets/funding/onr.jpg" alt="ONR Logo" class="funding-logo">
          <p><a href="#">The Office of Naval Research</a></p>
        </div>
        <div class="funding-item">
          <img src="@/assets/funding/coreLogo.jpg" alt="CORE Logo" class="funding-logo">
          <p><a href="#">Consortium of Oceanographic Research and Education</a></p>
        </div>
        <div class="funding-item">
          <img src="@/assets/funding/small-coml-logo.gif" alt="Census of Marine Life Logo" class="funding-logo">
          <p><a href="#">Census of Marine Life</a></p>
        </div>
      </section>
    </el-main>
  </el-container>
</template>

<script setup>
</script>

<script>
export default {
  name: 'FundingPage',
};
</script>

<style scoped>
.funding-container {
  padding: 20px;
  text-align: left;
}

h2 {
  color: #007bff;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 20px;
}

h3 {
  color: #333;
  font-family: 'Open Sans', sans-serif;
  margin-top: 20px;
}

p, ul, li {
  color: #555;
  font-family: 'Open Sans', sans-serif;
  line-height: 1.6;
  margin-bottom: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.funding-section {
  margin-bottom: 40px;
}

.funding-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.funding-logo {
  width: 100px;
  height: auto;
  margin-right: 20px;
}
</style>
