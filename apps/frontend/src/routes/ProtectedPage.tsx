import React, { ComponentType } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

type PageProps = Record<string, unknown>;

interface ProtectPageProps {
  Page: ComponentType<PageProps>;
}

const ProtectedPage: React.FC<ProtectPageProps> = ({ Page: page }) => {
  const PageProtected = withAuthenticationRequired(page);

  return <PageProtected />;
};

export default ProtectedPage;
