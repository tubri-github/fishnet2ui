<template>
  <el-container class="join-container">
    <el-main>
      <h2>Join FishNet</h2>
      <p>We understand that not every institution has the ability to provide and maintain the infrastructure to host their own data. Therefore, we try to be as flexible as possible by supporting a number of ways to bring your data online. Before joining FishNet2 please read over the <a href="#">data sharing agreement</a> and make sure these policies are acceptable to you and your institution. <a href="#">Contact us</a> with any question or concerns about the data agreement. Below is a list of currently supported methods for joining the network.</p>

      <h3>Options</h3>
      <ul class="options">
        <li>
          <b>· Integrated Publishing Toolkit</b>
          <p>The recommended approach is that institutions use the GBIF (Global Biodiversity Information Facility) developed IPT (Integrated Publishing Toolkit). The IPT is a Java-based web application. The instructions and requirements for installing IPT can be found at: <a href="http://code.google.com/p/gbif-providertoolkit/wiki/IPT2ManualNotes?tm=6">http://code.google.com/p/gbif-providertoolkit/wiki/IPT2ManualNotes?tm=6</a>. If you already have IPT set up, contact <a href="#">Yasin Bakis</a>.</p>
        </li>
        <li>
          <b>· Spreadsheet Upload</b>
          <p>Send us a .CSV formatted spreadsheet of your data that matches any subset of the data fields listed below. To get started, <a href="#">click here to download a sample template</a>. All you have to do is delete the sample data and copy and paste your data into the listed fields. Preferably saved as a csv file and zipped up. It would be preferred if you had the capability to regularly update and host this file on the internet so that we can refresh your data periodically. If not, just email or ftp (we can give you an FTP address to use) it to us. (FYI, in the coming months we will likely be adding a provider upload capability to the site so providers can easily send us updated files to refresh their data). Contact <a href="#">Yasin Bakis</a> for further information.</p>
          <p class="data-fields">
            <span>InstitutionCode</span> <span>CollectionCode</span> <span>CatalogNumber</span> <span>IndividualCount</span> <span>ScientificName</span> <span>Family</span> <span>PreparationType</span> <span>VerbatimDepth</span> <span>Tissues</span> <span>Latitude</span> <span>Longitude</span> <span>CoordinateUncertaintyInMeters</span> <span>HorizontalDatum</span> <span>Country</span> <span>StateProvince</span> <span>County</span> <span>Locality</span> <span>VerbatimElevation</span> <span>Island</span> <span>IslandGroup</span> <span>DayCollected</span> <span>MonthCollected</span> <span>YearCollected</span> <span>Collector</span> <span>BasisOfRecord</span> <span>ContinentOcean</span> <span>GeorefMethod</span> <span>LatLongComments</span> <span>Remarks</span>
          </p>
        </li>
        <li>
          <b>· DiGIR</b>
          <p><a href="#">DiGIR</a> is a web-based software protocol that reads a data source (MS Access, mySQL, MS SQL Server, etc.) and allows mapping of the data source fieldnames to the Darwin Core compatible field names. This approach is not recommended unless you already have a DiGIR provider running. If so, all you need to send us is the url to the provider, the resource name for the data source and any optional filters to identify which records are fish collection records if your resource is also hosting data for other groups. If you already have DiGIR set up, please contact <a href="#">Yasin Bakis</a>.</p>
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<script setup>
</script>

<script>
export default {
  name: 'JoinUs',
};
</script>

<style scoped>
.join-container {
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

.options {
  list-style-type: none;
  padding-left: 0;
}

.options li {
  margin-bottom: 20px;
}

.options b {
  font-size: 1.1em;
  color: #333;
}

.data-fields {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  font-family: 'Courier New', Courier, monospace;
  color: #445a73;
  font-style: italic;
  margin-top: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
}
</style>
