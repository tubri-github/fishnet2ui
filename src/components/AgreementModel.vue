<template>
  <el-dialog v-model="showModal" title="Fishnet2 Data Use Agreement" width="50%">
      <h2>Fishnet2 Data Use Agreement</h2>
      <p>Fishnet2 Data-Use Statement</p>
      <p>This site provides open access to data housed in fish collections in natural history museums, universities and other institutions. The institutions providing data to this portal have entered into a data-sharing agreement with Fishnet2. Data are periodically downloaded from databases maintained by the providers and stored in a cache giving users rapid access to the records. The portal also provides users with special features for mapping and visualizing data records, and downloading data. By accepting the terms of the data-use agreement below, users of this data portal agree to abide by both the terms of this agreement, and the individual data-use policies of data providers (accessible through links to each of the data providers).</p>

      <p>Data are provided "as is" for informational purposes only. The Fishnet2 Project and all of the participating data providers make no guarantees, either express or implied, about the completeness, accuracy, or currency of the information, or its suitability for any particular purpose. Although each provider institution strives to provide the most accurate and up-to-date information possible, outdated names, mistaken identifications and erroneous localities can and do occur. Users of the data are urged to verify all data by direct examination of specimens and associated records and to alert data providers of any suspect data records. Citing specimens and mapping localities from secondary sources such as FishNet2 without prior data verification is strongly discouraged.</p>

      <p>Data obtained from FishNet2 are intended for non-profit educational use and personal use in research by students and scholars. The data may not be repackaged, resold or redistributed in any form without the expressed written consent of the appropriate curatorial authority at each of the institutions holding components of the data. Users agree to acknowledge the provenance of the original data provider and the Fishnet2 Project in all presentations and publications. Neither Fishnet2, curatorial authorities at provider institutions, nor the provider institutions themselves, bear any responsibility for damages, injury or loss due to the use of their data.</p>

      <p>Please use the following format to cite data retrieved from the Fishnet2 Portal:</p>

      <p>Fish specimen data used in this study obtained from the [List provider institutions] (Accessed through the Fishnet2 Portal, www.fishnet2.org, YYYY-MM-DD).</p>

      <p> For example: Fish data used in this study obtained from the Field Museum of Natural History, Museum of Vertebrate Zoology, University of Kansas Museum of Natural History, Tulane University Museum of Natural History (Accessed through the Fishnet2 Portal, www.fishnet2.org, 2010-01-14).</p>

      <p>Please click on the "Accept terms" link below to execute this agreement.</p>

      <p>Depending on your browser settings, a cookie may be stored to acknowledge your acceptance of these terms.</p>
      <!-- 包含其余的协议内容 -->
      <template #footer>
        <el-button @click="declineTerms">Decline terms</el-button>
        <el-button type="primary" @click="acceptTerms">Accept terms</el-button>
      </template>
  </el-dialog>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'AgreementModal',
  setup() {
    const showModal = ref(true);

    const acceptTerms = () => {
      localStorage.setItem('fishnet2-data-use-accepted', Date.now().toString());
      showModal.value = false;
    };

    const declineTerms = () => {
      showModal.value = true; // 如果拒绝，保持显示弹框
    };

    onMounted(() => {
      const accepted = localStorage.getItem('fishnet2-data-use-accepted');
      if (accepted && (Date.now() - parseInt(accepted) < 15 * 24 * 60 * 60 * 1000)) { // 15天的毫秒数
        showModal.value = false;
      }
    });

    return {
      showModal,
      acceptTerms,
      declineTerms
    };
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}

.el-button--primary {
  background-color: #637fc4;
  border-color: #637fc4;
}

.el-button--primary:hover {
  background-color: #556aa8;
  border-color: #556aa8;
}

.el-button {
  font-family: 'Open Sans', sans-serif;
}
</style>
