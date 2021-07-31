import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

export const UserForm = ({
  title,
  desc,
  type,
  record = {},
  closeModal,
  requestMethod,
  reload,
  ...dialogProps
}) => {
  const validationSchema = yup.object({
    username: yup.string("请输入用户名").required("请输入用户名"),
  });
  const formik = useFormik({
    initialValues: {
      ...record,
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await requestMethod(values);
      closeModal();
      reload();
    },
  });
  // const isEdit = type === "edit";

  const fields = [
    {
      name: "username",
      label: "用户名",
      placeholder: "请输入用户名",
    },
    {
      name: "password",
      label: "密码",
      type: "password",
    },
    {
      name: "phone",
      label: "手机号",
    },
    {
      name: "email",
      label: "邮箱",
    },
  ].filter(Boolean);

  const renderFields = (fields = []) => {
    return fields.map((field) => {
      const { name, Component = TextField, ...rest } = field;
      return (
        <Component
          key={name}
          name={name}
          value={formik.values[name]}
          fullWidth
          onChange={formik.handleChange}
          error={formik.touched[name] && !!formik.errors[name]}
          helperText={formik.touched[name] && formik.errors[name]}
          {...rest}
        />
      );
    });
  };

  return (
    <Dialog {...dialogProps} style={{ width: 500 }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>{desc}</DialogContentText> */}
        <Stack style={{ display: "block", paddingTop: 10 }} spacing={1}>
          {renderFields(fields)}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>取消</Button>
        <Button color="primary" onClick={formik.handleSubmit}>
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
};
