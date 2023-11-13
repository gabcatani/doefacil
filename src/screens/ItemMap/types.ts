interface IDonation {
  id: string;
  donatorId: string;
  itemName: string;
  itemCategory: string;
  local: string
  address: {
    lat: number;
    lng: number;
  };
  description: string;
  image: string;
  usageTime: string;
}

export type { IDonation }