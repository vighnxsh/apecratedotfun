export interface Link {
    type: string;
    label: string;
    url: string;
  }
  
  export interface TokenProfile {
    url: string;
    chainId: string;
    tokenAddress: string;
    icon?: string;
    header?: string;
    description?: string;
    links?: Link[];
  }