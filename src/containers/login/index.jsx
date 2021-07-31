import { Box, Button, Container, Stack, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { login } from "service/login";
import * as yup from "yup";

export const Login = () => {
  const history = useHistory();
  const validationSchema = yup.object({
    username: yup.string("请输入用户名").required("请输入用户名"),
    password: yup
      .string("请输入密码")
      .min(6, "密码长度必须大于6位")
      .max(20, "密码长度必须小于20位"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { data: token } = await login(values);
      localStorage.setItem("token", token);
      history.push("/");
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Stack
            style={{
              width: 600,
              display: "flex",
              margin: '200px auto'
            }}
            spacing={2}
          >
            <TextField
              name="username"
              fullWidth
              label="用户名"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
              placeholder="username"
            />
            <TextField
              name="password"
              type="password"
              fullWidth
              label="密码"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              placeholder="password"
            />
            <Button color="primary" fullWidth type="submit">
              登录
            </Button>
          </Stack>
        </Box>
      </form>
    </Container>
  );
};
