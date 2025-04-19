"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { ValidationErrors } from "@react-types/shared";

import { Edit } from "./icons";
import { ModalForm } from "./modal-form";
import { TableSpinner } from "./table-spinner";

import { Meme } from "@/types/meme";
import { getData, setInitData, updateItem } from "@/utils/mockApi";
import { memeMockData } from "@/config/temp";
import { formValidation } from "@/utils/formValidation";

interface MemeTableProps {}

export const MemeTable: React.FC<MemeTableProps> = () => {
  // state
  // * selected row to edit
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<Meme[]>([]);

  const [formErrors, setFormErrors] = useState<ValidationErrors>({});

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // handlers
  const openHandler = (id: number) => {
    setActiveId(() => id);
    onOpen();
  };

  const submitHandler = (
    event: React.FormEvent<HTMLFormElement>,
    onClose: () => void
  ) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    const parsedData = {
      ...data,
      id: Number(data.id),
      likes: Number(data.likes),
    } as Meme;

    // validation
    const errors = formValidation(parsedData);

    if (Object.keys(errors).length) {
      setFormErrors(errors);

      return;
    } else {
      // after validation
      // * clear error state and close modal
      setFormErrors({});
      onClose();

      setLoading(true);
      updateItem(parsedData.id, parsedData)
        .then((res) => {
          setActiveId(null);
          if (res) setTableData(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const afterCloseHandler = () => {
    setActiveId(null);
    setFormErrors({});
  };

  // initial data load
  useEffect(() => {
    setLoading(true);
    setInitData(memeMockData);
    getData()
      .then((res: Meme[]) => {
        setTableData(res);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="overflow-x-auto mx-[-20px] pb-2">
        <Table
          isCompact
          isStriped
          aria-label="Memes table"
          classNames={{
            base: ["min-w-[800px]", ""],
          }}
        >
          <TableHeader>
            <TableColumn maxWidth={120}>ID</TableColumn>
            <TableColumn maxWidth={350} minWidth={350}>
              Name
            </TableColumn>
            <TableColumn>Img URL</TableColumn>
            <TableColumn>Likes</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody isLoading={loading} loadingContent={<TableSpinner />}>
            {tableData.map((meme, i) => (
              <TableRow key={i}>
                <TableCell width={120}>{meme.id}</TableCell>
                <TableCell width={350}>{meme.name}</TableCell>
                <TableCell>{meme.imgUrl}</TableCell>
                <TableCell>{meme.likes}</TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    color="primary"
                    variant="flat"
                    onPressEnd={() => openHandler(meme.id)}
                  >
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ModalForm
        afterClose={afterCloseHandler}
        contentToEdit={
          activeId !== null && tableData
            ? tableData.find((meme) => meme.id === activeId) || null
            : null
        }
        errors={formErrors}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={submitHandler}
      />
    </>
  );
};
