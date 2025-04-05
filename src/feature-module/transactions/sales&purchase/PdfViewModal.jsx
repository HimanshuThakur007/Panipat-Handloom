/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Button } from "react-bootstrap";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20, position: "relative" },
  section: { marginBottom: 20 },
  text: { marginBottom: 4, fontSize: 10 },
  boldText: { fontWeight: "bold" },
  logo: { width: 100, height: 50, alignSelf: "end" },
  table: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "100%",
    borderCollapse: "collapse",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 5,
  },
  tableCell: { flex: 1, textAlign: "left", padding: 5, fontSize: 10 },
  tableCell1: { flex: 3, textAlign: "left", padding: 5, fontSize: 10 },
  totalSectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  totalSection: {
    width: "60%",
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 10,
  },
  totalItem: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
    paddingRight: 10,
    fontSize: 10,
  },
  // signatures: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginTop: 50,
  // },
  signatures: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingTop: 20, 
    padding: 20
  },
  logoAndCompanyDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  companyDetails: { flex: 2,  justifyContent: "center" },
  logoContainer: { flex: 1, alignItems: "flex-end" },
  hr: { border: "1px solid blue", margin: "5px 0" },
  hr1: { border: "1px solid blue", margin: "5px 0", width: "100%" },
});

export const PdfDocument = ({ data, paramId, companyDetails }) => {
  const [blobUrl, setBlobUrl] = React.useState(null);
  const billSundryData =
    data?.QutBillSundary ||
    data?.POBillSundary ||
    data?.SIBillSundary ||
    data?.PIBillSundary ||
    [];
  const hasBillSundry = billSundryData.length > 0;

  const convertBase64ToBlobUrl = (base64) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    const blob = new Blob([byteArray], { type: "image/png" });
    return URL.createObjectURL(blob);
  };

  const base64Image = companyDetails?.logo?.startsWith("data:image")
    ? companyDetails?.logo
    : `data:image/png;base64,${companyDetails?.logo}`;

  React.useEffect(() => {
    if (companyDetails?.logo) {
      const base64Image = companyDetails?.logo?.startsWith("data:image")
        ? companyDetails.logo
        : `data:image/png;base64,${companyDetails.logo}`;
      const convertedBlobUrl = convertBase64ToBlobUrl(base64Image);
      setBlobUrl(convertedBlobUrl);
    }
  }, [companyDetails?.logo]);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.logoAndCompanyDetails}>
          <View style={styles.companyDetails}>
            <Text
              style={{ fontSize: "30px", color: "blue", fontWeight: "bold", marginBottom: 10 }}
            >
              {paramId === "1"
                ? "Quotation"
                : paramId === "2"
                ? "Purchase Order"
                : paramId === "3"
                ? "Purchase Invoice"
                : "Sale Invoice"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}> {companyDetails?.name}</Text>
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}> {companyDetails?.eMail}</Text>{" "}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}> {companyDetails?.mobNo}</Text>{" "}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}> {companyDetails?.gst}</Text>{" "}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}> {companyDetails?.address}</Text>{" "}
            </Text>
          </View>

          <View style={styles.logoContainer}>
            {/* <Text style={styles.logo}>Logo</Text> */}
            {base64Image && <Image src={blobUrl} style={styles.logo} />}
          </View>
        </View>

        <View style={styles.hr} />

        <View style={styles.section}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between",marginTop : 5 }}
          >
            <View>
              <Text style={styles.text}>
                <Text style={styles.boldText}>
                {paramId === "1"
                    ? "Quotation No."
                    : paramId === "2"
                    ? "Po No."
                    : paramId === "3"
                    ? "Purchase Invoice No."
                    : paramId === "4"
                    ? "Sale Invoice No."
                    : ""}{" "}
                  :
                  </Text> {data?.VchNo}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Date:</Text> {data?.Date}
              </Text>
            </View>
            <View>
              {/* <Text style={styles.text}><Text style={styles.boldText}>Bill To:</Text> {data.ClientName}</Text>
              <Text style={styles.text}>{data.BillingAddress}</Text> */}
              {paramId === "1" ? (
                <>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>Customer:</Text>{" "}
                    {data?.CustomerName}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>Salesman:</Text>{" "}
                    {data?.SalesManName}
                  </Text>
                </>
              ) : paramId === "2" ? (
                <>
                  {data?.Against === 1 && (
                    <Text style={styles.text}>
                      <Text style={styles.boldText}>Supplier:</Text>{" "}
                      {data?.SupplierName}
                    </Text>
                  )}
                  {data?.Against === 2 && (
                    <Text style={styles.text}>
                      <Text style={styles.boldText}>Quotation No:</Text>{" "}
                      {data?.QutVchNo}
                    </Text>
                  )}
                  {data?.Against === 2 && (
                    <Text style={styles.text}>
                      <Text style={styles.boldText}>Customer:</Text>{" "}
                      {data?.CustomerName}
                    </Text>
                  )}
                </>
              ) : paramId === "4" ? (
                <>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>Quotation No:</Text>{" "}
                    {data?.QutVchNo}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>Customer:</Text>{" "}
                    {data?.CustomerName}
                  </Text>
                </>
              ) : (
                ""
              )}
            </View>
            <View>
              {/* <Text style={styles.text}><Text style={styles.boldText}>Ship To:</Text> {data.ShippingAddress}</Text> */}
              {paramId === "3" && (
                <>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>Supplier:</Text>{" "}
                    {data?.SupplierName}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.boldText}>PO:</Text> {data?.POName}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell1}>Product</Text>
            <Text style={styles.tableCell}>Qty</Text>
            <Text style={styles.tableCell}>Price</Text>
            <Text style={styles.tableCell}>Amount</Text>
            <Text style={styles.tableCell}>Disc.(%)</Text>
            <Text style={styles.tableCell}>Tax(%)</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>

          {(
            data?.QuotationDetails ||
            data?.PODetails ||
            data?.PIDetails ||
            data?.SIDetails ||
            []
          ).map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell1}>{item.ProductName}</Text>
              <Text style={styles.tableCell}>{item.Qty}</Text>
              <Text style={styles.tableCell}>{item.SalePrice}</Text>
              <Text style={styles.tableCell}>{item.Amt}</Text>
              <Text style={styles.tableCell}>{item.DisPer}</Text>
              <Text style={styles.tableCell}>{item.TaxPer}</Text>
              <Text style={styles.tableCell}>{item.TotAmt}</Text>
            </View>
          ))}
        </View>
        {/* Conditionally render Bill Sundry Table */}
        <View style={styles.totalSectionContainer}>
          <View style={styles.totalSection}>
            {billSundryData.map((item, index) => (
              <View style={styles.totalItem} key={index}>
                <Text style={styles.boldText}>{item.type}:</Text>
                <Text>
                  {" "}
                  {item.absoluteAmount} ({item.percentage}%)
                </Text>
              </View>
            ))}
            <View style={styles.hr1} />
            <View style={styles.totalItem}>
              <Text style={styles.boldText}>Total Amount:</Text>
              <Text style={{ marginLeft: 5 }}>
                {data?.finalTotal?.toFixed(2)}
              </Text>
            </View>
            {/* <View style={styles.totalItem}>
              <Text style={styles.boldText}>Total Discount, USD:</Text>
              <Text style={{ marginLeft: 5 }}>{data.TotalDiscount}</Text>
            </View> */}
            {/* <View style={styles.totalItem}>
              <Text style={styles.boldText}>Total Amount, USD:</Text>
              <Text style={{ marginLeft: 5 }}>{data.TotalAmount}</Text>
            </View> */}
          </View>
        </View>

        <View style={styles.signatures}>
          <View>
            <Text style={styles.text}></Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}></Text>
          </View>
          <View style={{padding:20}}>
            <Text style={styles.text}>Business Signature</Text>
            <Text style={styles.text}>___________________</Text>
            <Text style={styles.text}>{data.OwnerName}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const PdfViewModal = ({
  data,
  show,
  handleClose,
  paramId,
  companyDetails,
}) => {
  const styles = {
    page: { display: "flex", flexDirection: "column", padding: 20 },
    section: { marginBottom: 20 },
    text: { marginBottom: 4, fontSize: 14 },
    space: {
      marginRight: 5, // Adjust the margin as needed for the space
    },
    boldText: { fontWeight: "bold" },
    logo: { width: 100, height: 50, display: "block", margin: "0 auto" },
    table: {
      marginTop: 5,
      border: "1px solid #ddd",
      borderRadius: 5,
      width: "100%",
      borderCollapse: "collapse",
    },
    tableRow: {
      display: "flex",
      borderBottom: "1px solid #ddd",
      padding: "5px 0",
    },
    tableCell: { flex: 1, textAlign: "left", padding: 5, fontSize: 12 },
    tableCell1: { flex: 3, textAlign: "left", padding: 5, fontSize: 12 },
    totalSectionContainer: {
      display: "flex",
      justifyContent: "flex-end", // Align to the right
      marginTop: 20,
    },
    totalSection: {
      width: "60%", // Half the width of the page
      textAlign: "right",
      display: "flex",
      flexDirection: "column", // Stack the items vertically
      alignItems: "flex-end", // Align the content to the right
    },
    totalItem: {
      display: "flex",
      // alignItems:'center',
      justifyContent: "space-between", // Space between key and value
      width: "100%", // Full width to use the space
      marginBottom: "0px", // Space between rows
      paddingRight: "20px", // Adjust space between key and value
    },
    signatures: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 50,
    },
    logoAndCompanyDetails: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    companyDetails: {
      flex: 2,
      paddingLeft: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    logoContainer: { flex: 1, textAlign: "right" },
    hr: { border: "1px solid blue", margin: "5px 0" },
    hr1: { border: "1px solid blue", margin: "5px 0", width: "100%" },
  };
  const billSundryData =
    data?.QutBillSundary ||
    data?.POBillSundary ||
    data?.SIBillSundary ||
    data?.PIBillSundary ||
    [];
  const hasBillSundry = billSundryData.length > 0;
  if (!data) {
    return (
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Unable to load data. Please try again later.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {paramId === "1"
            ? "Quotation Details"
            : paramId === "2"
            ? "Purchase Order Detail"
            : paramId === "3"
            ? "Purchase Invoice"
            : "Sale Invoice"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={styles.page}>
          {/* Logo and Company Details Section */}
          <div style={styles.logoAndCompanyDetails}>
            {/* Left side: Company details */}
            <div style={styles.companyDetails}>
              <h1
                style={{ fontSize: "40px", color: "blue", fontWeight: "bold" }}
              >
                {paramId === "1"
                  ? "Quotation"
                  : paramId === "2"
                  ? "Purchase Order"
                  : paramId === "3"
                  ? "Purchase Invoice"
                  : "Sale Invoice"}
              </h1>
              <p style={styles.text}>
                <strong>{companyDetails?.name}</strong>
              </p>
              <p style={styles.text}>
                <strong>{companyDetails?.eMail}</strong>
              </p>
              <p style={styles.text}>
                <strong>{companyDetails?.mobNo}</strong>
              </p>
              <p style={styles.text}>
                <strong>{companyDetails?.gst}</strong>
              </p>
              <p style={styles.text}>
                <strong>{companyDetails?.address}</strong>
              </p>
            </div>

            {/* Right side: Logo */}
            <div style={styles.logoContainer}>
              <img src={companyDetails?.logo} style={styles.logo} alt="Logo" />
            </div>
          </div>

          {/* Horizontal Line after Company Details */}
          <hr style={styles.hr} />

          {/* Quotation Info */}
          <div
            style={{
              ...styles.section,
              display: "flex",
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            <div style={{ flex: 1, marginRight: "10px" }}>
              <p style={styles.text}>
                <strong>
                  {paramId === "1"
                    ? "Quotation No"
                    : paramId === "2"
                    ? "Po No."
                    : paramId === "3"
                    ? "Purchase Invoice"
                    : paramId === "4"
                    ? "Sale Invoice"
                    : ""}{" "}
                  :
                </strong>{" "}
                {data.VchNo}
              </p>
              <p style={styles.text}>
                <strong>Date:</strong> {data.Date}
              </p>
            </div>
            <div style={{ flex: 1, marginRight: "10px" }}>
              {/* <p style={styles.text}><strong>Bill To:</strong> {data.ClientName}</p>
              <p style={styles.text}>{data.BillingAddress}</p> */}
              {paramId === "1" ? (
                <>
                  <p style={styles.text}>
                    <strong>Customer:</strong> {data?.CustomerName}
                  </p>
                  <p style={styles.text}>
                    <strong>Salesman:</strong> {data?.SalesManName}
                  </p>
                </>
              ) : (
                <>
                  {data?.Against === 1 && (
                    <p style={styles.text}>
                      <strong>Supplier:</strong> {data?.SupplierName}
                    </p>
                  )}
                  {data?.Against === 2 ||
                    (paramId === "4" && (
                      <p style={styles.text}>
                        <strong>Quotation No:</strong> {data?.QutVchNo}
                      </p>
                    ))}
                  {data?.Against === 2 ||
                    (paramId === "4" && (
                      <p style={styles.text}>
                        <strong>Customer Name:</strong> {data?.CustomerName}
                      </p>
                    ))}
                </>
              )}
            </div>
            <div style={{ flex: 1 }}>
              {/* <p style={styles.text}><strong>Ship To:</strong> {data.ShippingAddress}</p> */}
              {paramId === "3" && (
                <p style={styles.text}>
                  <strong>Supplier:</strong> {data?.SupplierName}
                </p>
              )}
              {paramId === "3" && (
                <p style={styles.text}>
                  <strong>PO:</strong> {data?.POName}
                </p>
              )}
            </div>
          </div>

          {/* Table for Quotation Details */}
          <div style={styles.table}>
            <div style={styles.tableRow}>
              <div style={styles.tableCell1}>Product</div>
              <div style={styles.tableCell}>Qty</div>
              <div style={styles.tableCell}>Price</div>
              <div style={styles.tableCell}>Amount</div>
              <div style={styles.tableCell}>Disc.(%)</div>
              <div style={styles.tableCell}>Tax.(%)</div>
              <div style={styles.tableCell}>Total</div>
            </div>
            {(
              data?.QuotationDetails ||
              data?.PODetails ||
              data?.PIDetails ||
              data?.SIDetails ||
              []
            ).map((item, index) => (
              <div style={styles.tableRow} key={index}>
                <div style={styles.tableCell1}>{item.ProductName}</div>
                <div style={styles.tableCell}>{item.Qty}</div>
                <div style={styles.tableCell}>{item.SalePrice}</div>
                <div style={styles.tableCell}>{item.Amt}</div>
                <div style={styles.tableCell}>{item.DisPer}</div>
                <div style={styles.tableCell}>{item.TaxPer}</div>
                <div style={styles.tableCell}>{item.TotAmt}</div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div style={styles.totalSectionContainer}>
            <div style={styles.totalSection}>
              {(
                data?.QutBillSundary ||
                data?.POBillSundary ||
                data?.SIBillSundary ||
                data?.PIBillSundary ||
                []
              ).map((item, index) => (
                <div style={styles.totalItem} key={index}>
                  <p style={styles.boldText}>{item.type}:</p>
                  <p>
                    {item.absoluteAmount} ({item.percentage}%)
                  </p>
                </div>
              ))}
              <hr style={styles.hr1} />
              <div style={styles.totalItem}>
                <p style={styles.boldText}>Total Amount :</p>
                <p>{data?.finalTotal?.toFixed(2)}</p>
              </div>
              {/* <div style={styles.totalItem}>
                <p style={styles.boldText}>Total Discount, USD:</p>
                <p>
                  {data.TotalDiscount} ({data.TotalDiscountPercentage}%)
                </p>
              </div> */}
              {/* <div style={styles.totalItem}>
                <p style={styles.boldText}>Total Amount, USD:</p>
                <p>
                  {data.TotalAmount} ({data.TotalAmountPercentage}%)
                </p>
              </div> */}
            </div>
          </div>

          {/* Signatures */}
          <div style={styles.signatures}>
            {/* <div>
              <p style={styles.text}>Client Signature</p>
              <p style={styles.text}>___________________</p>
              <p style={styles.text}>{data.ClientName}</p>
            </div> */}
            <div>
              <p style={styles.text}>Business Signature</p>
              <p style={styles.text}>___________________</p>
              <p style={styles.text}>{data.OwnerName}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
