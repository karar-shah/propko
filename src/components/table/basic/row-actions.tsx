"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CrossCircledIcon,
  DotsHorizontalIcon,
  EyeOpenIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { TableActionProps } from "@/typing/table";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> extends TableActionProps {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
  editAction,
  viewAction,
  archiveAction,
  deleteAction,
  restoreAction,
}: DataTableRowActionsProps<TData>) {
  const { data: session } = { data: { user: null } };

  const archived = (row.original as any).archived;
  const deleteEnabled = session?.user;
  // const deleteEnabled = session?.user && session.user.role === "ADMIN";

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {viewAction && (
            <DropdownMenuItem asChild>
              {viewAction(row.original)}
            </DropdownMenuItem>
          )}
          {editAction && (
            <DropdownMenuItem asChild>
              {editAction(row.original)}
            </DropdownMenuItem>
          )}
          {(editAction || viewAction) && deleteEnabled && (
            <DropdownMenuSeparator />
          )}
          {archived
            ? restoreAction && <DropdownMenuItem>Restore</DropdownMenuItem>
            : deleteEnabled && (
                <>
                  {archiveAction && (
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                  )}
                  {deleteAction && <DropdownMenuItem>Delete</DropdownMenuItem>}
                </>
              )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export type TableActionPopupProps = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (value: boolean) => void;
  action?: () => Promise<void>;
  title: string;
  description: string;
  actionBtn: {
    variant?:
      | "link"
      | "default"
      | "primary"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost";
    text: string;
  };
};

type TableRowActionsProps = {
  viewAction?: string | VoidFunction;
  editAction?: string | VoidFunction;
  deleteAction?: string | VoidFunction;
};

export function TableRowActions({
  viewAction,
  editAction,
  deleteAction,
}: TableRowActionsProps) {
  const router = useRouter();
  return (
    <div className="flex items-center max-w-[100px] gap-2">
      {viewAction && (
        <Button
          disabled={viewAction === ""}
          onClick={() => {
            if (!viewAction) return;
            if (typeof viewAction === "string") {
              return router.push(viewAction);
            } else {
              viewAction();
            }
          }}
          type="button"
          className="aspect-square"
          variant={"ghost"}
          size="icon"
        >
          <EyeOpenIcon className="h-5 w-5 text-secondary" />
        </Button>
      )}
      {editAction && (
        <Button
          disabled={editAction === ""}
          onClick={() => {
            if (!editAction) return;
            if (typeof editAction === "string") {
              return router.push(editAction);
            } else {
              editAction();
            }
          }}
          type="button"
          variant={"ghost"}
          size="icon"
        >
          <Pencil2Icon className="h-5 w-5 text-secondary" />
        </Button>
      )}
      {deleteAction && (
        <Button
          disabled={deleteAction === ""}
          onClick={() => {
            if (!deleteAction) return;
            if (typeof deleteAction === "string") {
              return router.push(deleteAction);
            } else {
              deleteAction();
            }
          }}
          type="button"
          variant={"ghost"}
          size="icon"
        >
          <CrossCircledIcon className="h-5 w-5 text-secondary" />
        </Button>
      )}
    </div>
  );
}
