<template>
  <el-container class="api-help-container">
    <el-main>
      <h1>FishNet2 v1 API Help</h1>

      <section class="section">
        <h2>Services</h2>
        <p>Default behavior for all services</p>
        <ul>
          <li>All FishNet2 services provide comma-separated value (csv) formatted output.</li>
          <li>Tab-delimited formatted text is supported with the &format=txt parameter (<a href="#">more information</a>).</li>
          <li>Services will return all rows matching the query parameters.</li>
          <li>The column names will appear as the first row output. For the Taxa, Providers and Occurrences services, if no occurrences or rows match the query, the 'column headers' row will be the only row returned.</li>
          <li>Services will return error messages for the following reasons:
            <ul>
              <li>Missing or incorrect key (use &key for more information).</li>
              <li>Failure to include at least one of the required query parameters (<a href="#">more information</a>).</li>
              <li>Missing or incorrectly-formatted WKT provided for the Geometry parameter value (<a href="#">more information</a>).</li>
              <li>Missing or incorrectly-formatted date you provided for the Date Range parameter (<a href="#">more information</a>).</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="section">
        <h3>Taxa service</h3>
        <p><b>Location:</b> <a href="http://www.fishnet2.net/api/v1/taxa/">http://www.fishnet2.net/api/v1/taxa/</a></p>
        <p><b>Inputs:</b> See the Parameters section, below.</p>
        <p><b>Output:</b> Default output includes the scientific names, and the number of occurrences of the scientific name matching the query parameters.</p>
        <p><b>Examples:</b>
          <br> <a href="http://www.fishnet2.net/api/v1/taxa/?key=MYKEY&genus=cynodon&species=spilotus">http://www.fishnet2.net/api/v1/taxa/?key=MYKEY&genus=cynodon&species=spilotus</a>
          <br> <a href="http://www.fishnet2.net/api/v1/taxa/?key=MYKEY&genus=cynodon">http://www.fishnet2.net/api/v1/taxa/?key=MYKEY&genus=cynodon</a>
          <br> <a href="http://www.fishnet2.net/api/v1/taxa/?key=MYKEY&family=cynodontidae">http://www.fishnet2.net/api/v1/taxa/?key=MYKEY&family=cynodontidae</a>
        </p>
      </section>

      <section class="section">
        <h3>Providers service</h3>
        <p><b>Location:</b> <a href="http://www.fishnet2.net/api/v1/providers/">http://www.fishnet2.net/api/v1/providers/</a></p>
        <p><b>Inputs:</b> See the Parameters section, below.</p>
        <p><b>Output:</b> Default output includes the institution names, and the number of occurrences of the institution matching the query parameters.</p>
        <p><b>Examples:</b>
          <br> <a href="http://www.fishnet2.net/api/v1/providers/?key=MYKEY&inst_code=amnh">http://www.fishnet2.net/api/v1/providers/?key=MYKEY&inst_code=amnh</a>
          <br> <a href="http://www.fishnet2.net/api/v1/providers/?key=MYKEY&country=USA">http://www.fishnet2.net/api/v1/providers/?key=MYKEY&country=USA</a>
          <br> <a href="http://www.fishnet2.net/api/v1/providers/?key=MYKEY&state_province=New+York">http://www.fishnet2.net/api/v1/providers/?key=MYKEY&state_province=New+York</a>
        </p>
      </section>

      <section class="section">
        <h3>OccurrenceCount service</h3>
        <p><b>Location:</b> <a href="http://www.fishnet2.net/api/v1/occurrencecount/">http://www.fishnet2.net/api/v1/occurrencecount/</a></p>
        <p><b>Inputs:</b> See the Parameters section, below.</p>
        <p><b>Output:</b> Default occurrence service outputs the total number of occurrences, query error state, and the total number of occurrences that geocode matching the query parameters.</p>
        <p><b>Examples:</b>
          <br> <a href="http://www.fishnet2.net/api/v1/occurrencecount/?key=MYKEY&family=Cynodontidae">http://www.fishnet2.net/api/v1/occurrencecount/?key=MYKEY&family=Cynodontidae</a>
          <br> <a href="http://www.fishnet2.net/api/v1/occurrencecount/?key=MYKEY&country=USA">http://www.fishnet2.net/api/v1/occurrencecount/?key=MYKEY&country=USA</a>
          <br> <a href="http://www.fishnet2.net/api/v1/occurrencecount/?key=MYKEY&genus=Cynodon">http://www.fishnet2.net/api/v1/occurrencecount/?key=MYKEY&genus=Cynodon</a>
        </p>
      </section>

      <section class="section">
        <h3>Occurrence service</h3>
        <p><b>Location:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/">http://www.fishnet2.net/api/v1/occurrence/</a></p>
        <p><b>Inputs:</b> See the Parameters section and the <a href="#">Additional Occurrence parameters</a> section, below.</p>
        <p><b>Output:</b> Default output includes CatalogNumber, IndividualCount, ScientificName, Family, PreparationType, Tissues, Latitude, Longitude, CoordinateUncertaintyInMeters, HorizontalDatum, Country, StateProvince, County, Locality, Island, IslandGroup, VerbatimElevation, VerbatimDepth, YearCollected, MonthCollected, DayCollected, Collector, GeorefMethod, LatLongComments, BasisOfRecord, Remarks, DatasetName, and DatasetShortName.</p>
        <p><b>Examples:</b>
          <br> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&family=Cynodontidae">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&family=Cynodontidae</a>
          <br> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&country=USA">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&country=USA</a>
          <br> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&genus=Cynodon">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&genus=Cynodon</a>
        </p>
      </section>

      <section class="section">
        <h3>AvailableMaps service</h3>
        <p><b>Location:</b> <a href="http://www.fishnet2.net/api/v1/availablemaps/">http://www.fishnet2.net/api/v1/availablemaps/</a></p>
        <p><b>Inputs:</b> To show all of the maps, the &api parameter is required.
        <ul>
          <li>All other parameters are optional. A list of all of the maps and the associated metadata will be provided by default.</li>
          <li>The &map parameter can be used to query for selected maps.</li>
        </ul>
        </p>
        <p><b>Examples:</b>
          <br> <a href="http://www.fishnet2.net/api/v1/availablemaps/?key=MYKEY&map=1">http://www.fishnet2.net/api/v1/availablemaps/?key=MYKEY&map=1</a>
          <br> <a href="http://www.fishnet2.net/api/v1/availablemaps/?key=MYKEY&map=2">http://www.fishnet2.net/api/v1/availablemaps/?key=MYKEY&map=2</a>
          <br> <a href="http://www.fishnet2.net/api/v1/availablemaps/?key=MYKEY&map=3">http://www.fishnet2.net/api/v1/availablemaps/?key=MYKEY&map=3</a>
        </p>
      </section>

      <section class="section">
        <h3>Locations service</h3>
        <p><b>Location:</b> <a href="http://www.fishnet2.net/api/v1/locations/">http://www.fishnet2.net/api/v1/locations/</a></p>
        <p><b>Inputs:</b> See the Parameters section, below.</p>
        <p><b>Output:</b> Default output includes the institution, institution code, and the number of occurrences of the institution matching the query parameters. The locations service outputs the country, state/province, county, locality, island, island group, and number of occurrences for the location matching the query parameters.</p>
        <p><b>Examples:</b>
          <br> <a href="http://www.fishnet2.net/api/v1/locations/?key=MYKEY&country=USA">http://www.fishnet2.net/api/v1/locations/?key=MYKEY&country=USA</a>
          <br> <a href="http://www.fishnet2.net/api/v1/locations/?key=MYKEY&state_province=New+York">http://www.fishnet2.net/api/v1/locations/?key=MYKEY&state_province=New+York</a>
          <br> <a href="http://www.fishnet2.net/api/v1/locations/?key=MYKEY&county=Kings">http://www.fishnet2.net/api/v1/locations/?key=MYKEY&county=Kings</a>
        </p>
      </section>

      <section class="section">
        <h2>Parameters</h2>
        <h3>Required API Key Parameter</h3>
        <p><b>API Key:</b> All FishNet2 services require the &key parameter. Without a valid &key parameter, your query will not be processed. Please go to <a href="http://www.fishnet2.net/api/v1/keys/">http://www.fishnet2.net/api/v1/keys/</a> for a key.</p>
        <p><b>Format:</b> <a href="http://www.fishnet2.net/api/v1/keys/?key=MYKEY">http://www.fishnet2.net/api/v1/keys/?key=MYKEY</a></p>
      </section>

      <section class="section">
        <h3>Query parameters for all services</h3>
        <p><b>REQUIRED:</b> At least one of the following parameters is required, though any or all can be permitted in a single query.</p>
        <ul>
          <li><b>Taxon:</b> Use this to search scientific and family names. It supports the 'OR' operator, permitting the search of multiple taxa with one query.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/taxa/?key=MYKEY&genus=cynodon&species=spilotus">http://www.fishnet2.net/api/v1/taxa/?key=MYKEY&genus=cynodon&species=spilotus</a>
            <br> <b>Examples:</b> <a href="http://www.fishnet2.net/api/v1/taxa/?key=MYKEY&family=cynodontidae">http://www.fishnet2.net/api/v1/taxa/?key=MYKEY&family=cynodontidae</a>
          </li>
          <li><b>Location:</b> Use this to search country, continent, county, ocean, island, state, province and locality. It supports the 'OR' operator, permitting the search of multiple locations with one query.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/locations/?key=MYKEY&country=USA">http://www.fishnet2.net/api/v1/locations/?key=MYKEY&country=USA</a>
            <br> <b>Examples:</b> <a href="http://www.fishnet2.net/api/v1/locations/?key=MYKEY&state_province=New+York">http://www.fishnet2.net/api/v1/locations/?key=MYKEY&state_province=New+York</a>
          </li>
          <li><b>Catalog Number:</b> Use this to search by Catalog Number and/or Institution Code. It supports the 'OR' operator, permitting the search of multiple Catalog Numbers and/or Institution Codes with one query.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&catalog_number=12345">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&catalog_number=12345</a>
            <br> <b>Examples:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&catalog_number=54321">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&catalog_number=54321</a>
          </li>
          <li><b>Date Range:</b> Dates are given by the year or by the year and month for ranges of interest. Date ranges must be in YYYY-MM format.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&start_date=2000&end_date=2020">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&start_date=2000&end_date=2020</a>
            <br> <b>Examples:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&start_date=1990&end_date=2000">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&start_date=1990&end_date=2000</a>
          </li>
          <li><b>Other:</b> Use this to search for terms of interest that may be in the remarks, notes, scientific name, collectors, preparation type, location fields or elsewhere in the occurrence. It supports the 'OR' operator, permitting the search of multiple terms with one query.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&other=remarks">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&other=remarks</a>
            <br> <b>Examples:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&other=collector">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&other=collector</a>
          </li>
          <li><b>Geometry:</b> Records within a geographic area defined by one of the available maps. Maps are designated by MapIDs (see <a href="http://www.fishnet2.net/api/v1/availablemaps/">AvailableMaps</a> for a list of valid MapIDs). Note that the Map parameter and the Geometry parameter (see above) are mutually exclusive. If both are submitted, the Map parameter will be ignored.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&geometry=POLYGON((...))">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&geometry=POLYGON((...))</a>
            <br> <b>Examples:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&geometry=POLYGON((-112,45,-100,45,-100,40,-112,40,-112,45))">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&geometry=POLYGON((-112,45,-100,45,-100,40,-112,40,-112,45))</a>
          </li>
        </ul>
      </section>

      <section class="section">
        <h3>Optional parameters</h3>
        <p>The following parameters are optional, and may be added to any query that also includes the required parameters.</p>
        <ul>
          <li><b>Format:</b> Use &format=txt for tab-delimited text or &format=csv for comma-separated values. If no format parameter is provided, the default value is 'csv'.</li>
          <li><b>Attachment:</b> Use &attachment=1 (or '0' or 'open'). If no attachment parameter is provided, the default value is '0'. When &attachment is set to '1' or 'open', the service appends a file name to the response header. This will allow enabled browsers to render the search results as a file attachment.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&format=txt&attachment=1">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&format=txt&attachment=1</a>
          </li>
        </ul>
      </section>

      <section class="section">
        <h3>Additional parameters for the Occurrence service</h3>
        <p>The following are optional parameters for the Occurrence service, and may be added to any query that also includes the required parameters.</p>
        <ul>
          <li><b>Columns:</b> This is a comma-delimited list of column names, to specify the columns and order of columns to be returned by your search query. All columns are returned by default.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&columns=taxon,location">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&columns=taxon,location</a>
          </li>
          <li><b>Number of occurrences to return:</b> Use this parameter to limit the number of occurrences to be returned. The maximum value of 10,000 is permitted for any single query. By default, all results will be returned, even if the number of occurrences exceeds 10,000.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&limit=1000">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&limit=1000</a>
          </li>
          <li><b>Start with a given row:</b> Use this parameter to begin the return of results at the given row. This parameter can be used for paging by specifying the first occurrence to be returned for the set of search results. By default, the first occurrence is always set to 1. If a value is specified for this parameter that exceeds the number of records in the result set, no occurrences will be returned.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&start=101">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&start=101</a>
          </li>
          <li><b>Return results without the column names:</b> Use this to suppress the return of the column names in the first row of the output. Valid values are '1' or '0' (zero). By default the value is set to '0', and column names will always be returned with any results.
            <br> <b>Format:</b> <a href="http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&include_column_names=0">http://www.fishnet2.net/api/v1/occurrence/?key=MYKEY&include_column_names=0</a>
          </li>
        </ul>
      </section>

    </el-main>
  </el-container>
</template>

<script setup>
</script>

<script>
export default {
  name: 'ServicesDoc',
};
</script>

<style scoped>
.api-help-container {
  padding: 20px;
  text-align: left;
}

h1 {
  color: #007bff;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 20px;
}

h2, h3 {
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

.section {
  margin-bottom: 20px;
}
</style>
