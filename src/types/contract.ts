export interface Gift {
  description: string;
}

export interface ContractData {
  // 贈与者情報
  donor: {
    name: string;
    address: string;
  };
  // 受贈者情報
  donee: {
    name: string;
    address: string;
  };
  // 贈与物件
  gifts: Gift[];
  // 契約日
  contractDate: string;
  // 特約事項
  specialTerms?: string;
} 