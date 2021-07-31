import { TableCellControl } from "components/control";
import { MyTable } from "components/Table";
import { useTable } from "hooks";
import { getArticles } from "service/article";
import dayjs from "dayjs";
import { DATE_FORMATE } from "constants/index";
import { Button, Chip, Container, Input, Link } from "@material-ui/core";
import { Text } from "components/Text";
import { useFormik } from "formik";
import { Image } from "components/Image";

export const Article = () => {
  const { tableProps, search } = useTable({
    method: getArticles,
  });

  const formik = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: (values) => {
      console.log(values);
      search(values);
    },
  });

  const execCommand = (opts) => {
    console.log(opts);
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      width: 150,
      render: (title, { href }) => {
        return <Link href={href}>{title}</Link>;
      },
    },
    {
      title: "图片",
      dataIndex: "imgSrc",
      render: (imgSrc) => {
        return (
          <Image
            src={imgSrc}
            alt="图片"
            style={{ width: 100, height: 100, objectFit: "contain" }}
          />
        );
      },
    },
    {
      title: "时间",
      dataIndex: "time",
      width: 100,
      render: (t) => dayjs(t).format(DATE_FORMATE),
    },
    {
      title: "标签",
      dataIndex: "tags",
      width: 200,
      render: (tags) => {
        return (tags || "").split("|").map((tag, index) => {
          return <Chip style={{ margin: 2 }} key={index} label={tag} />;
        });
      },
    },
    {
      title: "简介",
      dataIndex: "content",
      width: 150,
      align: "left",
      render: (content) => {
        return <Text limit={20}>{content}</Text>;
      },
    },
    {
      title: "评分人数",
      dataIndex: "ratingCount",
      width: 80,
    },
    {
      title: "评分",
      dataIndex: "ratingScore",
    },
    {
      title: "uid",
      dataIndex: "uid",
      width: 100,
      render: (uid) => {
        return (
          <Text limit={5} copy={true} wrap={false}>
            {uid}
          </Text>
        );
      },
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
                command: execCommand,
              },
              // {
              //   title: "detail",
              //   command: execCommand,
              // },
              {
                title: "删除",
                command: execCommand,
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
      <form style={{ margin: "8px 0" }} onSubmit={formik.handleSubmit}>
        <Input
          type="search"
          name="keyword"
          value={formik.values.keyword}
          onChange={formik.handleChange}
        />
        <Button type="submit">搜索</Button>
      </form>
      <MyTable columns={columns} {...tableProps} />
    </Container>
  );
};
