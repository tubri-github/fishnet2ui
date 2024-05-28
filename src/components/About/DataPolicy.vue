<template>
  <el-container class="about-container">
    <el-row>
      <el-col>
        <el-main class="about-main">
          <h2>Data Sharing and Use Policies</h2>
          <h3>Data sharing agreement for partner institutions</h3>
          <p>1. In developing this data-sharing agreement, the Fishnet2 Project is basically adhering to the data-sharing goals and principles of the Global Biodiversity Information Facility (GBIF), of making biodiversity data openly and universally available, within the framework of the Fishnet2 Data-Use Agreement, and with additional terms and conditions that each data provider has identified in its policy statements and/or its metadata.</p>
          <p>2. Institutional data providers who accept the terms of this agreement express their willingness to make their biodiversity data available to the scientific research community and the general public through the Fishnet2 Portal.</p>
          <p>3. Data Providers understand that the Fishnet2 Portal periodically harvests and caches data from its provider network, and that searches are performed on the data cache for rapid access to the records.</p>
          <p>4. Data providers may be databases that aggregate and/or manage data from several institutional data sources. These data providers warrant that they have the necessary agreements with all of their original data owners that data can be made available through the Fishnet2 Portal.</p>
          <p>5. The Fishnet2 Project does not assert any intellectual property rights to data that are made available through its network.</p>
          <p>6. Data providers have made reasonable efforts to ensure that the data they serve are accurate.</p>
          <p>7. Responsibility for restriction of access to sensitive data rests with each data provider.</p>
          <p>8. The data provider includes stable and unique identifiers in their data so that the owner of the data is known and for other necessary purposes.</p>
          <p>9. The Fishnet2 Portal has the capability to serve a provider?s data in full or in part, within the terms and conditions for data use set by the data provider.</p>
          <p>10. The Fishnet2 Portal will log and periodically report to data providers statistics on use of their data.</p>
          <p>11. The Fishnet2 Project, its leaders and employees, shall not be held liable or responsible for either the contents or use of data in its cache; or for any loss, damage, claim, cost or expense, however it may arise, resulting from use of the Fishnet2 Portal.</p>

          <h2>Data use statement for FishNet users</h2>
          <p>· This site provides open access to data housed in fish collections in natural history museums, universities and other institutions. The institutions providing data to this portal have entered into a data-sharing agreement with Fishnet2. Data are periodically downloaded from databases maintained by the providers and stored in a cache giving users rapid access to the records. The portal also provides users with special features for mapping and visualizing data records, and downloading data. By accepting the terms of the data-use agreement below, users of this data portal agree to abide by both the terms of this agreement, and the individual data-use policies of data providers (accessible through links to each of the data providers).</p>

          <p>· Data are provided "as is" for informational purposes only. The Fishnet2 Project and all of the participating data providers make no guarantees, either express or implied, about the completeness, accuracy, or currency of the information, or its suitability for any particular purpose. Although each provider institution strives to provide the most accurate and up-to-date information possible, outdated names, mistaken identifications and erroneous localities can and do occur. Users of the data are urged to verify all data by direct examination of specimens and associated records and to alert data providers of any suspect data records. Citing specimens and mapping localities from secondary sources such as FishNet2 without prior data verification is strongly discouraged.</p>

          <p>· Data obtained from FishNet2 are intended for non-profit educational use and personal use in research by students and scholars. The data may not be repackaged, resold or redistributed in any form without the expressed written consent of the appropriate curatorial authority at each of the institutions holding components of the data. Users agree to acknowledge the provenance of the original data provider and the Fishnet2 Project in all presentations and publications. Neither Fishnet2, curatorial authorities at provider institutions, nor the provider institutions themselves, bare any responsibility for damages, injury or loss due to the use of their data.</p>

          <p>· The following format should be used to cite data retrieved from the Fishnet2 Portal:</p>

          <p>  Fish specimen data used in this study obtained from the [List provider institutions] (Accessed through the Fishnet2 Portal, www.fishnet2.org, YYYY-MM-DD).</p>

          <p>   For example: Fish data used in this study obtained from the Field Museum of Natural History, Museum of Vertebrate Zoology, University of Kansas Museum of Natural History, Tulane University Biodiversity Research Institute (Accessed through the Fishnet2 Portal, www.fishnet2.net, 2010-01-14).</p>
        </el-main>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
</script>

<script>
export default {
  name: 'DataPolicy',
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
