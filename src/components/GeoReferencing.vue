<template>
  <el-container class="about-container">
    <el-row>
      <el-col :span="14">
        <el-main class="about-main">
          <h2>Collaborative Georeferencing Project (2012-2015)</h2>
          <p>A collaborative georeferencing and data enhancement project titled "Georeferencing U.S. Fish Collections: a community-based model to georeference natural history collections" has been funded by the United States National Science Foundation. Twelve collaborating institutions are working to expand and improve data quality within the FishNet network with a primary focus on geospatial referencing records lacking geographic coordinates (approximately 45% of the network holdings at the time of funding).</p>

          <h3>Collaborators</h3>
          <ul class="collaborators">
            <li><span class="institution">ANSP</span>, Academy of Natural Sciences Philadelphia <br>
              <span class="pi">PIs: John Lundberg & Mark Sabaj, Tech: Marianegeles Arce Hernandez</span></li>
            <li><span class="institution">CAS</span>, California Academy of Sciences <br>
              <span class="pi">PIs: Luiz Rocha & Dave Catania, Tech: Lorenzo Benito</span></li>
            <li><span class="institution">CUMV</span>, Cornell University <br>
              <span class="pi">PIs: Amy McCune & John Friel, Tech: Laura Porturas</span></li>
            <li><span class="institution">FMNH</span>, Field Museum <br>
              <span class="pi">PIs: Mark Westneat & Leo Smith, Tech: Justin Grubich</span></li>
            <li><span class="institution">LACM</span>, Los Angeles County Museum <br>
              <span class="pi">PIs: Chris Thacker & Rick Feeney, Tech: Paul DeSalles</span></li>
            <li><span class="institution">TU</span>, Tulane University <br>
              <span class="pi">PIs: Hank Bart & Nelson Rios, Project Manager: Michael Doosey, Tech: Megan Roberson</span></li>
            <li><span class="institution">FLMNH</span>, University of Florida <br>
              <span class="pi">PIs: Larry Page & Rob Robins, Tech: Michelle Vanderwell</span></li>
            <li><span class="institution">INHS</span>, University of Illinois at Urbana-Champaign <br>
              <span class="pi">PIs: Chris Taylor, Tech: Rachel Vinsel</span></li>
            <li><span class="institution">KU</span>, University of Kansas <br>
              <span class="pi">PIs: Ed Wiley & Andy Bentley, Tech: Katy Wichman</span></li>
            <li><span class="institution">UMMZ</span>, University of Michigan Ann Arbor <br>
              <span class="pi">PIs: Bill Fink & Douglas Nelson, Tech: Diego Barroso</span></li>
            <li><span class="institution">MSB</span>, University of New Mexico <br>
              <span class="pi">PIs: Tom Turner & Alexandra Snyder, Tech: Theresa Lorraine McInnes</span></li>
            <li><span class="institution">UT</span>, University of Texas at Austin <br>
              <span class="pi">PIs: Dean Hendrickson, Tech: Melissa Casarez</span></li>
          </ul>

          <h3>Status</h3>
          <p>The georeferencing phase has been completed and we are now in the process of data repatriation.</p>

          <p> <a href="repatriation">Project results now available.</a></p>
        </el-main>
      </el-col>
      <el-col :span="10">
        <img src="@/assets/coge2.png" alt="Georeferencing Results" class="distribution-map" />
        <p class="map-caption">Yellow circles indicate approximate locations of participating institutions.</p>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
</script>

<script>
export default {
  name: 'GeoReferencing',
};
</script>

<style scoped>
.about-container {
  padding: 20px;
}

.about-main {
  padding-right: 20px;
  text-align: left;
}

h2 {
  color: #007bff;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 10px;
}

h3 {
  color: #007bff;
  font-family: 'Open Sans', sans-serif;
  margin-top: 20px;
}

p {
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

.collaborators {
  list-style-type: none;
  padding-left: 0;
}


.collaborators li {
  color: #333;
  font-size: 0.8rem;
  font-family: 'Open Sans', sans-serif;
  line-height: 1.6;
  margin-bottom: 5px;
}

.collaborators .institution {
  font-weight: bold;
  color: #007bff;
}

.collaborators .pi {
  color: #d9534f;
}

.distribution-map {
  width: 100%;
  margin-top: 20px;
  border: 1px solid #ccc;
}

.map-caption {
  text-align: center;
  font-size: 14px;
  color: #555;
  font-family: 'Open Sans', sans-serif;
  margin-top: 5px;
}
</style>
