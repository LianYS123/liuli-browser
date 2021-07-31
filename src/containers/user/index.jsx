import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import Table from "components/Table";
import { UserForm } from "./actions/UserForm";
import { TableCellControl } from "components/control";
import { useModalAction, useTable } from "hooks";
import { addUser, deleteUser, getUserList, updateUser } from "service/user";

export const User = () => {
  const { tableProps, reload } = useTable({
    method: getUserList,
  });
  const { open, openModal, ...userFormProps } = useModalAction();
  const {
    open: showConfirmModal,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
    id,
  } = useModalAction();
  const handleDelete = async () => {
    await deleteUser({ id });
    reload();
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "手机号",
      dataIndex: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "操作",
      width: 150,
      render: (_, record) => {
        return (
          <TableCellControl
            record={record}
            options={[
              {
                title: "编辑",
                command: () =>
                  openModal({
                    title: "编辑用户",
                    desc: "编辑用户",
                    type: "edit",
                    requestMethod: updateUser,
                    record,
                  }),
              },
              {
                title: "删除",
                command: () =>
                  openConfirmModal({
                    ...record,
                  }),
                danger: true,
              },
            ]}
          />
        );
      },
    },
  ];
  return (
    <Container>
      <Button
        onClick={() =>
          openModal({
            title: "添加用户",
            desc: "添加用户",
            type: "add",
            requestMethod: addUser,
          })
        }
      >
        添加用户
      </Button>
      <Table {...tableProps} columns={columns} />
      {open ? (
        <UserForm open={open} {...userFormProps} reload={reload} />
      ) : null}
      <Dialog open={showConfirmModal}>
        <DialogTitle>确认删除?</DialogTitle>
        <DialogActions>
          <Button onClick={closeConfirmModal}>取消</Button>
          <Button onClick={handleDelete}>确认</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
