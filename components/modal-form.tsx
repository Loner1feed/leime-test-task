import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { NumberInput } from "@heroui/number-input";
import { ValidationErrors } from "@react-types/shared";

import { Meme } from "@/types/meme";
import { textFieldsConf, numberFieldsConf } from "@/config/form";

interface ModalFormProps {
  isOpen: boolean;
  onOpenChange: () => void;
  contentToEdit: Meme | null;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    onClose: () => void
  ) => void;
  afterClose: () => void;
  errors: ValidationErrors;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  contentToEdit,
  isOpen,
  onOpenChange,
  onSubmit,
  afterClose,
  errors,
}) => {
  // form state
  const [formData, setFormData] = useState<Meme | null>(null);

  // set data to form
  useEffect(() => {
    setFormData(contentToEdit);
  }, [contentToEdit]);

  const changeHandler = (value: string | number, key: string) => {
    if (formData) setFormData({ ...formData, [key]: value });
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={() => {
        afterClose();
        setFormData(null);
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
            <ModalBody>
              <Form
                className="w-full"
                validationErrors={errors}
                onSubmit={(event) => onSubmit(event, onClose)}
              >
                <NumberInput {...numberFieldsConf.id} value={formData?.id} />
                <Input
                  {...textFieldsConf.name}
                  value={formData?.name}
                  onChange={(ev) =>
                    changeHandler(ev.target.value, ev.target.name)
                  }
                />
                <Input
                  {...textFieldsConf.imgUrl}
                  value={formData?.imgUrl}
                  onChange={(ev) =>
                    changeHandler(ev.target.value, ev.target.name)
                  }
                />
                <NumberInput
                  {...numberFieldsConf.likes}
                  value={formData?.likes}
                  onValueChange={(value) => changeHandler(value, "likes")}
                />

                <div className="ml-auto flex gap-2 py-3">
                  <Button color="primary" type="submit" variant="flat">
                    Submit
                  </Button>
                  <Button variant="flat" onPress={onClose}>
                    Close
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
