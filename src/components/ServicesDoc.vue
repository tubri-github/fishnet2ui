<template>
  <el-container class="api-help-container">
    <el-main>
      <h1>FishNet2 v1 API Help</h1>

      <section class="section">
        <h2>Services</h2>
        <p>Default behavior for all services</p>
        <ul>
          <li>All FishNet2 services provide comma-separated value (csv) formatted output.</li>
          <li>Tab-delimited formatted text is supported with the &format=txt parameter (<a href="#allOption">more information</a>).</li>
          <li>Services will return all rows matching the query parameters.</li>
          <li>The column names will appear as the first row output. For the Taxa, Providers and Occurrences services, if no occurrences or rows match the query, the 'column headers' row will be the only row returned.</li>
          <li>Services will return error messages for the following reasons:
            <ul>
              <li>Missing or incorrect Api key (<a href="#apikey"> more information</a>).</li>
              <li>Failure to include at least one of the required query parameters (<a href="#allReq">more information</a>).</li>
              <li>Missing or incorrectly-formatted WKT provided for the Geometry parameter value (<a href="#geo">more information</a>).</li>
              <li>Missing or incorrectly-formatted date you provided for the Date Range parameter (<a href="#dr">more information</a>).</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="section">
        <h3>Taxa service</h3>
        <ul>
          <li><p><b>Location:</b> <a href="https://www.fishnet2.net/api/v1/taxa/">http://www.fishnet2.net/api/v1/taxa/</a></p></li>
          <li><p><b>Inputs:</b> See the Parameters section, below.</p></li>
          <li><p><b>Default Output:</b> ScientificName, Num Records</p></li>
          <li> <p><b>Description:</b> The Taxa service outputs the scientific names, and the number of occurences of the scientific name matching the query parameters.</p></li>
          <li><p><i>Examples:</i> 
            <br><i> https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&q=larva</i>
            <br> <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&c=mnhn or usnm</i>
          </p></li>
        </ul>
      </section>

      <section class="section">
        <h3>Providers service</h3>
        <ul>
            <li><p><b>Location:</b> <a href="https://www.fishnet2.net/api/v1/providers/">http://www.fishnet2.net/api/v1/providers/</a></p></li>
            <li><p><b>Inputs:</b> See the Parameters section, below.</p></li>
          <li><p><b>Default Output:</b> Institution, InstitutionCode, Num Records</p></li>
          <li><p><b>Description:</b> The Taxa service outputs the scientific names, and the number of occurences of the scientific name matching the query parameters.</p></li>
          <li><p><i>Examples:</i> 
            <br> <i>https://www.fishnet2.net/api/v1/providers/?api=MyAPIKey&l=usa</i>
            <br> <i>https://www.fishnet2.net/api/v1/providers/?api=MyAPIKey&d=1950-1975</i>
          </p></li></ul>
      </section>

      <section class="section">
        <ul>
          <li><h3>OccurrenceCount service</h3></li>
          <li> <p><b>Location:</b> <a href="https://www.fishnet2.net/api/v1/occurrencecount/">http://www.fishnet2.net/api/v1/occurrencecount/</a></p></li>
          <li><p><b>Inputs:</b> See the Parameters section, below.</p></li>
          <li><p><b>Default Output:</b> TotRows, No Error, GeoTot </p></li>
          <li> <p><b>Description:</b> The OccurrenceCount service outputs the total number of occurrences, query error state, and the total number of occurences that geocode matching the query parameters.</p></li>
          <li> <p><i>Examples:</i> 
            <br> <i>https://www.fishnet2.net/api/v1/occurrencecount/?api=MyAPIKey&q=ethanol or EtOH</i>
            <br> <i> https://www.fishnet2.net/api/v1/occurrencecount/?api=MyAPIKey&p=POLYGON((-93.998292265615 32.615318339629,-92.471192656236 32.606063985828,-92.635987578112 31.235349580893,-90.988038359361 31.19776691287,-90.955079374988 30.395621231989,-93.94336062499 30.386144489302,-93.998292265615 32.615318339629))</i>
          </p></li>
        </ul>
      </section>

      <section class="section">

        <h3>Occurrence service</h3>
        <ul>
          <li> <p><b>Location:</b> <a href="https://www.fishnet2.net/api/v1/occurrence/">http://www.fishnet2.net/api/v1/occurrence/</a></p></li>
          <li><p><b>Inputs:</b> See the Parameters section and the <a href="#">Additional Occurrence parameters</a> section, below.</p></li>
          <li><p><b>Default Output:</b> InstitutionCode, CollectionCode, CatalogNumber, IndividualCount, ScientificName, Family, PreparationType, Tissues, Latitude, Longitude, CoordinateUncertaintyInMeters, HorizontalDatum, Country, StateProvince, County, Island, IslandGroup, Locality, VerbatimElevation, VerbatimDepth, YearCollected, MonthCollected, DayCollected, Collector, GeorefMethod, LatLongComments, BasisOfRecord, Remarks, DateLastModified</p></li>
          <li>  <p><b>Description:</b>The Occurrence service outputs the occurrence data matching the query parameters.</p></li>
          <li>  <p><i>Examples:</i> 
            <br> <i>https://www.fishnet2.net/api/v1/occurrence/?api=MyAPIKey&t=notropis venustus&l=louisiana</i>
          </p></li>
        </ul>
      </section>

      <section class="section">
        <h3>AvailableMaps service</h3>
        <ul>
          <li> <p><b>Location:</b> <a href="http://www.fishnet2.net/api/v1/availablemaps/">http://www.fishnet2.net/api/v1/availablemaps/</a></p></li>
          <li> <p><b>Inputs:</b>
            <ul>
              <li>As with all services, the API parameter is required.</li>
              <li>All other parameters are optional. A list of all of the maps and the associated metadata will be provided by default.</li>
              <li>The q= parameter can be used to query for selected maps.
                <p><i>Examples:</i> 
                  <br>This query will return all of the maps for May or June
                  <i>https://www.fishnet2.net/api/v1/availablemaps/?api=MyAPIKey&q=May or June</i>
                  <br>This query will return all of the maps related to the Federal Fishery Closures
                  <i>https://www.fishnet2.net/api/v1/availablemaps/?api=MyAPIKey&q=Fishery Closure</i>
                </p>
              </li>
              <li>When returning a list, the format parameter (fmt=) and attachment parameters (att=) are available (see here for details and examples).</li>
              <li>Instead of returning a list, use the download parameter d= with a map name to download a KML file corresponding to that FileName.
                Example:
                https://www.fishnet2.net/api/v1/availablemaps/?api=MyAPIKey&d=FisheryClosure_050210
                https://www.fishnet2.net/api/v1/availablemaps/?api=MyAPIKey&d=NESDIS Anomaly RS2 6-24-10
                You will receive an error message if the FileName does not exist.</li>
            </ul>
          </p></li>
          <li> <p><b> Default Output:MapID, DisplayName, FileName, MapDescription</b></p></li>
          <li>  <p><b>Description:</b>The Available Maps service outputs metadata about the maps currently available for querying against in our database with the &m= parameter, or it outputs a map in KML format.</p></li>
          <li>  <p><i>Examples:</i> 
            <br> <i>https://www.fishnet2.net/api/v1/availablemaps/?api=MyAPIKey</i>
            <br> <i>https://www.fishnet2.net/api/v1/availablemaps/?api=MyAPIKey&q=May or June</i>
            <br> <i>https://www.fishnet2.net/api/v1/availablemaps/?api=MyAPIKey&d=FisheryClosure_053110</i>
          </p></li>
        </ul>
      </section>

      <section class="section">
        <h3>Locations service</h3>
        <ul>
          <li> <p><b>Location:</b> <a href="http://www.fishnet2.net/api/v1/locations/">http://www.fishnet2.net/api/v1/locations/</a></p></li>
          <li>  <p><b>Inputs:</b> See the Parameters section, below.</p></li>
          <li> <p><b>Default output:</b>Country, StateProvince, County, Locality, Latitude, Longitude, Num Records </p></li>
          <li>  <p><b>Description:</b>The Providers service outputs the institution, institution code, and the number of occurences of the institution matching the query parameters. The Locations service outputs the country, state/province, county, locality, latitude, longitude and the number of occurences for that location the query parameters.
          </p></li>
          <li>  <p><i>Examples:</i> 
            <br> <i>https://www.fishnet2.net/api/v1/locations/?api=MyAPIKey&t=notropis venustus&d=2000-2010</i>
          </p></li>
        </ul>
      </section>

      <section class="section" id="apikey">
        <h2>Parameters</h2>
        <h3>Required API Key Parameter</h3>
        <ui>
          <li><b>API Key api=:</b><br> All FishNet2 services require the &key parameter. Without a valid &key parameter, your query will not be processed. Yasin Bakis at <a href="mailto:ybakis@tulane.edu">ybakis@tulane.edu</a> for a key.
            <p><i>Examples:</i> <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey</i></p></li>
        </ui>
      </section>

      <section class="section" id="allReq">
        <h3 >Query parameters for all services</h3>
        <p><b >REQUIRED:</b> At least one of the following parameters is required, though any or all can be permitted in a single query.</p>
        <ul>
          <li><b>Taxon: t=</b><br>Use this to search scientific and family names. It supports the 'OR' operator, permitting the search of multiple taxa with one query.
            <p><i>Examples:</i> 
              <br> <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&t=notropis</i>
              <br> <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&t=notropis or nezumia</i>
              <br> <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&t=Blenniidae</i>
              </p>
          </li>
          <li><b>Location: l=</b><br> Use this to search country, continent, county, ocean, island, state, province and locality. It supports the 'OR' operator, permitting the search of multiple locations with one query.
            <p><i>Examples:</i> 
              <br> <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&l=usa</i>
              <br> <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&l=alabama or gulf of mexico</i>
              <br> <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&t=Africa</i>
            </p>
          <p class="inner">
            You may also restrict your search to the continent/ocean, country, state/province and/or county fields by using the continentocean, country, stateprovince and/or county delimiters in the following format:
            [delimiter]:[search term] - (e.g. county:orleans)
            Multiple delimiters/search term combinations should be separated with semicolons:
            [delimiter]:[search term];[delimiter]:[search term] - (e.g. stateprovince:illinois;county:cook)
          </p>
            <p><i>Examples:</i> 
              <br>This query will return occurrences matching the state of Mississippi, and not occurrences outside of that state of Mississippi that happen to have the word 'Mississippi' (e.g. 'Mississippi River') in the Locality field.
                <i>https://www.fishnet2.net/api/v1/locations/?api=MyAPIKey&l=stateprovince:Mississippi</i>
              <br> This query will return all occurrences that have been collected in Grand County, Utah.
                <i>https://www.fishnet2.net/api/vi/locations/?api=MyAPIKey&l=stateprovince:Utah;county:Grand</i>
            </p>
          </li>
          <li><b>Catalog Number/Institution Code: c=:</b><br> Use this to search by Catalog Number and/or Institution Code. It supports the 'OR' operator, permitting the search of multiple Catalog Numbers and/or Institution Codes with one query.
            <p><i>Examples:</i> <br>
              <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&c=TU 1</i>
              <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&c=mnhn or usnm</i>
              <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&c=ku 29288 or tu 66762</i>
            </p>
          </li>
          <section id="dr">
          <li><b>Date Range d=:</b><br> Use this to search by the year or years the occurrence was collected. Date Ranges must be in yyyy-yyyy format.
            <p><i>Examples:</i> <br>
              <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&d=2000-2000</i>
              <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&d=1950-1975</i>
            </p>
          </li></section>
          <li><b>Other: q=</b><br> Use this to search for terms of interest that may be in the remarks, notes, scientific name, collector, preparation type, location fields or elsewhere in the occurrence. It supports the 'OR' operator, permitting the search of multiple terms with one query.
            <p><i>Examples:</i> <br>
              <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&q=larva</i>
              <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&q=ethanol or EtOH</i>
            </p>
          </li>
          <section id="geo"><br>
            <li><b>Geometry p=:</b><br>Use this to define a geometric query in well-known text (WKT) format. Input polygons are limited to 250 vertices or 10,000 characters. Note that the Map parameter and the Geometry parameter (see below) are mutually exclusive. If both are submitted, the Map parameter will be ignored.
              <p><i>Examples:</i> <br>
                <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&p=POLYGON((-93.998292265615 32.615318339629,-92.471192656236 32.606063985828,-92.635987578112 31.235349580893,-90.988038359361 31.19776691287,-90.955079374988 30.395621231989,-93.94336062499 30.386144489302,-93.998292265615 32.615318339629))</i>
              </p>
            </li>
          </section>
          <section id="map">
            <li><b>Map m=:</b><br> Records within a geographic area defined by one of the available maps. Maps are designated by MapIDs (see <a href="http://www.fishnet2.net/api/v1/availablemaps/">AvailableMaps</a> for a list of valid MapIDs). Note that the Map parameter and the Geometry parameter (see above) are mutually exclusive. If both are submitted, the Map parameter will be ignored.
              <p><i>Examples:</i> <br>
                <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&m=14</i>
              </p>
            </li>
          </section>
        </ul>
      </section>

      <section class="section" id="allOption">
        <h3>Optional parameters</h3>
        <p>The following parameters are optional, and may be added to any query that also includes the required parameters.</p>
        <ul>
          <li><b>Format fmt=:</b><br> Valid values are 'txt' (tab-delimited text) or 'csv' (comma-separated values). If no format parameter is provided, the default value is 'csv'.
            <p><i>Examples:</i> <br>
              <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&t=notropis venustus&l=louisiana&fmt=txt
              </i>
            </p>
          </li>
          <li><b>Attachment: att=</b><br> Valid values are '1' or '0' (zero). If no attachment parameter is provided, the default value is '0'. When &att=1, the service appends a file name to the response header. This will allow enabled clients (e.g. web browsers) to recieve the search results as a file attachment.
            <p><i>Examples:</i> <br>
              <i>https://www.fishnet2.net/api/v1/taxa/?api=MyAPIKey&t=notropis venustus&l=louisiana&fmt=txt&att=1
              </i>
            </p>
          </li>
        </ul>
      </section>

      <section class="section">
        <h3>Additional parameters for the Occurrence service</h3>
        <p>The following are optional parameters for the Occurrence service, and may be added to any query that also includes the required parameters.</p>
        <ul>
          <li><b>Columns: cols=</b><br> Use this parameter, followed by a comma-delimited list of column names, to specify the columns and order of columns to be returned by your search query. All columns are returned by default, in the sequence shown below.
            <p><i>Examples:</i> <br>
              <i>
                https://www.fishnet2.net/api/v1/occurrence/?api=MyAPIKey&l=louisiana&cols=Latitude,Longitude,Family,ScientificName,IndividualCount,Remarks
              </i>
            </p>
            <p class="inner">Valid column names (in default order):</p>
             <p>InstitutionCode, CollectionCode, CatalogNumber, IndividualCount, ScientificName, Family, PreparationType, Tissues, Latitude, Longitude, CoordinateUncertaintyInMeters, HorizontalDatum, Country, StateProvince, County, Island, IslandGroup, Locality, VerbatimElevation, VerbatimDepth, YearCollected, MonthCollected, DayCollected, Collector, GeorefMethod, LatLongComments, BasisOfRecord, Remarks, DateLastModified
             </p>
          </li>
          <li><b>Number of occurrences: num=</b><br>Use this parameter to limit the number of occurrences returned by the service. A maximum value of 10000 is permitted for any single query. By default all results will be returned, even if the number of occurrences returned exceeds 10,000.
            <i>Examples:</i> <br>
              <p class="inner">This query will return the first 10 results</p>
              <i>https://www.fishnet2.net/api/v1/occurrence/?api=MyAPIKey&l=louisiana&fmt=txt&num=10
              </i>
              <p class="inner">This query will return 1000 results, beginning with the 1000th record (see below)</p>
              <i>https://www.fishnet2.net/api/v1/occurrence/?api=MyAPIKey&c=tu&set=1000&num=1000
              </i>
          </li>
          <li><b>Start value: set=</b><br>For any given search, results will always be returned in the same order. Use this parameter to take control of paging by specifying the first occurrence to be returned for the set of search results. By default, the first occurrence is always set to 1. If a value is specified for this parameter that exceeds the number of records in the result set, no occurrences will be returned.
            <i>Examples:</i> <br>
              <p class="inner">This query will return all results beginning with the 10th</p>
              <i>https://www.fishnet2.net/api/v1/occurrence/?api=MyAPIKey&d=2010-2011&fmt=txt&set=10
              </i>
              <p class="inner">This query will return 1000 results, beginning with the first record - i.e. occurrences 1-1000</p>
              <i>https://www.fishnet2.net/api/v1/occurrence/?api=MyAPIKey&c=tu&num=1000&set=1
              </i>
              <p class="inner">This query will return 1000 results, beginning with the 1001st record - i.e. occurrences 1001-2000</p>
              <i>https://www.fishnet2.net/api/v1/occurrence/?api=MyAPIKey&c=tu&num=1000&set=1001
              </i>
            </li>
          <li><b>No Column Headers: hdr=0</b><br> Set this value to '0' to return results without the column names included as part of the result set. Valid values are '1' or '0' (zero). By default the value is set to '1', and column names will always be included as the first row returned by a result set, even for queries that do not return any results.
            <p><i>Examples:</i> <br>
              <i>https://www.fishnet2.net/api/v1/occurrence/?api=MyAPIKey&c=tu&set=1000&num=1000&hdr=0
              </i>
            </p>
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
i{
  font-size: 12px;
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
b{
  color: #436c9a;
}
p, ul, li {
  color: #555;
  font-family: 'Open Sans', sans-serif;
  font-size:16px;
  line-height: 1.6;
  margin-bottom: 10px;
}
li{
  font-size:14px;
  font-weight: lighter;
}
a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
p.inner{
  font-size: 12px;
}

.section {
  margin-bottom: 20px;
}
</style>
