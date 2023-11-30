import { Prisma } from "@prisma/client";
import { ReactNode } from "react";

type TableActionProps = {
  viewAction?: (row: any) => ReactNode;
  editAction?: (row: any) => ReactNode;
  restoreAction?: boolean;
  deleteAction?: boolean;
  archiveAction?: boolean;
  modelName: Prisma.ModelName;
};
type TableToolbarAction = {
  btn: { text: string };
  actionCallback: () => Promise<void>;
};
