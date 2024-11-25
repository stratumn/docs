type LinkMetaData = {
  createdAt: string;
  action: {
    key: string;
    title: string;
    icon: string;
  };
  createdBy: {
    type?: string;
    accountId?: string;
    name: string;
    firstName?: string;
    lastName?: string;
    avatar: string | null;
    email?: string;
    id?: string;
  };
  group: {
    label: string;
    id: string;
    name: string;
    avatar: string | null;
  };

  traceCreatedAt: string;
  traceName: string;
  traceId: string;
  traceShortId: string;

  /** @deprecated */
  owner: {
    id: string;
    name: string;
    avatar: string | null;
  };
  /** @deprecated */
  process: string;
  /** @deprecated */
  inputs: string[];
};
