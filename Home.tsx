import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Pdf from "react-native-pdf";

const PDSHome = () => {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getLocalPdf = (f) => `bundle-assets://pdf/${f}`;

  const [pdsItems, setPdsItems] = useState([
    {
      id: "1",
      name: "उत्तर प्रदेश पुलिस (हिंदी नोट्स)",
      pdf: require("./pdf/up-police-hindi-notes.pdf"),
    },
     {
      id: "2",
      name: "उत्तर प्रदेश पुलिस परीक्षा के लिए महत्वपूर्ण।",
      pdf: require("./pdf/up-police-ke-liye-important.pdf"),
    },
     {
      id: "3",
      name: "उत्तर प्रदेश पुलिस भर्ती परीक्षा (हिंदी नोट्स)",
      pdf: require("./pdf/up-police-ke-liye-important.pdf"),
    },
     {
      id: "4",
      name: "उत्तर प्रदेश पुलिस भर्ती परीक्षा महत्वपूर्ण।",
      pdf: require("./pdf/up-police-bharti-pariksha-important.pdf"),
    },
     {
      id: "5",
      name: "वर्तनी शुद्धिकरण",
      pdf: require("./pdf/vartano-shuddi.pdf"),
    },
     {
      id: "6",
      name: "विलोम-शब्द",
      pdf: require("./pdf/vilom-shabd.pdf"),
    },
    {
      id: "7",
      name: "संविधान उत्तर प्रदेश पुलिस भर्ती ",
      pdf: require("./pdf/savvidhan-up-police.pdf"),
    },
    {
      id: "8",
      name: "हिंदी साहित्य ",
      pdf: require("./pdf/hindi-sahitye.pdf"),
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const filteredItems = pdsItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#4CAF50", "#81C784"]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>All Exam Education</Text>
        <Text style={styles.headerSubtitle}>Read all exam education PDFs</Text>
      </LinearGradient>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search PDS item..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        refreshControl={ 
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, justifyContent:"space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)} style={{marginLeft:10}} activeOpacity={0.8}>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Add Button */}
      {/* <TouchableOpacity
        style={styles.fab}
        onPress={() => console.log("Add new PDS item")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity> */}

      {/* PDF Modal */}
      {selectedItem && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedItem.name} PDF</Text>
              <Pdf
                source={selectedItem.pdf}
                style={styles.pdf}
                onError={(error) => console.log(error)}
                trustAllCerts={false}
              />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={closeModal}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default PDSHome;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: {
    height: 140,
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { color: "#e8f5e9", marginTop: 5, fontSize: 16 },

  searchContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    elevation: 3,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 8,
    overflow: "hidden",
    elevation: 4,
  },
  cardImage: { width: "100%", height: 160 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: "#555" },
  cardStatus: { marginTop: 6, fontWeight: "600" },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: { color: "#fff", fontSize: 32, fontWeight: "bold" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 16,
    padding: 16,
    maxHeight: Dimensions.get("window").height * 0.8,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  pdf: { width: "100%", height: 400 },
  modalCloseButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  modalCloseText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
