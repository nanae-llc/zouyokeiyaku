import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ContractData } from '../types/contract';

// 日本語フォントの登録
Font.register({
  family: 'Noto Sans JP',
  src: 'https://fonts.gstatic.com/ea/notosansjp/v5/NotoSansJP-Regular.otf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Noto Sans JP',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Noto Sans JP',
  },
  mainContent: {
    flex: 1,
  },
  article: {
    marginBottom: 15,
    padding: 10,
  },
  articleNumber: {
    fontSize: 10.5,
    marginBottom: 5,
    fontFamily: 'Noto Sans JP',
    fontWeight: 'bold',
  },
  articleContent: {
    fontSize: 10.5,
    lineHeight: 1.5,
    fontFamily: 'Noto Sans JP',
    marginBottom: 10,
  },
  text: {
    fontSize: 10.5,
    marginBottom: 10,
    lineHeight: 1.5,
    fontFamily: 'Noto Sans JP',
  },
  footer: {
    marginTop: 40,
    textAlign: 'left',
  },
  signature: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
    paddingLeft: '30%',
  },
  signatureBox: {
    width: '100%',
  },
  signatureTitle: {
    fontSize: 10.5,
    marginBottom: 5,
    fontFamily: 'Noto Sans JP',
    fontWeight: 'bold',
  },
  signatureAddress: {
    fontSize: 10.5,
    marginBottom: 5,
    fontFamily: 'Noto Sans JP',
  },
  signatureName: {
    fontSize: 10.5,
    marginBottom: 5,
    fontFamily: 'Noto Sans JP',
  },
  seal: {
    width: 50,
    height: 50,
    border: '1 solid #000',
    borderRadius: 25,
    marginTop: 5,
  },
  signatureRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  giftSection: {
    marginVertical: 5,
    padding: 5,
    border: '1 solid #000',
  },
  giftTitle: {
    fontSize: 10.5,
    marginBottom: 5,
    fontFamily: 'Noto Sans JP',
    fontWeight: 'bold',
  },
  giftDescription: {
    fontSize: 10.5,
    marginBottom: 5,
  },
  giftValue: {
    fontSize: 10.5,
    marginBottom: 5,
  },
  giftLocation: {
    fontSize: 10.5,
  },
});

export const ContractPDF: React.FC<{ data: ContractData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>贈与契約書</Text>

        {/* Main content */}
        <View style={styles.mainContent}>
          <Text style={[styles.text, { marginBottom: 20 }]}>
            贈与者　{data.donor.name}（以下「甲」という）と受贈者　{data.donee.name}（以下「乙」という）は次の通り贈与契約を締結した。
          </Text>

          <View style={styles.article}>
            <Text style={styles.articleNumber}>第1条</Text>
            <Text style={styles.articleContent}>
              贈与者は、受贈者に対し、以下の物件（以下「本物件」という。）を贈与し、受贈者はこれを承諾した。
            </Text>

            {data.gifts.map((gift, index) => {
              return (
                <View key={index} style={styles.giftSection}>
                  <Text style={styles.giftTitle}>物件 {index + 1}</Text>
                  <Text style={styles.giftDescription}>{gift.description}</Text>
                </View>
              );
            })}
          </View>

          {data.specialTerms && (
            <View style={styles.article}>
              <Text style={styles.articleNumber}>第2条</Text>
              <Text style={styles.articleContent}>{data.specialTerms}</Text>
            </View>
          )}

          {/* Footer content */}
          <View style={styles.footer}>
            <Text style={[styles.text, { textAlign: 'left' }]}>
              本契約の成立を証するため、本書2通を作成し、贈与者及び受贈者記名押印の上、各1通を保有する。
            </Text>
            <Text style={[styles.text, { textAlign: 'left' }]}>
              {data.contractDate}
            </Text>
            
            <View style={styles.signature}>
              <View style={styles.signatureBox}>
                <Text style={styles.signatureTitle}>贈与者（甲）</Text>
                <Text style={styles.signatureAddress}>（住所）{data.donor.address}</Text>
                <View style={styles.signatureRow}>
                  <Text style={styles.signatureName}>（氏名）{data.donor.name}</Text>
                  <View style={styles.seal} />
                </View>
              </View>
              <View style={styles.signatureBox}>
                <Text style={styles.signatureTitle}>受贈者（乙）</Text>
                <Text style={styles.signatureAddress}>（住所）{data.donee.address}</Text>
                <View style={styles.signatureRow}>
                  <Text style={styles.signatureName}>（氏名）{data.donee.name}</Text>
                  <View style={styles.seal} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
); 